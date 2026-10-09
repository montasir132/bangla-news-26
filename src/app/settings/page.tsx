"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "../../lib/auth-client";
import {
  CATEGORIES,
  DEFAULT_PREFS,
  parsePrefs,
  type Prefs,
} from "../../lib/user-prefs";

const TABS = [
  { id: "reading", label: "পড়ার পছন্দ" },
  { id: "notifications", label: "নোটিফিকেশন" },
  { id: "privacy", label: "গোপনীয়তা" },
  { id: "security", label: "নিরাপত্তা" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const nativeField =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-[#C40004] focus:ring-1 focus:ring-[#C40004]";

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-3">
      <span>
        <span className="block text-sm font-medium text-gray-900">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-gray-500">
            {description}
          </span>
        )}
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full bg-gray-300 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-[#C40004] peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-[#C40004] peer-focus-visible:ring-offset-2" />
    </label>
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
  name,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  name: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className="inline-flex rounded-lg border border-gray-300 p-0.5"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-4 py-1.5 text-sm transition-colors ${
            value === o.value
              ? "bg-[#C40004] font-semibold text-white"
              : "text-gray-600 hover:text-[#C40004]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = (
    session as
      | { user?: { id?: string; email?: string; preferences?: string | null } }
      | null
      | undefined
  )?.user;

  const [tab, setTab] = useState<TabId>("reading");
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [prefsUserId, setPrefsUserId] = useState(user?.id);
  const [saving, setSaving] = useState(false);

  // পাসওয়ার্ড
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);

  // অ্যাকাউন্ট মুছা
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deleting, setDeleting] = useState(false);

  if (prefsUserId !== user?.id) {
    setPrefsUserId(user?.id);
    if (user) setPrefs(parsePrefs(user.preferences));
  }

  const toggleCategory = (c: string) =>
    setPrefs((p) => ({
      ...p,
      categories: p.categories.includes(c)
        ? p.categories.filter((x) => x !== c)
        : [...p.categories, c],
    }));

  const setNotif = (key: keyof Prefs["notifications"], value: boolean) =>
    setPrefs((p) => ({
      ...p,
      notifications: { ...p.notifications, [key]: value },
    }));

  const savePrefs = async () => {
    setSaving(true);
    const { error } = await authClient.updateUser({
      preferences: JSON.stringify(prefs),
    } as Parameters<typeof authClient.updateUser>[0]);
    setSaving(false);
    if (error) return toast.error(error.message || "সেটিংস সংরক্ষণ করা যায়নি");
    toast.success("সেটিংস সংরক্ষণ হয়েছে");
  };

  const changePassword = async () => {
    if (pw.next !== pw.confirm)
      return toast.error("নতুন পাসওয়ার্ড দুটি মিলছে না");
    setPwSaving(true);
    const { error } = await authClient.changePassword({
      currentPassword: pw.current,
      newPassword: pw.next,
      revokeOtherSessions: true,
    });
    setPwSaving(false);
    if (error) return toast.error(error.message || "পাসওয়ার্ড বদলানো যায়নি");
    setPw({ current: "", next: "", confirm: "" });
    toast.success(
      "পাসওয়ার্ড বদলানো হয়েছে। অন্য ডিভাইস থেকে লগ আউট করা হয়েছে।",
    );
  };

  const deleteAccount = async () => {
    setDeleting(true);
    const { error } = await authClient.deleteUser({});
    setDeleting(false);
    if (error)
      return toast.error(
        error.message ||
          "অ্যাকাউন্ট মোছা যায়নি। আবার সাইন ইন করে চেষ্টা করুন।",
      );
    router.push("/");
    router.refresh();
  };

  if (isPending)
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-gray-500">
        লোড হচ্ছে...
      </div>
    );

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-gray-600">সেটিংস বদলাতে আগে সাইন ইন করুন।</p>
        <Link
          href="/signIn"
          className="btn mt-4 border-[#C40004] bg-[#C40004] text-white hover:bg-[#a90000]"
        >
          সাইন ইন
        </Link>
      </div>
    );
  }

  const showSave = tab !== "security";

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">সেটিংস</h1>
        <Link
          href="/profile"
          className="text-sm font-medium text-[#C40004] hover:underline"
        >
          প্রোফাইলে যান
        </Link>
      </div>

      {/* ট্যাব */}
      <div
        role="tablist"
        aria-label="সেটিংস বিভাগ"
        className="mb-8 flex gap-6 overflow-x-auto border-b border-gray-200"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px shrink-0 border-b-2 pb-3 text-sm transition-colors ${
              tab === t.id
                ? "border-[#C40004] font-bold text-[#C40004]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* পড়ার পছন্দ */}
      {tab === "reading" && (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-base font-bold text-gray-900">প্রিয় বিভাগ</h2>
            <p className="mt-1 text-sm text-gray-500">
              যেগুলো বেছে নেবেন, সেই খবর আপনার জন্য আগে দেখানো হবে।
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const on = prefs.categories.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleCategory(c)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      on
                        ? "border-[#C40004] bg-[#C40004] text-white"
                        : "border-gray-300 text-gray-700 hover:border-[#C40004] hover:text-[#C40004]"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900">লেখার আকার</h2>
            <p className="mb-3 mt-1 text-sm text-gray-500">
              সংবাদ পড়ার সময় অক্ষরের আকার।
            </p>
            <Segmented
              name="লেখার আকার"
              value={prefs.fontSize}
              onChange={(fontSize) => setPrefs((p) => ({ ...p, fontSize }))}
              options={[
                { value: "small", label: "ছোট" },
                { value: "medium", label: "মাঝারি" },
                { value: "large", label: "বড়" },
              ]}
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900">থিম</h2>
            <p className="mb-3 mt-1 text-sm text-gray-500">
              রাতে পড়তে চাইলে ডার্ক বেছে নিন।
            </p>
            <Segmented
              name="থিম"
              value={prefs.theme}
              onChange={(theme) => setPrefs((p) => ({ ...p, theme }))}
              options={[
                { value: "light", label: "লাইট" },
                { value: "dark", label: "ডার্ক" },
                { value: "system", label: "ডিভাইস অনুযায়ী" },
              ]}
            />
          </div>
        </div>
      )}

      {/* নোটিফিকেশন */}
      {tab === "notifications" && (
        <div className="divide-y divide-gray-200">
          <Toggle
            label="ব্রেকিং নিউজ"
            description="গুরুত্বপূর্ণ খবর এলে ইমেইলে জানানো হবে"
            checked={prefs.notifications.breaking}
            onChange={(v) => setNotif("breaking", v)}
          />
          <Toggle
            label="প্রতিদিনের সারসংক্ষেপ"
            description="প্রতি সকালে দিনের প্রধান খবর"
            checked={prefs.notifications.daily}
            onChange={(v) => setNotif("daily", v)}
          />
          <Toggle
            label="সাপ্তাহিক নিউজলেটার"
            description="সপ্তাহের সেরা প্রতিবেদন ও মতামত"
            checked={prefs.notifications.weekly}
            onChange={(v) => setNotif("weekly", v)}
          />
          <Toggle
            label="মন্তব্যের উত্তর"
            description="আপনার মন্তব্যে কেউ উত্তর দিলে"
            checked={prefs.notifications.replies}
            onChange={(v) => setNotif("replies", v)}
          />
        </div>
      )}

      {/* গোপনীয়তা */}
      {tab === "privacy" && (
        <div className="divide-y divide-gray-200">
          <Toggle
            label="প্রোফাইল পাবলিক রাখুন"
            description="চালু থাকলে আপনার নাম, ছবি ও পরিচিতি মন্তব্যের পাশে অন্যরা দেখতে পাবে"
            checked={prefs.publicProfile}
            onChange={(v) => setPrefs((p) => ({ ...p, publicProfile: v }))}
          />
        </div>
      )}

      {showSave && (
        <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
          <Button
            isDisabled={saving}
            onPress={savePrefs}
            className="bg-[#C40004] text-white hover:bg-[#a90000]"
          >
            {saving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
          </Button>
        </div>
      )}

      {/* নিরাপত্তা */}
      {tab === "security" && (
        <div className="flex flex-col gap-10">
          <Form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              changePassword();
            }}
          >
            <div>
              <h2 className="text-base font-bold text-gray-900">
                পাসওয়ার্ড বদলান
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Google দিয়ে সাইন আপ করলে আপনার পাসওয়ার্ড নেই, এই অংশ আপনার
                জন্য নয়।
              </p>
            </div>

            <TextField
              isRequired
              type="password"
              value={pw.current}
              onChange={(x) => setPw((p) => ({ ...p, current: x }))}
            >
              <Label>বর্তমান পাসওয়ার্ড</Label>
              <Input autoComplete="current-password" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              type="password"
              value={pw.next}
              onChange={(x) => setPw((p) => ({ ...p, next: x }))}
              validate={(x) => {
                if (x.length < 8) return "কমপক্ষে ৮ অক্ষর দিন";
                if (!/[A-Z]/.test(x))
                  return "কমপক্ষে একটি বড় হাতের অক্ষর (A-Z) দিন";
                if (!/[0-9]/.test(x)) return "কমপক্ষে একটি সংখ্যা দিন";
                return null;
              }}
            >
              <Label>নতুন পাসওয়ার্ড</Label>
              <Input autoComplete="new-password" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              type="password"
              value={pw.confirm}
              onChange={(x) => setPw((p) => ({ ...p, confirm: x }))}
              validate={(x) => (x !== pw.next ? "পাসওয়ার্ড মিলছে না" : null)}
            >
              <Label>নতুন পাসওয়ার্ড আবার লিখুন</Label>
              <Input autoComplete="new-password" />
              <FieldError />
            </TextField>

            <div>
              <Button
                type="submit"
                isDisabled={pwSaving}
                className="bg-[#C40004] text-white hover:bg-[#a90000]"
              >
                {pwSaving ? "বদলানো হচ্ছে..." : "পাসওয়ার্ড বদলান"}
              </Button>
            </div>
          </Form>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-base font-bold text-red-700">
              অ্যাকাউন্ট মুছে ফেলুন
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              মুছলে আপনার প্রোফাইল, পছন্দ ও সংরক্ষিত তথ্য স্থায়ীভাবে চলে যাবে।
              এটি ফেরানো যাবে না।
            </p>

            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="mt-4 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                অ্যাকাউন্ট মুছতে চাই
              </button>
            ) : (
              <div className="mt-4 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                <label htmlFor="deleteEmail" className="text-sm text-gray-800">
                  নিশ্চিত করতে আপনার ইমেইল <strong>{user.email}</strong> লিখুন
                </label>
                <input
                  id="deleteEmail"
                  value={deleteEmail}
                  onChange={(e) => setDeleteEmail(e.target.value)}
                  className={nativeField}
                  autoComplete="off"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={deleteEmail !== user.email || deleting}
                    onClick={deleteAccount}
                    className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-40"
                  >
                    {deleting ? "মুছে ফেলা হচ্ছে..." : "স্থায়ীভাবে মুছুন"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmDelete(false);
                      setDeleteEmail("");
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
