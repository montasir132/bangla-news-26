import Link from "next/link";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
interface MarqueeProps {
    data: LatestHeadlines[];
}

const Marquee = async() => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=20')
    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }
    const data: MarqueeProps = await res.json()
    const headline: LatestHeadlines[] = data.data;
    // console.log(headline);
    return (
        <section className="container mx-auto">
            <div className="flex items-center justify-center">
                <p className="btn bg-[#a51a1d] text-white border-none">সর্বশেষ</p>
                <MarqueeText direction='right' duration={10}>
                {
                    headline.map((h, index) => (
                        <span key={index}>
                            <Link target="blank" href={h.link}>
                            <span>{h.title}</span>
                            </Link>
                            <span className="mx-5">•</span>
                        </span>
                    ))
                }
                </MarqueeText>
            </div>
        </section>
    );
};

export default Marquee;