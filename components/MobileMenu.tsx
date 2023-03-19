import React, { useRef } from "react";
import { labels } from "@/components/NavBar";
import { useOnClickOutside } from 'usehooks-ts'


interface MobileMenuProps {
  close: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ close }) => {
  const mobileMenu = useRef(null);
  useOnClickOutside(mobileMenu, close);

  return (
    <div ref={mobileMenu} className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        {labels.map((label, index) => <div className="px-3 text-center text-white hover:udnerline" key={index}>{label}</div>)}
      </div>
    </div>
  )
}

export default MobileMenu;