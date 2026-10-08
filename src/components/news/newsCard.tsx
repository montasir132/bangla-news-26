import Image from 'next/image';
import Link from 'next/link';

const NewsCard = ({news}) => {
    const {id,title,imageAlt,imageUrl, description,category} = news
    return (
        <Link href={`/news/${id}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a90305] hover:shadow-lg">
            {/* ছবি */}
            <figure className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <Image
                src={imageUrl}
                alt={imageAlt || title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {category && (
                <span className="absolute left-3 top-3 rounded bg-[#a90305] px-2 py-1 text-xs font-semibold text-white">
                    {category}
                </span>
                )}
            </figure>

            {/* লেখা */}
            <div className="flex flex-1 flex-col p-4">
                <h2 className="text-base font-bold leading-snug line-clamp-2 transition-colors group-hover:text-[#a90305] sm:text-lg">
                {title}
                </h2>
                {description && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {description}
                </p>
                )}
            </div>
        </Link>
    );
};

export default NewsCard;