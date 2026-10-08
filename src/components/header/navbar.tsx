"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface NavigationBarProps {
    navData: categories[];
}

const NavigationBar =({ navData }: NavigationBarProps) => {
    const pathname = usePathname()
    const activeNavLinks = navData.filter((n) => n.scrapable)
    // console.log(activeNavLinks);
    return (
        <nav className="flex justify-center mt-6 mb-3 items-center gap-5">
            <Link className={`link ${pathname === '/' ? 'text-[#C40004]' : ''}`} href='/'>হোম</Link>
            {
                activeNavLinks.map((n, i:number)=><Link key={i} className={`link ${pathname ===`/categories/${n.slug}` ? 'text-[#C40004]' : ''}`} href={`/categories/${n.slug}`}>{n.title}</Link>)
            }
        </nav>
    );
};

export default NavigationBar;