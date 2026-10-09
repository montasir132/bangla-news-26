"use client";

import { memo, useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Person, Gear, ArrowRightFromSquare } from "@gravity-ui/icons";
import { Avatar, Popover, Separator } from "@heroui/react";
import { authClient } from "../../lib/auth-client";

type SessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

const MENU_ITEMS = [
    { href: "/profile", label: "প্রোফাইল", Icon: Person },
    { href: "/settings", label: "সেটিংস", Icon: Gear },
] as const;

const menuItemClass =
    "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-default";

const UserAvatar = memo(function UserAvatar({ user }: { user: SessionUser }) {
    const initial = user.name?.trim().charAt(0).toUpperCase();
    return (
        <Avatar>
            {user.image && <Avatar.Image alt={user.name ?? "User"} src={user.image} />}
            <Avatar.Fallback>{initial || <Person />}</Avatar.Fallback>
        </Avatar>
    );
});

const AuthButtons = () => (
    <div className="flex items-center justify-end gap-1 sm:gap-2">
        <Link
            href="/signIn"
            className="btn btn-sm border border-transparent bg-white text-[#404040] hover:border-[#C40004] hover:bg-white hover:text-[#C40004] sm:btn-md"
        >
            সাইন ইন
        </Link>
        <Link
            href="/signUp"
            className="btn btn-sm border-[#C40004] bg-[#C40004] text-white shadow-sm hover:border-[#a90000] hover:bg-[#a90000] sm:btn-md"
        >
            সাইন আপ
        </Link>
    </div>
);

const UserInfo = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = (session as { user?: SessionUser } | null | undefined)?.user;

    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const closeMenu = useCallback(() => setOpen(false), []);

    const handleLogout = useCallback(async () => {
        setLoggingOut(true);
        setOpen(false);

        await authClient.signOut({
            fetchOptions: {
                onSuccess: async () => {
                    // ক্যাশ বাইপাস করে সেশন রিফ্রেশ, যাতে useSession() সাথে সাথে null হয়
                    await authClient.getSession({
                        query: { disableCookieCache: true },
                    });
                    router.push("/");
                    router.refresh();
                },
                onError: (ctx) => {
                    console.error("Logout failed:", ctx.error);
                },
            },
        });

        setLoggingOut(false);
    }, [router]);

    // সেশন লোড হওয়ার সময় সাইন ইন বাটন ফ্ল্যাশ করা ঠেকাতে placeholder
    if (isPending) {
        return <div className="size-10 animate-pulse rounded-full bg-default" aria-hidden />;
    }

    if (!user) return <AuthButtons />;

    return (
        <div className="flex items-center justify-end">
            <Popover isOpen={open} onOpenChange={setOpen}>
                <Popover.Trigger>
                    <button
                        type="button"
                        aria-label="ইউজার মেনু"
                        className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#C40004]"
                    >
                        <UserAvatar user={user} />
                    </button>
                </Popover.Trigger>

                <Popover.Content placement="bottom end" className="w-60">
                    <Popover.Dialog className="p-2">
                        <div className="flex items-center gap-3 px-2 py-2">
                            <UserAvatar user={user} />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                    {user.name ?? "ব্যবহারকারী"}
                                </p>
                                <p className="truncate text-xs text-muted">{user.email}</p>
                            </div>
                        </div>

                        <Separator className="my-1" />

                        {MENU_ITEMS.map(({ href, label, Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={closeMenu}
                                className={menuItemClass}
                            >
                                <Icon className="size-4" />
                                {label}
                            </Link>
                        ))}

                        <Separator className="my-1" />

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-danger hover:bg-danger/10 disabled:opacity-50"
                        >
                            <ArrowRightFromSquare className="size-4" />
                            {loggingOut ? "লগ আউট হচ্ছে..." : "লগ আউট"}
                        </button>
                    </Popover.Dialog>
                </Popover.Content>
            </Popover>
        </div>
    );
};

export default UserInfo;