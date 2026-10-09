import Image from "next/image";
import Link from "next/link";
import NavigationBar from "./navbar";
import UserInfo from "./userInfo";

const Header = async() => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    const res = await fetch('https://news-api-v2.vercel.app/api/categories')
    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }
    const data = await res.json()
    const navData = data.data;
    // console.log(navData);
    return (
        <header className="container mx-auto mb-6 mt-2 px-4 text-[#171717]">
            <section className="grid grid-cols-[1fr_auto] items-center gap-3 py-3 md:grid-cols-3">
                <div className="hidden text-sm text-[#737373] md:block">{date}</div>

                {/* লোগো + ব্র্যান্ড */}
                <Link
                href="/"
                className="flex min-w-0 items-center gap-2 md:justify-center"
                >
                <Image
                    className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
                    width={50}
                    height={50}
                    alt="Bangla News 26"
                    src="/logo.webp"
                    priority
                />
                <div className="min-w-0">
                    <h1 className="truncate text-lg font-bold leading-tight text-[#C40004] sm:text-2xl">
                    Bangla News 26
                    </h1>
                    {/* মোবাইলে তারিখ এখানে */}
                    <p className="truncate text-[11px] text-[#737373] sm:text-xs md:hidden">
                    {date}
                    </p>
                </div>
                </Link>

                {/* ডান পাশ: সাইন ইন / সাইন আপ */}
                <UserInfo/>
            </section>

            <div className="h-0.5 w-full bg-linear-to-r from-transparent via-[#C40004] to-transparent" />
            <NavigationBar navData={navData} />
        </header>
    );
};

export default Header;