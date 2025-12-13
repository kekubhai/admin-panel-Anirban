import { AuthProviderWrapper } from "../auth/AuthProviderWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
<AuthProviderWrapper>

      {children}
  </AuthProviderWrapper>
    </div>
  )
}