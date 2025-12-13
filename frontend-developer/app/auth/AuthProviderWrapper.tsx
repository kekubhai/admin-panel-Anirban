// components/AuthProviderWrapper.tsx
"use client";

import { AuthProvider } from "@propelauth/react";
import { useEffect, useState } from "react";

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use real AUTH_URL or a placeholder for dev (so AuthProvider context exists)
  const AUTH_URL = process.env.NEXT_PUBLIC_DEVELOPMENT_PROPELAUTH_URL || 'https://placeholder.propelauthtest.com';

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!process.env.NEXT_PUBLIC_DEVELOPMENT_PROPELAUTH_URL) {
    console.warn('NEXT_PUBLIC_DEVELOPMENT_PROPELAUTH_URL not set - using placeholder for dev');
  }

  return (
    <AuthProvider authUrl={AUTH_URL}>
      {children}
    </AuthProvider>
  );
}
