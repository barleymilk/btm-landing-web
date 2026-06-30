type PageHeroProps = {
  badge: string;
  title: React.ReactNode;
  description: string;
};

function PageHero({ badge, title, description }: PageHeroProps) {
  return (
    <section className="mt-4 sm:mt-6 md:mt-8">
      <div className="relative overflow-hidden rounded-[24px] bg-white px-5 py-8 shadow-lg sm:rounded-[32px] sm:px-8 sm:py-10 md:rounded-[40px] md:px-14 md:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-light/80 blur-3xl"
        />
        <div className="relative space-y-4">
          <span className="inline-block rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-bold text-zinc-600">
            {badge}
          </span>
          <h1 className="text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl md:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
