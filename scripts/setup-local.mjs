import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, chmodSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const backend = resolve(root, '../../back/dev');
if (!existsSync(resolve(backend, 'package.json'))) throw new Error('Expected the API checkout at ../../back/dev.');
const frontPath = resolve(root, '.env.local');
const backPath = resolve(backend, '.env');
const read = (path) => existsSync(path) ? readFileSync(path, 'utf8') : '';
const front = read(frontPath);
const back = read(backPath);
const getToken = (source) => source.match(/^INQUIRY_API_TOKEN=(.*)$/m)?.[1].trim();
const frontToken = getToken(front);
const backToken = getToken(back);
if (frontToken && backToken && frontToken !== backToken) throw new Error('Existing API tokens differ; preserve and reconcile them before setup.');
const token = frontToken || backToken || randomBytes(32).toString('hex');
if (token.length < 32) throw new Error('Existing API token is too short.');
function configure(path, original, values) {
  let text = original;
  for (const [key, value] of Object.entries(values)) {
    const pattern = new RegExp(`^${key}=.*$`, 'm');
    if (!pattern.test(text)) text = `${text.trimEnd()}\n${key}=${value}\n`.trimStart();
    else if (key === 'INQUIRY_API_TOKEN' && !getToken(text)) text = text.replace(pattern, `${key}=${value}`);
  }
  writeFileSync(path, text, { mode: 0o600 });
  chmodSync(path, 0o600);
}
configure(frontPath, front, { NEXT_PUBLIC_SITE_URL: 'http://127.0.0.1:3001', INQUIRY_API_URL: 'http://127.0.0.1:4001', INQUIRY_API_TOKEN: token });
configure(backPath, back, { HOST: '127.0.0.1', PORT: '4001', INQUIRY_API_TOKEN: token, DATABASE_PATH: '.data/inquiries.sqlite' });
console.log('Local environments are ready. API credentials were preserved and were not printed.');
