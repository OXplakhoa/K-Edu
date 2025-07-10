"use client";

import { Facebook, Instagram, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <>
      {/* Top Navigation Bar*/}
      <div className="relative z-20 bg-amber-400 text-white text-xs py-1 px-4 border-b flex justify-between items-center">
        <div className="hidden md:flex gap-6">
          <Link href="#" className="hover:text-cyan-950 transition-colors">
            Điều khoản
          </Link>
          <Link href="#" className="hover:text-cyan-950 transition-colors">
            Chính sách
          </Link>
          <Link href="#" className="hover:text-cyan-950 transition-colors">
            Bảo mật
          </Link>
        </div>
        <div className="flex gap-4 ml-auto">
          <Link href="#" className="hover:text-cyan-950 transition-colors">
            <Facebook width={15} />
          </Link>
          <Link href="#" className="hover:text-cyan-950 transition-colors">
            <Instagram width={15} />
          </Link>
          <Link href="#" className="hover:text-cyan-950 transition-colors">
            <X width={15} />
          </Link>
        </div>
      </div>
      {/* Main Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-4 md:px-8 py-4">
        {/*Logo */}
        <div className="text-white text-2xl font-bold hover:translate-y-[-2px] transition-all duration-300 hover:text-amber-400 cursor-pointer">
          K-Edu
        </div>

        {/*Desktop Navigation*/}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="#"
            className="text-white hover:text-amber-400 transition-colors"
          >
            Trang Chủ
          </Link>
          <Link
            href="#"
            className="text-white hover:text-amber-400 transition-colors"
          >
            Khóa Học
          </Link>
          <Link
            href="#about"
            className="text-white hover:text-amber-400 transition-colors"
          >
            Về Chúng Tôi
          </Link>
          <Link
            href="#footer"
            className="text-white hover:text-amber-400 transition-colors"
          >
            Liên Hệ
          </Link>
          <button className="bg-amber-400 text-white px-6 py-2 rounded-md hover:bg-amber-500 hover:scale-105 transition-all duration-200 font-medium shadow-lg hover:shadow-xl cursor-pointer">
            ĐĂNG KÝ NGAY
          </button>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Menu"
        >
          {isOpen ? (
            <X width={24} className="cursor-pointer" />
          ) : (
            <Menu width={24} className="cursor-pointer" />
          )}
        </button>
      </nav>
      {/*Overlay*/}
      {isOpen && (
        <div className="fixed inset-0 z-30">
          {/*Over Background*/}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 opacity-100">
            {/*Slide In Menu*/}
            <div
              ref={menuRef}
              className="absolute top-0 right-0 w-4/5 max-w-xs h-full bg-black/90 shadow-lg px-6 py-8 flex flex-col space-y-4 animate-slide-in"
              style={{ minWidth: 260 }}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-amber-400"
                onClick={() => setIsOpen(false)}
                aria-label="Close Menu"
              >
                <X width={28} className="cursor-pointer" />
              </button>
              {/*Navigation*/}
              <nav className="flex flex-col space-y-4 mt-8">
                <Link
                  href="#"
                  className="text-white hover:text-amber-400 transition-colors"
                >
                  Trang Chủ
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-amber-400 transition-colors"
                >
                  Khóa Học
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-amber-400 transition-colors"
                >
                  Về Chúng Tôi
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-amber-400 transition-colors"
                >
                  Liên Hệ
                </Link>
                <button className="bg-amber-400 text-white px-6 py-2 rounded-md hover:bg-amber-500 hover:scale-105 transition-all duration-200 font-medium shadow-lg hover:shadow-xl cursor-pointer">
                  ĐĂNG KÝ NGAY
                </button>
              </nav>
              {/*Divider*/}
              <div className="border-t border-white/20 my-4"></div>
              {/*Social Icons*/}
              <div className="flex gap-4 justify-center">
                <Link
                  href="#"
                  className="text-white hover:text-amber-400 transition-colors"
                >
                  <Facebook width={24} />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-amber-400 transition-colors"
                >
                  <Instagram width={24} />
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-amber-400 transition-colors"
                >
                  <X width={24} />
                </Link>
              </div>
              {/*Terms/Privacy*/}
              <div className="flex flex-col items-center gap-2 mt-4 text-xs text-white/80">
                <Link href="#" className="hover:text-amber-400">
                  Điều khoản
                </Link>
                <Link href="#" className="hover:text-amber-400">
                  Chính sách
                </Link>
                <Link href="#" className="hover:text-amber-400">
                  Bảo mật
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}
