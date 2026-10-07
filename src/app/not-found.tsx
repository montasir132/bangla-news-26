import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center bg-white px-4">
            <div className="text-center">

                <div className="mb-6 text-7xl font-black text-[#C40004]">
                404
                </div>

                <h1 className="text-2xl font-bold text-[#171717] sm:text-3xl">
                খবরটি খুঁজে পাওয়া যায়নি
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#737373] sm:text-base">
                দুঃখিত, আপনি যে সংবাদ বা পেজটি খুঁজছেন সেটি
                এই ঠিকানায় পাওয়া যায়নি।
                </p>

                <Link
                href="/"
                className="mt-8 inline-block rounded-lg bg-[#C40004] px-6 py-3
                font-semibold text-white transition hover:bg-[#a90000]"
                >
                হোমপেজে ফিরে যান
                </Link>

            </div>
        </main>
    );
}