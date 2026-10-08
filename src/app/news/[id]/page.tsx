import Image from "next/image";

const page = async({params}) => {
    const {id} = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${id}`)
    const data = await res.json()
    // console.log(data);
    const news = data.data;
    console.log(news);
    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
            {news.source} •{" "}
            {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
            })}
        </p>

        {news.body.map((block, index) => {
            switch (block.type) {
            case "image":
                return (
                <figure key={index} className="my-6">
                    <Image
                    src={block.url}
                    alt={block.caption || news.title}
                    width={block.width}
                    height={block.height}
                    className="w-full h-auto rounded"
                    />
                    {block.caption && (
                    <figcaption className="text-sm text-gray-500 mt-2">
                        {block.caption}
                    </figcaption>
                    )}
                </figure>
                );

            case "subheading":
                return (
                <h2 key={index} className="text-2xl font-semibold mt-8 mb-3">
                    {block.text}
                </h2>
                );

            case "text":
                return (
                <p key={index} className="leading-8 mb-4">
                    {block.text}
                </p>
                );

            default:
                return null;
            }
        })}

        <div className="flex flex-wrap gap-2 mt-8">
            {news.tags?.map((tag) => (
            <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {tag}
            </span>
            ))}
        </div>
    </article>
    );
};

export default page;