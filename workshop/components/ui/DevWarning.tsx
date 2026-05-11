import { isPaymentLinkConfigured } from "@/lib/config";

/**
 * Vývojářské upozornění — zobrazí se POUZE v development modu,
 * když není nastavený Stripe Payment Link v .env.local.
 * V produkci se vůbec nevyrenderuje.
 */
export function DevWarning() {
  if (process.env.NODE_ENV !== "development") return null;
  if (isPaymentLinkConfigured) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm rounded-lg bg-red-600 text-white p-4 shadow-2xl border-2 border-red-700">
      <p className="font-bold text-sm mb-1">⚠️ Stripe Payment Link není nastavený</p>
      <p className="text-xs text-red-50">
        V <code className="bg-red-700 px-1 rounded">.env.local</code> doplň{" "}
        <code className="bg-red-700 px-1 rounded">NEXT_PUBLIC_STRIPE_PAYMENT_LINK</code> a
        restartuj dev server.
      </p>
    </div>
  );
}
