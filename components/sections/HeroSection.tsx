"use client";

import Image from "next/image";
import HeaderBg from "../../public/header/header_bg.jpg";
import Header from "../layout/Header";
import Typewriter from "typewriter-effect";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden h-[600px] md:h-[750px]">
      <Image
        src={HeaderBg}
        alt="Education Background"
        fill
        className="object-cover"
        priority
      />

      {/*Overlay*/}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/*Header*/}
      <Header />

      {/*Hero Content*/}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4 py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Khám pha đam mê học tập của bạn")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Trở thành một người có chuyên ngành tốt")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Và tìm kiếm cơ hội tốt nhất cho bạn")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Thuần thục các kĩ năng chuyên ngành")
                .start();
            }}
            options={{
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
          Chúng tôi là nền tảng giáo dục hàng đầu với
          <br />
          các khóa học chất lượng và phương pháp học tập hiện đại
        </p>
        <button className="bg-amber-400 text-white px-8 py-4 rounded-md hover:bg-amber-500 hover:scale-105 transtion-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover: -translate-y-1 cursor-pointer">
          THAM GIA NGAY
        </button>
      </div>
    </section>
  );
}
