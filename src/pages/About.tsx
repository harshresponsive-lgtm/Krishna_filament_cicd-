import { Target, Eye, Factory, Globe2, Award, Leaf } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Factory,
      title: 'Manufacturing Excellence',
      desc: 'Advanced technology and rigorous quality control at every stage.',
    },
    {
      icon: Award,
      title: 'Quality First',
      desc: 'Products engineered to meet and exceed international standards.',
    },
    {
      icon: Globe2,
      title: 'Global Reach',
      desc: 'Serving customers across continents with dependable supply.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      desc: 'Responsible manufacturing practices that respect the environment.',
    },
  ];

  return (
    <div className="animate-fade-in ">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-950">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800" />

        <div className="relative mx-auto flex min-h-[320px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-brand-100">
              About the Company
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About Us
            </h1>

            
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            {/* Section heading */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
                Our Story
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-950 sm:text-4xl lg:text-5xl">
                Three Decades of Strength & Innovation
              </h2>

              <div className="mt-6 h-1 w-16 rounded-full bg-brand-700" />
            </div>

            {/* Story content */}
            <div className="max-w-4xl">
              <p className="text-lg leading-8 text-gray-700">
                Krishna Filament Industries Limited was established with a
                vision to manufacture world-class rope and filament products
                for industrial and commercial use. Over the decades, we have
                grown into a trusted brand known for quality, durability and
                reliability.
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our state-of-the-art manufacturing facility leverages advanced
                polymer processing technology to produce ropes that meet
                stringent international standards. We serve diverse sectors
                including marine, agriculture, construction and packaging.
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                As a publicly listed company, we are committed to the highest
                standards of corporate governance, transparency and
                shareholder value creation.
              </p>

              

              {/* Story highlights */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
              Purpose & Direction
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
              What We Stand For
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Mission */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                  <Target className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Our Mission
                </p>

                <h3 className="mt-2 text-2xl font-bold text-brand-950">
                  Building trust through quality
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  To manufacture high-quality rope and filament products that
                  empower industries worldwide, while maintaining ethical
                  business practices, environmental responsibility and
                  long-term value for all stakeholders.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-10">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-accent-50 transition-transform duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50 text-accent-700 transition-colors group-hover:bg-accent-700 group-hover:text-white">
                  <Eye className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Our Vision
                </p>

                <h3 className="mt-2 text-2xl font-bold text-brand-950">
                  Growing with a global outlook
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  To be the most trusted and preferred manufacturer of rope and
                  filament products in the industry, recognized globally for
                  quality, innovation and corporate integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

    </div>
  );
}