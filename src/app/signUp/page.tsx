"use client";

import { Check } from "@gravity-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import {Button, Description, FieldError, Form, Input, Label, TextField, } from "@heroui/react";
import Image from "next/image";
import { signUp } from "../../lib/auth-client";
import { redirect } from "next/navigation";
import { Bounce, toast } from "react-toastify";
const MAX_SIZE_MB = 2;

export default function SignUpPage() {
    const [imageError, setImageError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false); 
    
    useEffect(() => {
        return () => { 
            if (preview) URL.revokeObjectURL(preview)
            }
        }, [preview]);
    const clearImage = () => {
        setPreview(null);
        setImageError(null);
        if (fileRef.current) fileRef.current.value = "";
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return clearImage();

        if (!file.type.startsWith("image/")) {
        clearImage();
        return setImageError("অনুগ্রহ করে একটি ছবি নির্বাচন করুন");
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        clearImage();
        return setImageError(`ছবির সাইজ ${MAX_SIZE_MB}MB এর বেশি হতে পারবে না`);
        }

        setImageError(null);
        setPreview(URL.createObjectURL(file));
    };

    const onSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user: Record<string, FormDataEntryValue> = Object.fromEntries(formData.entries()) as {name : string, email:string, image:string, password:string};
        // console.log(user);
        const { data, error } = await signUp.email({
            ...user,
            callbackURL: "/"
        })
        if(data){
            console.log(data);
            toast.success('Signed up successfully.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            redirect('/');
        }else{
            console.log(error);
            toast.error('This Gmail account is already signed up; please try sign in.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    return (
        <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full items-center justify-center px-4 py-10 sm:py-16">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
                <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-[#C40004] sm:text-3xl">
                    সাইন আপ
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    নতুন অ্যাকাউন্ট তৈরি করতে তথ্য দিন
                </p>
                </div>

                <Form
                className="flex w-full flex-col gap-5"
                onSubmit={onSubmit}
                onReset={clearImage}
                >
                {/* Avatar upload */}
                <div className="flex flex-col items-center gap-2">
                    <label
                    htmlFor="profileImage"
                    className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 transition-colors focus-within:border-[#C40004] hover:border-[#C40004]"
                    >
                    {preview ? (
                        <Image
                        src={preview}
                        alt="প্রোফাইল ছবির প্রিভিউ"
                        fill
                        unoptimized
                        className="object-cover"
                        />
                    ) : (
                        <span className="px-2 text-center text-xs text-gray-500 group-hover:text-[#C40004]">
                        ছবি আপলোড করুন
                        </span>
                    )}
                    {/* Native input: stays in the form, keyboard-accessible */}
                    <input
                        ref={fileRef}
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                    />
                    </label>

                    {preview && (
                    <button
                        type="button"
                        onClick={clearImage}
                        className="text-xs text-gray-500 underline hover:text-[#C40004]"
                    >
                        ছবি সরান
                    </button>
                    )}
                    {imageError && (
                    <p role="alert" className="text-xs text-red-600">
                        {imageError}
                    </p>
                    )}
                    <p className="text-xs text-gray-400">
                    ঐচ্ছিক • সর্বোচ্চ {MAX_SIZE_MB}MB
                    </p>
                </div>

                {/* Name */}
                <TextField
                    isRequired
                    name="name"
                    className="w-full"
                    validate={(value) =>
                    value.trim().length < 3
                        ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                        : null
                    }
                >
                    <Label>নাম</Label>
                    <Input placeholder="আপনার নাম লিখুন" autoComplete="name" />
                    <FieldError />
                </TextField>

                {/* Email */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    className="w-full"
                    validate={(value) =>
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                        ? "সঠিক ইমেইল ঠিকানা দিন"
                        : null
                    }
                >
                    <Label>ইমেইল</Label>
                    <Input placeholder="you@example.com" autoComplete="email" />
                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                    isRequired
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full"
                    validate={(value) => {
                    if (value.length < 8) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                    if (!/[A-Z]/.test(value))
                        return "কমপক্ষে একটি বড় হাতের অক্ষর (A-Z) থাকতে হবে";
                    if (!/[0-9]/.test(value)) return "কমপক্ষে একটি সংখ্যা থাকতে হবে";
                    return null;
                    }}
                >
                    <Label>পাসওয়ার্ড</Label>
                    <div className="relative">
                    <Input
                        placeholder="পাসওয়ার্ড লিখুন"
                        autoComplete="new-password"
                        className="w-full pr-16"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-[#C40004]"
                    >
                        {showPassword ? "লুকান" : "দেখান"}
                    </button>
                    </div>
                    <Description>
                    কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা
                    </Description>
                    <FieldError />
                </TextField>

                {/* Actions */}
                <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                    type="submit"
                    className="w-full bg-[#C40004] text-white hover:bg-[#a90000] sm:flex-1"
                    >
                    <Check />
                    সাইন আপ
                    </Button>
                    <Button type="reset" variant="secondary" className="w-full sm:w-auto">
                    রিসেট
                    </Button>
                </div>

                <p className="text-center text-sm text-gray-500">
                    আগেই অ্যাকাউন্ট আছে?{" "}
                    <a href="/signIn" className="font-semibold text-[#C40004] hover:underline">
                    সাইন ইন করুন
                    </a>
                </p>
                </Form>
            </div>
        </section>
    );
}