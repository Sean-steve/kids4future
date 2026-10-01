import { FinanceManager } from "@/components/admin/FinanceManager";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Admin — Finance" };

export default function AdminFinancePage() {
  return <main>
    <PageHero eyebrow="Staff only" title="Donation finance operations." intro="Reconcile M-Pesa payment state, inspect donation and receipt ledgers, and dispatch verified donor acknowledgements through role-controlled server functions." tone="mint" />
    <section className="content-section shell"><FinanceManager /></section>
  </main>;
}
