import NewsCard from "../../../components/news/newsCard";

const page = async({params}) => {
    const {id}= await params
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${id}`)
    const data = await res.json() 
    const categoryNews = data.data
    // console.log(id);
    // console.log(data);
    return (
        <section className="container mx-auto">
            <div className="my-7">
            <h1 className="text-2xl font-bold border-b-3 border-[#C40004] pb-2">{data.title}</h1>
            </div>
            <div className="grid md:grid-cols-2  gap-10 lg:grid-cols-3">
                {
                    categoryNews.map((news:sectionsMainNews) => <NewsCard key={news.id} news={news}/>)
                }
            </div>
        </section>
    );
};

export default page;