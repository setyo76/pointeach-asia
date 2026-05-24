import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href='/' className='flex items-center gap-3'>
      <Image
        src='/images/pointeach_logotransp.png'
        alt='PoinTeacher'
        width={40}
        height={40}
      />
      <span className='text-lg font-bold text-primary'>PoinTeacher</span>
    </Link>
  );
}
