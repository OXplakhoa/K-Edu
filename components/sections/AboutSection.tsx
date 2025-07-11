"use client";

import { Award, BookOpen, Globe, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Check if animation has already been triggered in this session
    const hasAnimatedBefore = sessionStorage.getItem("aboutSectionAnimated");
    if (hasAnimatedBefore) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Only create observer if not already created
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
            sessionStorage.setItem("aboutSectionAnimated", "true");
            if (observerRef.current) {
              observerRef.current.disconnect();
              observerRef.current = null;
            }
          }
        },
        {
          threshold: 0.1, // Trigger when 30% of section is visible
          rootMargin: "0px 0px -50px 0px",
        }
      );
    }

    if (sectionRef.current && observerRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [hasAnimated]);
  const stats = [
    {
      icon: Users,
      number: 50000,
      label: "Học Viên",
      suffix: "+",
    },
    {
      icon: Award,
      number: 150,
      label: "Khóa Học",
      suffix: "+",
    },
    {
      icon: BookOpen,
      number: 95,
      label: "Tỷ Lệ Hoàn Thành",
      suffix: "%",
    },
    {
      icon: Globe,
      number: 50,
      label: "Quốc Gia",
      suffix: "+",
    },
  ];
  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-white py-20 px-4 md:px-8 text-center text-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Về KEdu</h2>
        <p className="text-lg md:text-xl leading-relaxed mb-16 max-w-3xl mx-auto">
          Tại KEdu, chúng tôi trao quyền cho học sinh thông qua nền giáo dục
          hàng đầu, học tập hướng đến cộng đồng, và một môi trường thân thiện,
          truyền cảm hứng cho sự phát triển và sáng tạo.
        </p>

        {/*Stats Grid*/}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4 group-hover:bg-amber-200 transition-colors duration-200">
                <stat.icon size={32} className="text-amber-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-grey-900 mb-2">
                {isVisible ? (
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                    delay={index * 0.2}
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="text-grey-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/*Addtional Content*/}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-left">
          <h3 className="text-2xl font-bold mb-4 text-grey-900">
            Sứ mệnh của chúng tôi
          </h3>
          <p className="text-grey-600 leading-relaxed">
            Chúng tôi cam kết mang đến những khóa học chất lượng cao nhất, giúp
            học viên phát triển kỹ năng và sự nghiệp trong thời đại số.
          </p>
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-bold mb-4 text-grey-900">Tầm nhìn</h3>
          <p className="text-grey-600 leading-relaxed">
            Trở thành nền tảng giáo dục trực tuyến hàng đầu, kết nối hàng triệu
            người học với kiến thức chất lượng cao.
          </p>
        </div>
      </div>
    </section>
  );
}
