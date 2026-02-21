









export const dynamic = "force-dynamic";

import { Suspense } from "react";
import AdminLoginClient from "./client";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminLoginClient />
    </Suspense>
  );
}
