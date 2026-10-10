"use client";

import {Check} from "@gravity-ui/icons";

import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { signIn } from "../../lib/auth-client";

export default function SignInPage() {
    const onSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user: Record<string, FormDataEntryValue> = Object.fromEntries(formData.entries()) as {name : string, email:string, image:string, password:string};
        // console.log(user);
        const { data, error } = await signIn.email({
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
    const [preview, setPreview] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        return () => {
        if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleGoogleSignIn = async() => {
        const data = await signIn.social({
        provider: "google",
        callbackURL: "/",
    });

    }
    const handleGithubSignIn = async() => {
        const data = await signIn.social({
        provider: "github",
        callbackURL: "/",
    });

    }
    return (
        <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full items-center justify-center px-4 py-10 sm:py-16">
                    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-[#C40004] sm:text-3xl">
                                সাইন ইন
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                নতুন অ্যাকাউন্ট তৈরি করতে তথ্য দিন
                            </p>
                        </div>
        
                        <Form
                        className="flex w-full flex-col gap-5"
                        onSubmit={onSubmit}
                        >
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
                            সাইন ইন
                            </Button>
                            <Button type="reset" variant="secondary" className="w-full sm:w-auto">
                            রিসেট
                            </Button>
                        </div>
        
                        <p className="text-center text-sm text-gray-500">
                            আগেই অ্যাকাউন্ট না থাকলে?{" "}
                            <a href="/signUp"className="font-semibold text-[#C40004] hover:underline">
                            সাইন আপ করুন
                            </a>
                        </p>
                        </Form>
                        <button onClick={handleGoogleSignIn} className="btn">Google Sign-In</button>
                        <button onClick={handleGithubSignIn} className="btn">Github Sign-In</button>
                    </div>
                </section>
    );
}