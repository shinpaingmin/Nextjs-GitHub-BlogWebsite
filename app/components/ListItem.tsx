import getFormattedDate from '@/lib/getFormattedDate';
import Link from 'next/link';

type Props = {
    post: BlogPost
}

const ListItem = ({ post }: Props) => {
    const { id, title, date } = post;
    const formattedDate = getFormattedDate(date);

    return (
        <li className='mt-4 text-2xl dark:text-white/90'>
            <Link className='underline hover:text-black/70 dark:hover:text-white'
                href={`/posts/${id}`}>
                    {title}
            </Link>
            <br />
            <p className="text-sm mt-1">{formattedDate}</p>
        </li>
    )
}

export default ListItem