import Link from 'next/link';

interface Props {
  title: string;
  href: string;
}

export default function ListItem({ title, href }: Props) {
  return (
    <Link
      href={href}
      className='block p-3 leading-none no-underline outline-none hover:border-b-4 hover:border-b-blue-500 h-12'
    >
      <div className='font-semibold leading-none text-nowrap text-center text-lg'>
        {title}
      </div>
    </Link>
  );
}
