"use client"
import { authClient } from "../../lib/auth-client";

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = (session as { user?: { name?: string; email?: string } } | null | undefined)?.user;
    console.log(user);
    return (
        <>
            <div className="flex items-center justify-end gap-1 sm:gap-2">
                <button
                    type="button"
                    className="btn btn-sm border border-transparent bg-white text-[#404040] hover:border-[#C40004] hover:bg-white hover:text-[#C40004] sm:btn-md"
                >
                    সাইন ইন
                </button>
                <button
                    type="button"
                    className="btn btn-sm border-[#C40004] bg-[#C40004] text-white shadow-sm hover:border-[#a90000] hover:bg-[#a90000] sm:btn-md"
                >
                    সাইন আপ
                </button>
            </div>
        </>
    );
};

export default UserInfo;
