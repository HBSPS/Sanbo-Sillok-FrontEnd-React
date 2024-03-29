import { Link } from 'react-router-dom';
import useWindowScroll from '@/hooks/useWindowScroll';
import MenuButton from './MenuButton';

export default function NavBar() {
  const { isScrollDown } = useWindowScroll();

  return (
    <header className={`fixed h-16 w-full bg-base-700 px-4 py-3 shadow-lg backdrop-blur duration-300 ${isScrollDown ? '-mt-16' : 'mt-0'}`}>
      <div className="m-auto flex h-full max-w-6xl items-center justify-between">
        <Link to="/wiki/산보위키" className="aspect-square h-full">
          <img src="/favicon.ico" alt="Sanbo-Sillok" />
        </Link>
        <div className="flex h-full items-center justify-center gap-4">
          <form className="h-full">
            <input className="h-full w-full rounded-full pl-2 focus:outline-none" type="text" placeholder="Search" name="search" />
          </form>
          <MenuButton handleToggle={() => {}} />
        </div>
      </div>
    </header>
  );
}
