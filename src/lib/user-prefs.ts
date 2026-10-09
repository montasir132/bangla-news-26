export const CATEGORIES = [
  "জাতীয়",
  "আন্তর্জাতিক",
  "রাজনীতি",
  "অর্থনীতি",
  "খেলাধুলা",
  "বিনোদন",
  "প্রযুক্তি",
  "শিক্ষা",
  "স্বাস্থ্য",
  "মতামত",
  "লাইফস্টাইল",
  "ভিডিও",
] as const;

export const DIVISIONS = [
  "ঢাকা",
  "চট্টগ্রাম",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "সিলেট",
  "রংপুর",
  "ময়মনসিংহ",
] as const;

export type Prefs = {
  categories: string[];
  fontSize: "small" | "medium" | "large";
  theme: "light" | "dark" | "system";
  notifications: {
    breaking: boolean;
    daily: boolean;
    weekly: boolean;
    replies: boolean;
  };
  publicProfile: boolean;
};

export const DEFAULT_PREFS: Prefs = {
  categories: [],
  fontSize: "medium",
  theme: "system",
  notifications: { breaking: true, daily: false, weekly: false, replies: true },
  publicProfile: false,
};

/** user.preferences হলো JSON স্ট্রিং; নষ্ট বা খালি হলে ডিফল্টে ফিরে যাবে */
export function parsePrefs(raw?: string | null): Prefs {
  try {
    const p = JSON.parse(raw || "{}");
    return {
      ...DEFAULT_PREFS,
      ...p,
      notifications: { ...DEFAULT_PREFS.notifications, ...p.notifications },
    };
  } catch {
    return DEFAULT_PREFS;
  }
}