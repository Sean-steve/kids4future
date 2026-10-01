import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: [
      "components/admin/AuditViewer.tsx",
      "components/admin/ContentManager.tsx",
      "components/admin/FinanceManager.tsx",
      "components/admin/InquiryManager.tsx",
      "components/admin/StaffManager.tsx",
    ],
    rules: {
      // These components use effects only to start asynchronous Supabase reads.
      // State changes occur from the async results, not synchronously in the effect body.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "node_modules/**",
    "assets/**",
    "legacy/**",
    "supabase/functions/**",
  ]),
]);
