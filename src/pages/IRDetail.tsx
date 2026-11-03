import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/router';
import { irItems, irSlugMap } from '@/data/ir';
import { disclosureItems } from '@/data/disclosures';
import { supabase } from '@/lib/supabase';

import {
  ScrollText,
  FileText,
  Users,
  Network,
  BarChart3,
  BookOpen,
  FileSpreadsheet,
  Landmark,
  PieChart,
  Megaphone,
  Mail,
  ChevronRight,
  Download,
  FileSearch,
  Info,
} from 'lucide-react';

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  ScrollText,
  FileText,
  Users,
  Network,
  BarChart3,
  BookOpen,
  FileSpreadsheet,
  Landmark,
  PieChart,
  Megaphone,
  Mail,
};

type Document = {
  id: string;
  title: string;
  year: string | null;
  file_name: string;
  file_path: string;
  published_date: string | null;
  is_published: boolean;
  sort_order: number;
};

function DisclosureTable() {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-brand-50 text-brand-900">
            <tr>
              <th className="w-20 border-b border-brand-100 px-4 py-4 font-semibold">
                Sr. No.
              </th>
              <th className="border-b border-brand-100 px-4 py-4 font-semibold">
                Particulars
              </th>
              <th className="w-44 border-b border-brand-100 px-4 py-4 font-semibold">
                Reference
              </th>
            </tr>
          </thead>
          <tbody>
            {disclosureItems.map((disclosure) => (
              <tr key={disclosure.srNo} className="align-top even:bg-gray-50/60">
                <td className="border-b border-gray-100 px-4 py-4 text-gray-600">
                  {disclosure.srNo}
                </td>
                <td className="border-b border-gray-100 px-4 py-4 leading-relaxed text-gray-800">
                  {disclosure.particulars}
                </td>
                <td className="border-b border-gray-100 px-4 py-4 text-gray-600">
                  {disclosure.url ? (
                    disclosure.url.startsWith('https://krishna-filament.vercel.app/') ? (
                      <Link
                        to={disclosure.url.replace('https://krishna-filament.vercel.app', '') || '/'}
                        className="inline-flex rounded-md px-2 py-1 font-medium text-brand-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-50 hover:text-brand-800 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-1"
                      >
                        {disclosure.reference}
                      </Link>
                    ) : (
                      <a
                        href={disclosure.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-md px-2 py-1 font-medium text-brand-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-50 hover:text-brand-800 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-1"
                      >
                        {disclosure.reference}
                      </a>
                    )
                  ) : (
                    disclosure.reference
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function IRDetail({ slug }: { slug: string }) {
  const { navigate } = useRouter();

  const item = irSlugMap[slug];

  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
   * Load documents from Supabase
   */
  useEffect(() => {
    if (slug === 'disclosures') {
      setLoading(false);
      setError(null);
      return;
    }

    async function loadDocuments() {
      setLoading(true);
      setError(null);

      try {
        /*
         * STEP 1
         *
         * Find the IR category using the URL slug.
         *
         * Example:
         *
         * /ir/annual-reports
         *
         * slug = annual-reports
         *
         * IMPORTANT:
         * ir_categories uses "name", not "label".
         */
        const { data: category, error: categoryError } = await supabase
          .from('ir_categories')
          .select('id, slug, name')
          .eq('slug', slug)
          .eq('is_active', true)
          .maybeSingle();

        if (categoryError) {
          throw new Error(categoryError.message);
        }

        /*
         * If the category does not exist,
         * show a proper error instead of allowing
         * Supabase to throw a single-object error.
         */
        if (!category) {
          throw new Error(
            `Investor Relations category "${slug}" was not found.`
          );
        }

        /*
         * STEP 2
         *
         * Get ALL published documents belonging
         * to this category.
         *
         * IMPORTANT:
         *
         * DO NOT use .single() here.
         *
         * A category can have:
         *
         * 0 documents
         * 1 document
         * 20 documents
         * 50 documents
         *
         * Supabase therefore returns an ARRAY.
         */
        const { data: docs, error: documentsError } = await supabase
          .from('ir_documents')
          .select(`
            id,
            title,
            year,
            file_name,
            file_path,
            published_date,
            is_published,
            sort_order
          `)
          .eq('category_id', category.id)
          .eq('is_published', true)
          .order('sort_order', { ascending: true });

        if (documentsError) {
          throw new Error(documentsError.message);
        }

        /*
         * If there are no documents,
         * Supabase returns [].
         *
         * This is NOT an error.
         */
        setDocuments(docs ?? []);
      } catch (err) {
        console.error('Failed to load IR documents:', err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load documents.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, [slug]);

  /*
   * Invalid frontend category
   */
  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center pb-20 pt-32">
        <div className="text-center">
          <FileSearch className="mx-auto mb-4 h-16 w-16 text-brand-300" />

          <h1 className="text-2xl font-bold text-brand-900">
            Page Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            This investor relations section does not exist.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline"
          >
            Back to Home
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[item.icon] ?? Info;

  /*
   * Create public Supabase Storage URL.
   *
   * If file_path is already a complete URL,
   * use it directly.
   *
   * Otherwise generate the public URL
   * from the investor-documents bucket.
   */
  function getDocumentUrl(filePath: string) {
    if (
      filePath.startsWith('http://') ||
      filePath.startsWith('https://')
    ) {
      return filePath;
    }

    const { data } = supabase.storage
      .from('investor-documents')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  /*
   * Group documents by year.
   *
   * Example:
   *
   * {
   *   "2026": [...],
   *   "2025": [...]
   * }
   */
  const documentsByYear = documents.reduce(
    (groups, document) => {
      const year = document.year || 'Other';

      if (!groups[year]) {
        groups[year] = [];
      }

      groups[year].push(document);

      return groups;
    },
    {} as Record<string, Document[]>
  );

  /*
   * Sort years newest first.
   */
  const sortedYears = Object.keys(documentsByYear).sort(
    (a, b) =>
      b.localeCompare(a, undefined, {
        numeric: true,
      })
  );

  return (
    <div className="animate-fade-in ">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        
          {/* Page Title */}
          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-accent-400/30 bg-accent-400/20">
              <Icon className="h-7 w-7 text-accent-300" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {item.label}
              </h1>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          BODY
      ========================================================= */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">

        {/* =======================================================
            SIDEBAR
        ======================================================= */}

        <aside className="h-fit lg:sticky lg:top-24">

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">

            <div className="border-b border-brand-100 bg-brand-50 px-4 py-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-800">
                Investor Relations
              </h3>
            </div>

            <nav className="py-1">

              {irItems.map((ir) => (
                <button
                  key={ir.slug}
                  onClick={() => navigate(`/ir/${ir.slug}`)}
                  className={`flex w-full items-center gap-2 border-l-2 px-4 py-2.5 text-left text-sm transition-colors ${
                    ir.slug === slug
                      ? 'border-brand-500 bg-brand-50 font-semibold text-brand-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {ir.label}
                </button>
              ))}

            </nav>

          </div>

        </aside>

        {/* =======================================================
            CONTENT
        ======================================================= */}

        <main className="min-w-0">

          <h2 className="text-2xl font-bold text-brand-900">
            {slug === 'disclosures' ? 'Disclosures' : 'Documents'}
          </h2>

          {slug === 'disclosures' && <DisclosureTable />}

          {/* =====================================================
              LOADING
          ===================================================== */}

          {slug !== 'disclosures' && loading && (
            <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-8 text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />

              <p className="mt-4 text-sm text-gray-500">
                Loading documents...
              </p>

            </div>
          )}

          {/* =====================================================
              ERROR
          ===================================================== */}

          {slug !== 'disclosures' && !loading && error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">

              <div className="flex items-start gap-3">

                <Info className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                <div>

                  <h3 className="font-semibold text-red-800">
                    Unable to load documents
                  </h3>

                  <p className="mt-1 text-sm text-red-700">
                    {error}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* =====================================================
              NO DOCUMENTS
          ===================================================== */}

          {slug !== 'disclosures' && !loading &&
            !error &&
            documents.length === 0 && (
              <div className="mt-6 rounded-xl border border-gray-100 bg-brand-50 p-6">

                <div className="flex items-start gap-3">

                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />

                  <div>

                    <h3 className="font-semibold text-brand-800">
                      No documents available
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-brand-700">
                      Documents for this section are currently being
                      prepared. Please check back later for updates.
                    </p>

                  </div>

                </div>

              </div>
            )}

          {/* =====================================================
              DOCUMENT LIST
          ===================================================== */}

          {slug !== 'disclosures' && !loading &&
            !error &&
            documents.length > 0 && (
              <div className="mt-6 space-y-6">

                {sortedYears.map((year) => (

                  <div
                    key={year}
                    className="space-y-3"
                  >

                    {/* Show year only when there are multiple years */}
                    {sortedYears.length > 1 && (
                      <h3 className="text-xl font-semibold text-brand-900">
                        {year}
                      </h3>
                    )}

                    {documentsByYear[year].map((document) => {

                      const documentUrl =
                        getDocumentUrl(
                          document.file_path
                        );

                      return (
                        <div
                          key={document.id}
                          className="flex flex-col gap-4 rounded-lg border border-gray-100 p-4 transition-all hover:border-brand-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                        >

                          {/* Document information */}
                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                              <FileText className="h-5 w-5 text-brand-600" />
                            </div>

                            <div className="min-w-0">

                              <p className="break-words text-sm font-medium text-gray-800">
                                {document.title}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                PDF
                                {document.year
                                  ? ` · ${document.year}`
                                  : ''}
                              </p>

                            </div>

                          </div>

                          {/* Download button */}
                          <a
                            href={documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </a>

                        </div>
                      );
                    })}

                  </div>

                ))}

              </div>
            )}

        </main>

      </div>

    </div>
  );
}