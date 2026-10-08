import NewsCardSkeleton from "../../../components/NewsCardSkeleton";

const Loading = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
            ))}
        </div>
        </div>
    );
};

export default Loading;