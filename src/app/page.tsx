import MainNews from "../components/MainNews";
import Marquee from "../components/marquee";

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data;
  // console.log(sections);
  const mainNews = sections[0].articles;

  // console.log(mainNews);
  return (
    <>
      <div className="bg-[#C40004] text-white">
        <Marquee />
      </div>
      <section className="container my-7 mx-auto">
        <div className="grid grid-cols-3">
          <div className="col-span-2 ">
            <div>
              <MainNews news={mainNews} />
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>
      </section>
    </>
  );
}
