
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";
import { signIn } from "../../lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।", {
          position: "bottom-right",
          transition: Bounce,
          theme: "colored",
        });
        return;
      }

      toast.success("সফলভাবে লগইন হয়েছে!", {
        position: "bottom-right",
        transition: Bounce,
        theme: "colored",
      });

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        position: "bottom-right",
        transition: Bounce,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    if (socialLoading) return;

    setSocialLoading(provider);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি।", {
          position: "bottom-right",
          transition: Bounce,
          theme: "colored",
        });
        setSocialLoading(null);
      }
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে।", {
        position: "bottom-right",
        transition: Bounce,
        theme: "colored",
      });
      setSocialLoading(null);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-red-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

      <section className="animate-[fadeIn_0.5s_ease-out] relative w-full max-w-md rounded-3xl border border-white bg-white/95 p-6 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-9">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C40004] text-2xl font-extrabold text-white shadow-lg shadow-red-200">
            N
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            স্বাগতম!
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            আপনার অ্যাকাউন্টে প্রবেশ করতে লগইন করুন।
          </p>
        </div>

        {/* Email & password */}
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              ইমেইল ঠিকানা
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#C40004] focus:bg-white focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              পাসওয়ার্ড
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#C40004] focus:bg-white focus:ring-4 focus:ring-red-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-[#C40004]"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-[#C40004] transition hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C40004] px-4 text-sm font-bold text-white shadow-lg shadow-red-200 transition duration-200 hover:-translate-y-0.5 hover:bg-[#a90000] hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                লগইন হচ্ছে...
              </>
            ) : (
              <>
                সাইন ইন করুন
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">
            অথবা ব্যবহার করুন
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Social login */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={!!socialLoading || loading}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "google" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#C40004]" />
            ) : (
              <FcGoogle className="text-xl" />
            )}
            Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={!!socialLoading || loading}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {socialLoading === "github" ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#C40004]" />
            ) : (
              <FaGithub className="text-xl text-slate-900" />
            )}
            GitHub
          </button>
        </div>

        {/* Signup link */}
        <p className="mt-7 text-center text-sm text-slate-500">
          নতুন ব্যবহারকারী?{" "}
          <Link
            href="/sign-up"
            className="font-bold text-[#C40004] transition hover:underline"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>

        <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-400">
          নিরাপদে লগইন করুন · আপনার তথ্য সুরক্ষিত রাখুন
        </p>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          section {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
