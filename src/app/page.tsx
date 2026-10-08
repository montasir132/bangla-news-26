import MainNews from "../components/news/MainNews";
import MostReadNews from "../components/news/mostReadNews";
import NewsCard from "../components/news/newsCard";

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data;
  // console.log(sections);
  const mainNews = sections[0].articles;
  const otherSection = sections.slice(1);
  // console.log(otherSection);
  // console.log(mainNews);
  return (
    <>
      <section className="container my-7 mx-auto">
        <div className="grid gap-5 grid-cols-3">
          <div className="col-span-2 ">
            <div>
              <MainNews news={mainNews} />
              <div className="grid, gap-5 mt-5">
                {otherSection.map((os: otherSection) => (
                  <div key={os.curationId}>
                    <h1 className="font-bold text-xl border-b-3 border-[#C40004] pb-2 mb-7 mt-3">{os.title}</h1>
                    <div className="grid lg:grid-cols-3 gap-4">
                    {Array.isArray(os.articles) &&
                      os.articles.map((news: sectionsMainNews) => (
                        <NewsCard key={news.id} news={news} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <MostReadNews/>
          </div>
        </div>
      </section>
    </>
  );
}
