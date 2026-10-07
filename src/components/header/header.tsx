import Image from "next/image";
import Link from "next/link";
import NavigationBar from "./navbar";

const Header = async() => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    const res = await fetch('https://news-api-v2.vercel.app/api/categories')
    const data = await res.json()
    const navData = data.data;
    // console.log(navData);
    return (
        <header className="container mx-auto mt-4 mb-8 px-4 text-[#171717]">
            <section className="relative flex items-center justify-between min-h-16">
                {/* Logo + Brand - Center */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link
                        href="/"
                        className="flex items-center gap-2">
                        <Image
                        className="w-10 h-10 object-contain"
                        width={50}
                        height={50}
                        alt="Bangla News 26"
                        src="/logo.webp"
                        />
                        <div>
                            <h1 className="text-[#C40004] text-xl md:text-2xl font-bold leading-tight">
                                Bangla News 26
                            </h1>

                            <p className="text-[#737373] text-xs md:text-sm">
                                {date}
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Sign In / Sign Up - Right */}
                <div className="ml-auto flex items-center gap-1 sm:gap-2">
                <button
                    className="btn btn-sm sm:btn-md bg-white border border-transparent
                    hover:border-[#C40004] hover:text-[#C40004]
                    text-[#404040]"
                    type="button"
                >
                    সাইন ইন
                </button>

                <button
                    className="btn btn-sm sm:btn-md
                    bg-[#C40004] text-white border-[#C40004]
                    hover:bg-[#a90000]"
                    type="button"
                >
                    সাইন আপ
                </button>
                </div>
            </section>
            <NavigationBar navData = {navData}/>
        </header>
    );
};

export default Header;