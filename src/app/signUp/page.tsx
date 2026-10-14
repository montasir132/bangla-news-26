
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiLock,
  FiImage,
} from "react-icons/fi";
import { Bounce, toast } from "react-toastify";
import { signIn, signUp } from "../../lib/auth-client";

const MAX_SIZE_MB = 2;

const toastOptions = {
  position: "bottom-right" as const,
  autoClose: 4000,
  theme: "colored" as const,
  transition: Bounce,
};

export default function SignUpPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const clearImage = () => {
    setPreview(null);
    setImageError(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      clearImage();
      return;
    }

    if (!file.type.startsWith("image/")) {
      clearImage();
      setImageError("অনুগ্রহ করে একটি বৈধ ছবি নির্বাচন করুন।");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      clearImage();
      setImageError(
        `ছবির সাইজ ${MAX_SIZE_MB}MB-এর বেশি হতে পারবে না।`,
      );
      return;
    }

    setImageError(null);
    setPreview(URL.createObjectURL(file));
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    }

    if (!/[A-Z]/.test(value)) {
      return "কমপক্ষে একটি বড় হাতের অক্ষর (A-Z) দিন।";
    }

    if (!/[0-9]/.test(value)) {
      return "কমপক্ষে একটি সংখ্যা দিন।";
    }

    return null;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading || socialLoading) return;

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    if (name.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে।", toastOptions);
      return;
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      toast.error(passwordError, toastOptions);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুইটি পাসওয়ার্ড একই নয়।", toastOptions);
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "রেজিস্ট্রেশন করা যায়নি। আবার চেষ্টা করুন।",
          toastOptions,
        );
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", toastOptions);
      router.replace("/");
      router.refresh();
    } catch {
      toast.error(
        "রেজিস্ট্রেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        toastOptions,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (
    provider: "google" | "github",
  ) => {
    if (loading || socialLoading) return;

    setSocialLoading(provider);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || `${provider} দিয়ে সাইন আপ করা যায়নি।`,
          toastOptions,
        );
        setSocialLoading(null);
      }
    } catch {
      toast.error(
        "সোশ্যাল সাইন-আপে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        toastOptions,
      );
      setSocialLoading(null);
    }
  };

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-red-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

      <section className="signup-card relative w-full max-w-md rounded-3xl border border-white bg-white/95 p-6 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-9">
        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C40004] text-2xl font-extrabold text-white shadow-lg shadow-red-200">
            B
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            আপনার নতুন অ্যাকাউন্ট তৈরি করতে তথ্য দিন।
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Profile image */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label="প্রোফাইল ছবি নির্বাচন করুন"
                className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-[#C40004] hover:bg-red-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="প্রোফাইল ছবির প্রিভিউ"
                    fill
                    unoptimized
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex flex-col items-center gap-2 text-slate-400 transition group-hover:text-[#C40004]">
                    <FiImage className="text-2xl" />
                    <span className="text-xs">ছবি দিন</span>
                  </span>
                )}
              </button>

              {preview && (
                <button
                  type="button"
                  onClick={clearImage}
                  aria-label="প্রোফাইল ছবি সরান"
                  className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-sm text-white transition hover:bg-[#C40004]"
                >
                  ×
                </button>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <p className="text-xs text-slate-400">
              প্রোফাইল ছবি ঐচ্ছিক · সর্বোচ্চ {MAX_SIZE_MB}MB
            </p>

            {imageError && (
              <p role="alert" className="text-xs text-red-600">
                {imageError}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              আপনার নাম
            </label>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                minLength={3}
                placeholder="আপনার পুরো নাম"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#C40004] focus:bg-white focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              পাসওয়ার্ড সেট করুন
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="একটি শক্তিশালী পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#C40004] focus:bg-white focus:ring-4 focus:ring-red-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-[#C40004]"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা দিন।
            </p>

            {password.length > 0 && (
              <div className="mt-2 space-y-1 text-xs">
                <p
                  className={
                    password.length >= 8
                      ? "text-green-600"
                      : "text-slate-400"
                  }
                >
                  {password.length >= 8 ? "✓" : "○"} কমপক্ষে ৮ অক্ষর
                </p>

                <p
                  className={
                    /[A-Z]/.test(password)
                      ? "text-green-600"
                      : "text-slate-400"
                  }
                >
                  {/[A-Z]/.test(password) ? "✓" : "○"} একটি বড় হাতের অক্ষর
                </p>

                <p
                  className={
                    /[0-9]/.test(password)
                      ? "text-green-600"
                      : "text-slate-400"
                  }
                >
                  {/[0-9]/.test(password) ? "✓" : "○"} একটি সংখ্যা
                </p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="পাসওয়ার্ড আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                aria-invalid={passwordsMismatch}
                className={`h-12 w-full rounded-xl border bg-slate-50 pl-11 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                  passwordsMismatch
                    ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                    : passwordsMatch
                      ? "border-green-500 focus:border-green-500 focus:ring-green-100"
                      : "border-slate-200 hover:border-slate-300 focus:border-[#C40004] focus:ring-red-100"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                aria-label={
                  showConfirmPassword
                    ? "কনফার্ম পাসওয়ার্ড লুকান"
                    : "কনফার্ম পাসওয়ার্ড দেখুন"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-[#C40004]"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {passwordsMatch && (
              <p className="mt-2 text-xs font-medium text-green-600">
                ✓ দুইটি পাসওয়ার্ড মিলেছে।
              </p>
            )}

            {passwordsMismatch && (
              <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                ✕ দুইটি পাসওয়ার্ড মিলছে না।
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C40004] px-4 text-sm font-bold text-white shadow-lg shadow-red-200 transition duration-200 hover:-translate-y-0.5 hover:bg-[#a90000] hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                অ্যাকাউন্ট তৈরি হচ্ছে...
              </>
            ) : (
              <>
                <Check />
                অ্যাকাউন্ট তৈরি করুন
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

        {/* Social sign-up */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSocialSignUp("google")}
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
            onClick={() => handleSocialSignUp("github")}
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

        {/* Sign in link */}
        <p className="mt-7 text-center text-sm text-slate-500">
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-bold text-[#C40004] transition hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

        <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-400">
          নিরাপদে অ্যাকাউন্ট তৈরি করুন · আপনার তথ্য সুরক্ষিত রাখুন
        </p>
      </section>

      <style jsx>{`
        .signup-card {
          animation: fadeIn 0.5s ease-out;
        }

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
          .signup-card {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
