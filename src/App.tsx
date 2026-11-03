import { RouterProvider, useRouter } from '@/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import IRDetail from '@/pages/IRDetail';
import AdminLogin from './pages/AdminLogin';
import AdminInvestorDocuments from '@/pages/AdminInvestorDocuments';
import RequireAdminSession from '@/components/RequireAdminSession';
function NotFound() {
  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-brand-800">404</h1>
        <p className="mt-3 text-gray-500">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

function Routes() {
  const { path } = useRouter();

  let page: React.ReactNode;

  if (path === '/admin/login') {
    page = <AdminLogin />;
  } else if (path === '/') {
    page = <Home />;
  } else if (path === '/about') {
    page = <About />;
  } else if (path === '/contact') {
    page = <Contact />;
  } else if (path === '/admin/investor-documents') {
    page = (
      <RequireAdminSession>
        <AdminInvestorDocuments />
      </RequireAdminSession>
    );
  } else if (path.startsWith('/ir/')) {
    const slug = path.replace('/ir/', '');
    page = <IRDetail slug={slug} />;
  } else {
    page = <NotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-20">
        {page}
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <Routes />
    </RouterProvider>
  );
}

export default App;
