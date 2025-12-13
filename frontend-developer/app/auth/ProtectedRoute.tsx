// components/ProtectedRoute.tsx
"use client";

// COMMENTED FOR DEV - bypass all auth
// import { useAuthInfo } from "@propelauth/react";
// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // DEV MODE: Just render children without any auth checks
  return <>{children}</>;
}

/* ORIGINAL CODE - UNCOMMENT WHEN AUTH IS READY:

import { useAuthInfo } from "@propelauth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, user, isLoggedIn } = useAuthInfo();
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const PUBLIC_ROUTES = ['/login', '/signup', '/chatbot', '/client'];

  if (isClient) {
    if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
      return <>{children}</>;
    }
    
    if (!loading && !isLoggedIn) {
      window.location.href = "/login";
      return null;
    }
    
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 font-medium text-gray-300">Loading...</p>
          </div>
        </div>
      );
    }
    
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <p className="mt-6 font-medium text-gray-300">Initializing...</p>
      </div>
    </div>
  );
}
*/
