"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Gear, Person } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { authClient } from "../../lib/auth-client";
import { DIVISIONS } from "../../lib/user-prefs";

type ProfileUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt?: string | Date | null;
  phone?: string | null;
  bio?: string | null;
  gender?: string | null;
  birthDate?: string | null;
  division?: string | null;
  district?: string | null;
  address?: string | null;
};

type Values = {
    name: string;
  image: string;
  phone: string;
  bio: string;
  gender: string;
  birthDate: string;
  division: string;
  district: string;
  address: string;
};

const BIO_MAX = 200;

const nativeField =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#C40004] focus:ring-1 focus:ring-[#C40004]";

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5 border-t border-gray-200 py-8 md:grid-cols-[220px_1fr] md:gap-10">
      <div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {hint && (
          <p className="mt-1 text-sm leading-relaxed text-gray-500">{hint}</p>
        )}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = (session as { user?: ProfileUser } | null | undefined)?.user;

  if (isPending) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-gray-500">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-gray-600">প্রোফাইল দেখতে আগে সাইন ইন করুন।</p>
        <Link
          href="/signIn"
          className="btn mt-4 border-[#C40004] bg-[#C40004] text-white hover:bg-[#a90000]"
        >
          সাইন ইন
        </Link>
      </div>
    );
  }

  return <ProfileForm key={user.id ?? user.email ?? "profile"} user={user} />;
}

function ProfileForm({ user }: { user: ProfileUser }) {
  const [v, setV] = useState<Values>(() => ({
    name: user.name ?? "",
    image: user.image ?? "",
    phone: user.phone ?? "",
    bio: user.bio ?? "",
    gender: user.gender ?? "",
    birthDate: user.birthDate ?? "",
    division: user.division ?? "",
    district: user.district ?? "",
    address: user.address ?? "",
  }));
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setV((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await authClient.updateUser({
        name: v.name.trim(),
      image: v.image.trim() || null,
      phone: v.phone.trim(),
      bio: v.bio.trim(),
      gender: v.gender,
      birthDate: v.birthDate,
      division: v.division,
      district: v.district.trim(),
      address: v.address.trim(),
    } as any);
    setSaving(false);

    if (error) {
      toast.error(
        error.message || "প্রোফাইল সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।",
      );
      return;
    }
    toast.success("প্রোফাইল সংরক্ষণ হয়েছে");
  };

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
      })
    : null;
  const initial = user.name?.trim().charAt(0).toUpperCase();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      {/* হেডার */}
      <header className="flex flex-col items-start gap-5 pb-8 sm:flex-row sm:items-center">
        <Avatar className="size-24 shrink-0 text-2xl">
          {v.image && (
            <Avatar.Image alt={user.name ?? "ব্যবহারকারী"} src={v.image} />
          )}
          <Avatar.Fallback>{initial || <Person />}</Avatar.Fallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-3xl font-bold text-gray-900">
            {user.name}
          </h1>
          <p className="truncate text-sm text-gray-500">{user.email}</p>
          {joined && (
            <p className="mt-1 text-sm text-gray-500">
              {joined} থেকে আমাদের পাঠক
            </p>
          )}
        </div>
        <Link
          href="/settings"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-[#C40004] hover:text-[#C40004]"
        >
          <Gear className="size-4" />
          সেটিংস
        </Link>
      </header>

      <Form onSubmit={onSubmit} className="w-full">
        <div className="w-full">
          <Section
  title="অ্যাকাউন্ট"
  hint="নাম বদলাতে পারবেন। ইমেইল বদলানো যায় না।"
>
  <TextField
    isRequired
    value={v.name}
    onChange={(x) => set("name", x)}
    className="w-full"
    validate={(x) =>
      x.trim().length < 3 ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে" : null
    }
  >
    <Label>নাম</Label>
    <Input placeholder="আপনার নাম লিখুন" autoComplete="name" />
    <FieldError />
  </TextField>

  <TextField isDisabled value={user.email ?? ""} className="w-full">
    <Label>ইমেইল</Label>
    <Input />
  </TextField>
</Section>

          <Section
            title="প্রোফাইল ছবি"
            hint="ছবির সরাসরি লিংক দিন। খালি রাখলে নামের প্রথম অক্ষর দেখাবে।"
          >
            <TextField
              value={v.image}
              onChange={(x) => set("image", x)}
              className="w-full"
            >
              <Label>ছবির লিংক</Label>
              <Input placeholder="https://..." />
              <Description>jpg, png বা webp লিংক</Description>
            </TextField>
          </Section>

          <Section
            title="ব্যক্তিগত তথ্য"
            hint="এই তথ্য শুধু আপনি দেখতে পাবেন, যতক্ষণ না সেটিংসে প্রোফাইল পাবলিক করেন।"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="bio"
                className="text-sm font-medium text-gray-800"
              >
                নিজের সম্পর্কে
              </label>
              <textarea
                id="bio"
                rows={3}
                maxLength={BIO_MAX}
                value={v.bio}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="আপনার সম্পর্কে এক-দুই লাইন লিখুন"
                className={nativeField}
              />
              <p className="text-right text-xs text-gray-400">
                {v.bio.length}/{BIO_MAX}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                type="tel"
                value={v.phone}
                onChange={(x) => set("phone", x)}
                validate={(x) =>
                  x && !/^(?:\+?88)?01[3-9]\d{8}$/.test(x)
                    ? "সঠিক মোবাইল নম্বর দিন (যেমন 017XXXXXXXX)"
                    : null
                }
              >
                <Label>মোবাইল নম্বর</Label>
                <Input placeholder="01XXXXXXXXX" autoComplete="tel" />
                <FieldError />
              </TextField>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="birthDate"
                  className="text-sm font-medium text-gray-800"
                >
                  জন্ম তারিখ
                </label>
                <input
                  id="birthDate"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={v.birthDate}
                  onChange={(e) => set("birthDate", e.target.value)}
                  className={nativeField}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:max-w-[calc(50%-0.625rem)]">
              <label
                htmlFor="gender"
                className="text-sm font-medium text-gray-800"
              >
                লিঙ্গ
              </label>
              <select
                id="gender"
                value={v.gender}
                onChange={(e) => set("gender", e.target.value)}
                className={nativeField}
              >
                <option value="">বলতে চাই না</option>
                <option value="male">পুরুষ</option>
                <option value="female">নারী</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>
          </Section>

          <Section
            title="ঠিকানা"
            hint="আপনার এলাকার সংবাদ সাজাতে এটি কাজে লাগবে।"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="division"
                  className="text-sm font-medium text-gray-800"
                >
                  বিভাগ
                </label>
                <select
                  id="division"
                  value={v.division}
                  onChange={(e) => set("division", e.target.value)}
                  className={nativeField}
                >
                  <option value="">নির্বাচন করুন</option>
                  {DIVISIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <TextField
                value={v.district}
                onChange={(x) => set("district", x)}
              >
                <Label>জেলা</Label>
                <Input placeholder="আপনার জেলা" />
              </TextField>
            </div>

            <TextField
              value={v.address}
              onChange={(x) => set("address", x)}
              className="w-full"
            >
              <Label>বিস্তারিত ঠিকানা</Label>
              <Input
                placeholder="বাসা/রোড, থানা"
                autoComplete="street-address"
              />
            </TextField>
          </Section>

          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
            <Button
              type="submit"
              isDisabled={saving}
              className="bg-[#C40004] text-white hover:bg-[#a90000]"
            >
              {saving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
            </Button>
          </div>
        </div>
      </Form>
    </main>
  );
}
