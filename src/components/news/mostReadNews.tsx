import Link from "next/link";

const MostReadNews = async() => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const data = await res.json();
    const news = data.data;
    return (
        <div className="card p-2 bg-base-100 border border-gray-300">
            <h2 className="font-bold text-xl">সর্বাধিক পঠিত</h2>
            <div className="grid gap-3">
                {
                    news.map((n:sectionsMainNews,i:number) => <div key={n.id}>
                        <Link href={`/news/${n.id}`}>
                        <h2 className="text-xl"><span className="text-red-600">{i+1}.</span>{n.title}</h2>
                        </Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MostReadNews;