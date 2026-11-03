import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from '@/router';

/**
 * Wrap any admin-only page with this component.
 *
 * - While the session is being checked, shows a loading state
 *   (nothing from the wrapped page is rendered yet).
 * - If there is no active Supabase Auth session, redirects to
 *   /admin/login instead of rendering the protected content.
 * - Stays in sync with login/logout events via onAuthStateChange,
 *   so signing out in another tab also kicks the user out here.
 */
export default function RequireAdminSession({ children }: { children: ReactNode }) {
  const { navigate } = useRouter();

  // undefined = still checking, null = checked and not logged in
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      if (!data.session) {
        navigate('/admin/login');
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!active) return;
      setSession(newSession);
      if (!newSession) {
        navigate('/admin/login');
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (session === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        <span className="ml-3 text-gray-600">Checking session...</span>
      </div>
    );
  }

  if (!session) {
    // Redirect already triggered above; render nothing while it happens.
    return null;
  }

  return <>{children}</>;
}
