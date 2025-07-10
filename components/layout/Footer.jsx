'use client'
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" id='footer'>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-amber-400">KEdu</h3>
            <p className="text-gray-300 leading-relaxed">
              Chúng tôi cam kết mang đến những khóa học chất lượng cao nhất, 
              giúp bạn phát triển kỹ năng và sự nghiệp.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#courses" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Khóa Học
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Giảng Viên
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Danh Mục</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Lập Trình
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Thiết Kế
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Khoa Học Dữ Liệu
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Trí Tuệ Nhân Tạo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liên Hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-amber-400" />
                <span className="text-gray-300 text-sm">
                  123 Đường ABC, Quận 1, TP.HCM
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-amber-400" />
                <span className="text-gray-300 text-sm">
                  +84 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-amber-400" />
                <span className="text-gray-300 text-sm">
                  info@kedu.edu.vn
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-white mb-4">
              Đăng Ký Nhận Tin Tức
            </h4>
            <p className="text-gray-300 mb-4">
              Nhận thông báo về khóa học mới và ưu đãi đặc biệt
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-amber-400 text-gray-900 font-medium rounded-lg hover:bg-amber-500 transition-colors duration-200 cursor-pointer">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 KEdu. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                Điều Khoản Sử Dụng
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                Chính Sách Bảo Mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 