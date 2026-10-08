import Image from 'next/image';
import Link from 'next/link';

const NewsCard = ({news}) => {
    const {id,title,imageAlt,imageUrl, description,category} = news
    return (
        <div>
            <Link href={`/news/${id}`}>
                <div className="card bg-base-100 shadow-sm">
                    <figure>
                        <Image height={600} width={600} className='' alt={imageAlt} src={imageUrl}/>
                    </figure>
                    <div className="card-body">
                        <small className='text-[#a90305] font-semibold'>{category}</small>
                        <h2 className="card-title">{title}</h2>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default NewsCard;