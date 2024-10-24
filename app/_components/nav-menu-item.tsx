import Link from 'next/link';

interface Props {
  title: string;
  href: string;
  onClick: () => void;
}

export default function ListItem({ title, href, onClick }: Props) {
  return (
    <Link
      href={href}
      className='block p-3 leading-none no-underline outline-none hover:border-b-4 hover:border-b-blue-500 h-12'
      onClick={onClick}
    >
      <div className='font-semibold leading-none text-nowrap text-center text-lg'>
        {title}
      </div>
    </Link>
  );
}
