import NavBarItem from "@/components/NavBarItem";
import AccountMenu from "@/components/AccountMenu";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs"
import MobileMenu from "@/components/MobileMenu";
import { useCallback, useEffect, useState } from "react";

const TOP_OFFSET = 66;

export const labels = [
  "Home",
  "Series",
  "Films",
  "New & Popular",
  "My List",
  "Browse by languages",
]

const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY >= TOP_OFFSET)
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
  }, [])

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current)
  }, [])


  return (
    <nav className="w-full fixed z-40">
      <div className={`
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500
        ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
      `}>
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
        <div className="
          flex-row
          ml-8
          gap-7
          hidden
          lg:flex
        ">
          {labels.map((label, index) => <NavBarItem key={index} label={label} />)}
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          {showMobileMenu && <MobileMenu close={() => setShowMobileMenu(false)} />}
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-1 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-profile.png" alt="" />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            {showAccountMenu && <AccountMenu close={() => setShowAccountMenu(false)} />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;