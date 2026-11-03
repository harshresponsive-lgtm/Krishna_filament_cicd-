import { Link } from '@/router';
import { irItems } from '@/data/ir';
import {
  ArrowRight,
  ShieldCheck,
  Factory,
  Award,
  TrendingUp,
  Globe2,
  ChevronRight,
} from 'lucide-react';

const heroImg =
  'https://images.pexels.com/photos/21838292/pexels-photo-21838292.jpeg?auto=compress&cs=tinysrgb&w=1600';

const factoryImg =
  'https://images.pexels.com/photos/14804699/pexels-photo-14804699.jpeg?auto=compress&cs=tinysrgb&w=1200';

const ropeImg =
  'https://images.pexels.com/photos/12506838/pexels-photo-12506838.jpeg?auto=compress&cs=tinysrgb&w=1200';

export default function Home() {
  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden bg-brand-950">
        <div className="absolute inset-0">
          {/* Background image can be enabled later */}
          {/* 
          <img
            src={heroImg}
            alt="Rope manufacturing"
            className="h-full w-full object-cover"
          />
          */}

          <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800" />

          {/* Subtle decorative elements */}
          <div className="absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-white/5" />

          <div className="absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-white/5" />
        </div>

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-5xl">

            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-100">
                Manufacturing Excellence
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              Krishna Filament
              <span className="block text-brand-200">
                Industries Limited
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-3xl text-lg leading-8 text-brand-100/90 sm:text-xl sm:leading-9">
              A trusted name in rope-based manufacturing, delivering
              high-performance filament and cordage products to industries
              across the globe.
            </p>

          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">

            {/* Section heading */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
                Who We Are
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-brand-950 sm:text-4xl lg:text-5xl">
                Engineering Strength Into Every Strand
              </h2>

              <div className="mt-6 h-1 w-16 rounded-full bg-brand-700" />
            </div>

            {/* Content */}
            <div className="max-w-3xl">

              <p className="text-lg leading-8 text-gray-700">
                Krishna Filament Industries Limited is a premier manufacturer
                of rope and filament products, built on decades of expertise in
                polymer processing and industrial cordage. Our products serve
                the marine, agriculture, construction and packaging sectors
                with uncompromising quality.
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                We are committed to transparency, corporate governance and
                creating long-term value for our shareholders.
              </p>

              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-700 transition-all hover:gap-3"
              >
                Learn more about us
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Investor Relations highlight */}
      {/*
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">
              Investor Relations
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900">
              Everything Investors Need, In One Place
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Access our policies, financial results, annual reports,
              corporate governance disclosures and more. We are committed to
              keeping our investors informed and engaged.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {irItems.map((item) => (
              <Link
                key={item.slug}
                to={`/ir/${item.slug}`}
                className="group p-6 rounded-xl border border-gray-200 hover:border-brand-400 hover:shadow-lg transition-all bg-white"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-brand-800 text-lg">
                    {item.label}
                  </h3>

                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                </div>

                <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      */}
    </div>
  );
}