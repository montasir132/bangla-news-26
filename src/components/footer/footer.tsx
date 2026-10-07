import Image from "next/image";
import Link from "next/link";
const Footer = async () => {
    const res = await fetch(
        "https://news-api-v2.vercel.app/api/categories"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    const data = await res.json();

    const categories: categories[] = data.data;

    const activeCategories = categories.filter(
        (category) => category.scrapable
    );

    return (
        <footer className="mt-16 border-t border-gray-200 bg-white text-[#171717]">

            <div className="container mx-auto px-4 py-12 md:py-16">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                {/* Brand */}
                <div>
                    <Link href="/" className="inline-flex items-center gap-3">
                    <Image
                        src="/logo.webp"
                        alt="Bangla News 26"
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                    />

                    <div>
                        <h2 className="text-xl font-bold text-[#C40004]">
                        Bangla News 26
                        </h2>

                        <p className="text-xs text-gray-500">
                        সত্যের সাথে, সবসময়
                        </p>
                    </div>
                    </Link>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-[#737373]">
                    দেশ ও বিশ্বের সর্বশেষ সংবাদ, রাজনীতি, খেলাধুলা,
                    বিনোদন, প্রযুক্তি এবং গুরুত্বপূর্ণ খবর জানতে
                    Bangla News 26-এর সাথে থাকুন।
                    </p>
                </div>

                {/* Important Links */}
                <div>
                    <h3 className="mb-5 text-lg font-bold">
                    গুরুত্বপূর্ণ
                    </h3>

                    <ul className="space-y-3 text-sm">
                    <li>
                        <Link
                        href="/"
                        className="text-[#737373] hover:text-[#C40004]"
                        >
                        হোম
                        </Link>
                    </li>

                    <li>
                        <Link
                        href="/about"
                        className="text-[#737373] hover:text-[#C40004]"
                        >
                        আমাদের সম্পর্কে
                        </Link>
                    </li>

                    <li>
                        <Link
                        href="/contact"
                        className="text-[#737373] hover:text-[#C40004]"
                        >
                        যোগাযোগ
                        </Link>
                    </li>

                    <li>
                        <Link
                        href="/privacy-policy"
                        className="text-[#737373] hover:text-[#C40004]"
                        >
                        গোপনীয়তা নীতি
                        </Link>
                    </li>
                    </ul>
                </div>

                {/* Dynamic Categories */}
                <div>
                    <h3 className="mb-5 text-lg font-bold">
                    সংবাদ বিভাগ
                    </h3>

                    <ul className="space-y-3 text-sm">
                    {activeCategories.map((category) => (
                        <li key={category.slug}>
                        <Link
                            href={`/${category.slug}`}
                            className="text-[#737373] transition hover:text-[#C40004]"
                        >
                            {category.title}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="mb-5 text-lg font-bold">
                    যোগাযোগ
                    </h3>

                    <div className="space-y-4 text-sm text-[#737373]">

                    <p>📍 ঢাকা, বাংলাদেশ</p>

                    <a
                        href="mailto:info@banglanews26.com"
                        className="block hover:text-[#C40004]"
                    >
                        ✉ info@banglanews26.com
                    </a>

                    <a
                        href="tel:+8801977043797"
                        className="block hover:text-[#C40004]"
                    >
                        ☎ +8801977043797
                    </a>

                    </div>
                </div>

                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-200 bg-gray-50">
                <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row">

                <p className="text-xs text-[#737373] sm:text-sm">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-[#C40004]">
                    Bangla News 26
                    </span>
                    . সর্বস্বত্ব সংরক্ষিত।
                </p>

                <p className="text-xs text-gray-400">
                    সত্য সংবাদ • নির্ভরযোগ্য তথ্য
                </p>

                </div>
            </div>

        </footer>
    );
};

export default Footer;