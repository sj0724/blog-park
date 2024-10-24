import Link from 'next/link';
import { getSessionUserData } from '../data/user';
import NavMenu from './nav-menu';
import AlarmButton from './alarm-button';
import Image from 'next/image';
import Logo from '@/public/logo-icon-2.png';

export default async function Nav() {
  const session = await getSessionUserData();

  return (
    <section className='fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 h-20 bg-white/50 backdrop-blur-xl shadow-md z-40'>
      <div className='flex items-center gap-4'>
        <Link href='/'>
          <Image src={Logo} alt='로고' width={210} height={50} />
        </Link>
      </div>
      <div className='flex items-center text-xl font-bold lg:gap-5 gap-4 justify-between'>
        <AlarmButton userId={session?.id} />
        <NavMenu userId={session?.id} />
      </div>
    </section>
  );
}
