import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/inquiries/route.ts';

const publicOrigin = 'https://homepage.example.com';
const credential = 'only-for-proxy-tests-not-a-real-credential';
const key = 'cda74b77-dcd3-4beb-8dcf-f60c4b7df140';

function configure(t) {
  const values = { NEXT_PUBLIC_SITE_URL: publicOrigin, INQUIRY_API_TOKEN: credential, INQUIRY_API_URL: 'http://private-api:4001' };
  const original = Object.fromEntries(Object.keys(values).map((name) => [name, process.env[name]]));
  Object.assign(process.env, values);
  t.after(() => {
    for (const [name, value] of Object.entries(original)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });
}

function request(body = '{}', origin = publicOrigin, contentType = 'application/json') {
  return new Request('http://internal-host:3001/api/inquiries', {
    method: 'POST', headers: { ...(origin ? { origin } : {}), 'content-type': contentType, 'idempotency-key': key }, body,
  });
}

test('accepts the configured public origin when the server URL is internal and forwards the same retry key', async (t) => {
  configure(t);
  const receipt = { id: key, createdAt: '2026-11-01T01:00:00.000Z' };
  const body = JSON.stringify({ subject: 'Example inquiry' });
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push(options.headers['Idempotency-Key']);
    assert.equal(url, 'http://private-api:4001/inquiries');
    assert.equal(options.headers.Authorization, `Bearer ${credential}`);
    assert.equal(options.body, body);
    return Response.json(receipt, { status: calls.length === 1 ? 201 : 200 });
  });
  const first = await POST(request(body));
  assert.equal(first.status, 201);
  assert.equal(first.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await first.json(), receipt);
  const retry = await POST(request(body));
  assert.equal(retry.status, 200);
  assert.deepEqual(await retry.json(), receipt);
  assert.deepEqual(calls, [key, key]);
});

test('rejects cross-origin and missing-origin requests before contacting the backend', async (t) => {
  configure(t);
  const fetchMock = t.mock.method(globalThis, 'fetch', () => { throw new Error('Must not call backend'); });
  assert.equal((await POST(request('{}', 'https://untrusted.example.com'))).status, 403);
  assert.equal((await POST(request('{}', ''))).status, 403);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('rejects malformed, oversized and unsupported bodies without forwarding', async (t) => {
  configure(t);
  const fetchMock = t.mock.method(globalThis, 'fetch', () => { throw new Error('Must not call backend'); });
  assert.equal((await POST(request('broken'))).status, 400);
  assert.equal((await POST(request('x'.repeat(40000)))).status, 413);
  assert.equal((await POST(request('{}', publicOrigin, 'text/plain'))).status, 415);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('preserves validation errors so the form can identify invalid fields', async (t) => {
  configure(t);
  const errors = { message: '입력한 내용을 확인해 주세요.', fields: { email: '이메일을 확인해 주세요.' } };
  t.mock.method(globalThis, 'fetch', async () => Response.json(errors, { status: 400 }));
  const response = await POST(request());
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), errors);
});

test('returns an unavailable result rather than a receipt if the backend fails', async (t) => {
  configure(t);
  for (const status of [401, 500]) {
    t.mock.method(globalThis, 'fetch', async () => Response.json({ privateDetail: 'do not expose' }, { status }));
    const response = await POST(request());
    assert.equal(response.status, 503);
    assert.deepEqual(Object.keys(await response.json()), ['message']);
  }
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Connection refused'); });
  assert.equal((await POST(request())).status, 503);
});

test('fails closed when the server credential has not been configured', async (t) => {
  configure(t);
  delete process.env.INQUIRY_API_TOKEN;
  assert.equal((await POST(request())).status, 503);
});
