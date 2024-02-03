import Link from 'next/link';
import { FaFacebook, FaLaptop, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
        <div className="md:px-6 prose prose-xl mx-auto flex 
            justify-between flex-col sm:flex-row">
            <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
                <Link href='/'
                    className='text-white/90 no-underline
                     hover:text-white'
                >
                    Shin
                </Link>
            </h1>
            <div className="flex flex-row justify-center sm:justify-evenly 
                align-middle gap-4 text-white text-4xl lg:text-5xl">
                    <Link href='https://www.facebook.com/shinpaingmin.shinpaingmin' className='text-white/90 hover:text-white' target='__blank'><FaFacebook /></Link>
                    <Link href='https://www.linkedin.com/in/shinpaing-min-3420b9213' className='text-white/90 hover:text-white' target='__blank'><FaLinkedin /></Link>
                    <Link href='https://github.com/shinpaingmin' className='text-white/90 hover:text-white' target='__blank'><FaGithub /></Link>
                    <Link href='https://shinpaingmin-portfolio.netlify.app/' className='text-white/90 hover:text-white' target='__blank'><FaLaptop /></Link>
            </div>
        </div>
    </nav>
  )
}
