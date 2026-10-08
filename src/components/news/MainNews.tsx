import Image from 'next/image';
import Link from 'next/link';
const MainNews = ({news}) => {
    // console.log(news);
    const [firstNews, ...otherNews] = news
    const {id,imageUrl,imageAlt,category, title,description} = firstNews
    // const otherNews = news.slice(1)
    const {} = otherNews
    return (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            <Link
                href={`/news/${id}`}
                className="group lg:col-span-7 block overflow-hidden rounded-xl bg-base-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
                <figure className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={imageAlt || title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                </figure>

                <div className="p-4 sm:p-5">
                {category && (
                    <span className="inline-block mb-2 text-xs font-bold uppercase tracking-wide text-[#a90305]">
                    {category}
                    </span>
                )}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug group-hover:text-[#a90305] transition-colors">
                    {title}
                </h2>
                {description && (
                    <p className="mt-3 text-sm sm:text-base text-gray-600 line-clamp-3">
                    {description}
                    </p>
                )}
                </div>
            </Link>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {otherNews.slice(0, 4).map((n) => (
            <Link
                key={n.id}
                href={`/news/${n.id}`}
                className="group flex gap-3 rounded-xl border border-gray-200 bg-base-100 p-3 hover:border-[#a90305] hover:shadow-md transition-all duration-300"
            >
                {n.imageUrl && (
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                    <Image
                    src={n.imageUrl}
                    alt={n.imageAlt || n.title}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                )}
                <div className="min-w-0">
                {n.category && (
                    <small className="block text-xs font-semibold text-[#a90305]">
                    {n.category}
                    </small>
                )}
                <h3 className="mt-1 text-sm sm:text-base font-semibold leading-snug line-clamp-3 group-hover:text-[#a90305] transition-colors">
                    {n.title}
                </h3>
                </div>
            </Link>
            ))}
        </div>
        </section>
    );
};

export default MainNews;