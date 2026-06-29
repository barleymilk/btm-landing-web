type PageHeroProps = {
  badge: string;
  title: React.ReactNode;
  description: string;
};

function PageHero({ badge, title, description }: PageHeroProps) {
  return (
    <section className="mt-8">
      <div className="relative overflow-hidden rounded-[40px] bg-white px-8 py-10 shadow-lg md:px-14 md:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-light/80 blur-3xl"
        />
        <div className="relative space-y-4">
          <span className="inline-block rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-bold text-zinc-600">
            {badge}
          </span>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 md:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-600">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
