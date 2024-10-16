import Link from 'next/link';

interface Props {
  title: string;
  href: string;
}

export default function ListItem({ title, href }: Props) {
  return (
    <Link
      href={href}
      className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
    >
      <div className='font-medium leading-none text-nowrap text-center text-base'>
        {title}
      </div>
    </Link>
  );
}
