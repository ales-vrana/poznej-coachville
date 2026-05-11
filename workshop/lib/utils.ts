// Minimální classnames helper (bez závislosti na clsx/tailwind-merge — méně bytů)
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}
