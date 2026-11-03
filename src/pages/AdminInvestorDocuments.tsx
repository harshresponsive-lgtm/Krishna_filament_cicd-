import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Upload,
  FileText,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  LogOut,
} from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { useRouter } from '@/router';

/*
 * Keep this in sync with the `file_size_limit` configured on the
 * `investor-documents` Storage bucket (see handover doc / Supabase
 * dashboard). This client-side check is only a UX nicety — it stops
 * an admin uploading an oversized file and waiting for the network
 * round trip, it is NOT the security boundary. The bucket-level
 * limit is what actually enforces this.
 */
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

type Category = {
  id: string;
  slug: string;
  name: string;
};

type Document = {
  id: string;
  category_id: string;
  title: string;
  year: string | null;
  file_name: string;
  file_path: string;
  published_date: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: {
    slug: string;
    name: string;
  } | null;
};

type Message = {
  type: 'success' | 'error';
  text: string;
} | null;

export default function AdminInvestorDocuments() {
  const { navigate } = useRouter();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [showUploadForm, setShowUploadForm] = useState(false);

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPublished, setIsPublished] = useState(true);

  const [message, setMessage] = useState<Message>(null);

  /*
   * ---------------------------------------------------------
   * LOAD DOCUMENTS
   * ---------------------------------------------------------
   */

  async function loadDocuments() {
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase
      .from('ir_documents')
      .select(`
        id,
        category_id,
        title,
        year,
        file_name,
        file_path,
        published_date,
        is_published,
        sort_order,
        created_at,
        updated_at,
        category:ir_categories (
          slug,
          name
        )
      `)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading documents:', error);
      setMessage({
        type: 'error',
        text: error.message,
      });
    } else {
      setDocuments((data ?? []) as unknown as Document[]);
    }

    setLoading(false);
  }

  /*
   * ---------------------------------------------------------
   * LOAD CATEGORIES
   * ---------------------------------------------------------
   */

  async function loadCategories() {
    const { data, error } = await supabase
      .from('ir_categories')
      .select('id, slug, name')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error loading categories:', error);

      setMessage({
        type: 'error',
        text: error.message,
      });

      return;
    }

    setCategories(data ?? []);

    /*
     * Automatically select first category
     * if none has been selected yet.
     */
    if (data && data.length > 0 && !categoryId) {
      setCategoryId(data[0].id);
    }
  }

  /*
   * ---------------------------------------------------------
   * INITIAL LOAD
   * ---------------------------------------------------------
   */

  useEffect(() => {
    async function load() {
      await Promise.all([
        loadDocuments(),
        loadCategories(),
      ]);
    }

    load();
  }, []);

  /*
   * ---------------------------------------------------------
   * LOGOUT
   * ---------------------------------------------------------
   */

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  /*
   * ---------------------------------------------------------
   * FILE SELECT
   * ---------------------------------------------------------
   */

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    /*
     * Only allow PDF files.
     */
    if (
      file.type !== 'application/pdf' &&
      !file.name.toLowerCase().endsWith('.pdf')
    ) {
      setMessage({
        type: 'error',
        text: 'Please select a PDF file.',
      });

      event.target.value = '';
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setMessage({
        type: 'error',
        text: `File is too large. Maximum allowed size is ${(
          MAX_FILE_SIZE_BYTES /
          1024 /
          1024
        ).toFixed(0)} MB.`,
      });

      event.target.value = '';
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setMessage(null);

    /*
     * Automatically use the filename as the title
     * if the title field is empty.
     */
    if (!title) {
      const fileNameWithoutExtension = file.name.replace(
        /\.pdf$/i,
        ''
      );

      setTitle(fileNameWithoutExtension);
    }
  }

  /*
   * ---------------------------------------------------------
   * RESET FORM
   * ---------------------------------------------------------
   */

  function resetForm() {
    setTitle('');
    setYear('');
    setSelectedFile(null);
    setIsPublished(true);

    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }

  /*
   * ---------------------------------------------------------
   * UPLOAD DOCUMENT
   * ---------------------------------------------------------
   */

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(null);

    /*
     * Basic validation
     */

    if (!title.trim()) {
      setMessage({
        type: 'error',
        text: 'Please enter a document title.',
      });

      return;
    }

    if (!categoryId) {
      setMessage({
        type: 'error',
        text: 'Please select a category.',
      });

      return;
    }

    if (!selectedFile) {
      setMessage({
        type: 'error',
        text: 'Please select a PDF file.',
      });

      return;
    }

    if (
      selectedFile.type !== 'application/pdf' &&
      !selectedFile.name.toLowerCase().endsWith('.pdf')
    ) {
      setMessage({
        type: 'error',
        text: 'Only PDF files are allowed.',
      });

      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setMessage({
        type: 'error',
        text: `File is too large. Maximum allowed size is ${(
          MAX_FILE_SIZE_BYTES /
          1024 /
          1024
        ).toFixed(0)} MB.`,
      });

      return;
    }

    setUploading(true);

    try {
      /*
       * -----------------------------------------------------
       * STEP 1
       * Upload PDF to Supabase Storage
       * -----------------------------------------------------
       */

      /*
       * Create a unique filename.

       * Example:
       *
       * 1723567890_AR_2026.pdf
       *
       * This prevents accidental filename collisions.
       */

      const safeFileName = selectedFile.name
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9._-]/g, '');

      const uniqueFileName =
        `${Date.now()}-${safeFileName}`;

      const filePath = uniqueFileName;

      const { error: uploadError } =
        await supabase.storage
          .from('investor-documents')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: 'application/pdf',
          });

      if (uploadError) {
        throw new Error(
          `PDF upload failed: ${uploadError.message}`
        );
      }

      /*
       * -----------------------------------------------------
       * STEP 2
       * Insert metadata into ir_documents
       * -----------------------------------------------------
       */

      const { error: databaseError } = await supabase
        .from('ir_documents')
        .insert({
          category_id: categoryId,
          title: title.trim(),
          year: year.trim() || null,
          file_name: selectedFile.name,
          file_path: filePath,
          published_date: isPublished
            ? new Date().toISOString().split('T')[0]
            : null,
          is_published: isPublished,
          sort_order: 0,
        });

      /*
       * If database insertion fails, remove the uploaded
       * PDF so we don't leave an orphaned file in Storage.
       */

      if (databaseError) {
        await supabase.storage
          .from('investor-documents')
          .remove([filePath]);

        throw new Error(
          `Database insert failed: ${databaseError.message}`
        );
      }

      /*
       * -----------------------------------------------------
       * SUCCESS
       * -----------------------------------------------------
       */

      setMessage({
        type: 'success',
        text: 'Document uploaded successfully.',
      });

      resetForm();

      setShowUploadForm(false);

      /*
       * Refresh document list.
       */

      await loadDocuments();
    } catch (error) {
      console.error('Upload error:', error);

      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Something went wrong while uploading the document.',
      });
    } finally {
      setUploading(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * GET PUBLIC PDF URL
   * ---------------------------------------------------------
   */

  function getPublicUrl(filePath: string) {
    const { data } = supabase.storage
      .from('investor-documents')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  /*
   * ---------------------------------------------------------
   * TOGGLE PUBLISH
   * ---------------------------------------------------------
   */

  async function togglePublish(document: Document) {
    setMessage(null);

    const newStatus = !document.is_published;

    const { error } = await supabase
      .from('ir_documents')
      .update({
        is_published: newStatus,
        published_date: newStatus
          ? new Date().toISOString().split('T')[0]
          : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', document.id);

    if (error) {
      console.error(error);

      setMessage({
        type: 'error',
        text: error.message,
      });

      return;
    }

    setDocuments((current) =>
      current.map((item) =>
        item.id === document.id
          ? {
              ...item,
              is_published: newStatus,
              published_date: newStatus
                ? new Date().toISOString().split('T')[0]
                : null,
            }
          : item
      )
    );

    setMessage({
      type: 'success',
      text: newStatus
        ? 'Document published successfully.'
        : 'Document unpublished successfully.',
    });
  }

  /*
   * ---------------------------------------------------------
   * DELETE DOCUMENT
   * ---------------------------------------------------------
   */

  async function deleteDocument(document: Document) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${document.title}"?\n\nThis will delete both the database record and the PDF file.`
    );

    if (!confirmed) {
      return;
    }

    setMessage(null);

    try {
      /*
       * First delete the PDF from Storage.
       */

      const { error: storageError } =
        await supabase.storage
          .from('investor-documents')
          .remove([document.file_path]);

      if (storageError) {
        throw new Error(
          `Storage delete failed: ${storageError.message}`
        );
      }

      /*
       * Then delete the database record.
       */

      const { error: databaseError } =
        await supabase
          .from('ir_documents')
          .delete()
          .eq('id', document.id);

      if (databaseError) {
        throw new Error(
          `Database delete failed: ${databaseError.message}`
        );
      }

      /*
       * Remove from UI immediately.
       */

      setDocuments((current) =>
        current.filter(
          (item) => item.id !== document.id
        )
      );

      setMessage({
        type: 'success',
        text: 'Document deleted successfully.',
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'Failed to delete document.',
      });
    }
  }

  /*
   * ---------------------------------------------------------
   * COUNTS
   * ---------------------------------------------------------
   */

  const totalDocuments = documents.length;

  const publishedDocuments = documents.filter(
    (document) => document.is_published
  ).length;

  const unpublishedDocuments =
    totalDocuments - publishedDocuments;

  /*
   * ---------------------------------------------------------
   * LOADING STATE
   * ---------------------------------------------------------
   */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-brand-600" />

            <span className="ml-3 text-gray-600">
              Loading documents...
            </span>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * PAGE
   * ---------------------------------------------------------
   */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ------------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------------ */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-900">
              Investor Documents
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage Investor Relations PDF documents.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setShowUploadForm(true);
                setMessage(null);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              <Upload className="h-4 w-4" />
              Upload Document
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* ------------------------------------------------ */}
        {/* MESSAGE */}
        {/* ------------------------------------------------ */}

        {message && (
          <div
            className={`mt-6 flex items-start gap-3 rounded-lg border p-4 ${
              message.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}

            <p className="text-sm">
              {message.text}
            </p>

            <button
              type="button"
              onClick={() => setMessage(null)}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ------------------------------------------------ */}
        {/* STAT CARDS */}
        {/* ------------------------------------------------ */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Documents
            </p>

            <p className="mt-2 text-3xl font-bold text-brand-900">
              {totalDocuments}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Published
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {publishedDocuments}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Unpublished
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-500">
              {unpublishedDocuments}
            </p>
          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* UPLOAD FORM */}
        {/* ------------------------------------------------ */}

        {showUploadForm && (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-brand-900">
                  Upload Investor Document
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add a new PDF to Investor Relations.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowUploadForm(false);
                  resetForm();
                }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleUpload}
              className="mt-6 space-y-6"
            >

              {/* TITLE */}

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Document Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Annual Report 2025-26"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>

              {/* CATEGORY + YEAR */}

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Category
                  </label>

                  <select
                    value={categoryId}
                    onChange={(event) =>
                      setCategoryId(event.target.value)
                    }
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  >
                    <option value="">
                      Select category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Year
                  </label>

                  <input
                    type="text"
                    value={year}
                    onChange={(event) =>
                      setYear(event.target.value)
                    }
                    placeholder="2025-26"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                </div>

              </div>

              {/* FILE */}

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  PDF File
                </label>

                <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-brand-400">

                  <input
                    id="pdf-file"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <label
                    htmlFor="pdf-file"
                    className="cursor-pointer"
                  >
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />

                    <p className="mt-3 text-sm font-medium text-gray-700">
                      Choose PDF file
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      PDF files only
                    </p>
                  </label>

                  {selectedFile && (
                    <div className="mx-auto mt-4 flex max-w-md items-center gap-3 rounded-lg bg-gray-50 p-3 text-left">

                      <FileText className="h-5 w-5 shrink-0 text-brand-600" />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-800">
                          {selectedFile.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {(
                            selectedFile.size /
                            1024 /
                            1024
                          ).toFixed(2)}{' '}
                          MB
                        </p>
                      </div>

                    </div>
                  )}

                </div>
              </div>

              {/* PUBLISHED */}

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">

                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(event) =>
                    setIsPublished(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Publish immediately
                  </p>

                  <p className="text-xs text-gray-500">
                    Published documents are visible on the
                    public Investor Relations website.
                  </p>
                </div>

              </label>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => {
                    setShowUploadForm(false);
                    resetForm();
                  }}
                  disabled={uploading}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Upload Document
                    </>
                  )}
                </button>

              </div>

            </form>
          </div>
        )}

        {/* ------------------------------------------------ */}
        {/* DOCUMENT TABLE */}
        {/* ------------------------------------------------ */}

        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-lg font-bold text-brand-900">
              All Documents
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your Investor Relations documents.
            </p>
          </div>

          {documents.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-300" />

              <p className="mt-4 text-sm text-gray-500">
                No documents found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="min-w-full divide-y divide-gray-200">

                <thead className="bg-gray-50">
                  <tr>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Document
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Category
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Year
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">

                  {documents.map((document) => {

                    const pdfUrl = getPublicUrl(
                      document.file_path
                    );

                    return (
                      <tr
                        key={document.id}
                        className="hover:bg-gray-50"
                      >

                        {/* DOCUMENT */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                              <FileText className="h-5 w-5 text-brand-600" />
                            </div>

                            <div className="min-w-0">

                              <p className="font-medium text-gray-800">
                                {document.title}
                              </p>

                              <p className="mt-1 max-w-xs truncate text-xs text-gray-400">
                                {document.file_name}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* CATEGORY */}

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {document.category?.name ?? '—'}
                        </td>

                        {/* YEAR */}

                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {document.year ?? '—'}
                        </td>

                        {/* STATUS */}

                        <td className="whitespace-nowrap px-6 py-4">

                          {document.is_published ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                              Unpublished
                            </span>
                          )}

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-4">

                          <div className="flex items-center justify-end gap-2">

                            {/* VIEW */}

                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="View PDF"
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-brand-700"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>

                            {/* PUBLISH / UNPUBLISH */}

                            <button
                              type="button"
                              onClick={() =>
                                togglePublish(document)
                              }
                              title={
                                document.is_published
                                  ? 'Unpublish'
                                  : 'Publish'
                              }
                              className={`rounded-lg border p-2 transition ${
                                document.is_published
                                  ? 'border-orange-200 text-orange-600 hover:bg-orange-50'
                                  : 'border-green-200 text-green-600 hover:bg-green-50'
                              }`}
                            >
                              {document.is_published ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>

                            {/* DELETE */}

                            <button
                              type="button"
                              onClick={() =>
                                deleteDocument(document)
                              }
                              title="Delete"
                              className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}