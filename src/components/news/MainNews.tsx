import Image from 'next/image';
import Link from 'next/link';
const MainNews = ({news}) => {
    // console.log(news);
    const [firstNews, ...otherNews] = news
    const {id,imageUrl,imageAlt,category, title,description} = firstNews
    // const otherNews = news.slice(1)
    const {} = otherNews
    return (
        <section className="lg:flex lg:gap-2">
            <Link href={`/news/${id}`}>
                <div className="card bg-base-100 w-96 shadow-sm">
                    <figure>
                        <Image height={600} width={600} className='relative w-full' alt={imageAlt} src={imageUrl}/>
                    </figure>
                    <div className="card-body">
                        <small className='text-[#a90305] font-semibold'>{category}</small>
                        <h2 className="card-title">{title}</h2>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
            <div className='grid gap-2'>
                
                {
                    otherNews.slice(0,4).map((n:sectionsMainNews) => 
                            <div key={n.id} className='card bg-base-100 border border-gray-300 p-3'>
                                <Link key={n.id} href={`/news/${n.id}`}>
                                <small className='text-[#a90305]  font-semibold'>{n.category}</small>
                                <div>{n.title}</div>
                                </Link>
                            </div>
                    )
                }
            </div>
        </section>
    );
};

export default MainNews;