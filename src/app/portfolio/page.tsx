'use client';

import { useEffect, useState, useMemo } from "react";
import { IPort } from '../../types/portfolio';
import { getPort } from '@/libs/portfolio';
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';  
import Testimonials from "@/components/testimonial";


const categories = [
  "All",
  "Threat Detection & Monitoring",
  "Vulnerability Assessments",
  "Incident Response",
  "Security Training",
  "Cybersecurity Compliance"
];

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<IPort[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        const data = await getPort();
        setPortfolioItems(data);
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortfolio();
    AOS.init();  
  }, []);

  const filteredItems = useMemo(() => {
    return selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter(item => item.fields.service === selectedCategory);
  }, [portfolioItems, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="relative h-72 md:h-96 bg-[#2FA4F9]/10 border-b border-[#2FA4F9]/20">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-[#2FA4F9] mb-4">
            Our Portfolio
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="text-sm md:text-base max-w-2xl text-gray-300">
            Explore Our Advanced Security Solutions and Innovative Cyber Protection
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-[#2FA4F9] text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } whitespace-nowrap`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {isLoading ? (
            [...Array(10)].map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="w-full aspect-[3/4] bg-gray-800 rounded-lg animate-pulse"
              />
            ))
          ) : (
            filteredItems.map((item) => (
              <PortfolioCard key={item.fields.judul} item={item} />
            ))
          )}
        </div>

       
        <div className="mt-12">
          <Testimonials />
        </div>
      </div>
    </div>
  );
}

interface PortfolioCardProps {
  item: IPort;
}

function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      className="w-full aspect-[3/4] group bg-gray-900 rounded-lg overflow-hidden 
        hover:shadow-[0_0_15px_rgba(47,164,249,0.15)] transition-all duration-300"
    >
      <div className="relative w-full h-1/2 overflow-hidden">
        <Image
          src={`https:${item.fields.picture.fields.file.url}`}
          alt={item.fields.judul}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
      </div>
      
      <div className="relative h-1/2 p-3 flex flex-col">
        <span className="inline-block px-2 py-0.5 mb-2 text-xs font-medium text-white bg-[#2FA4F9] 
          rounded-full self-start"
        >
          {item.fields.service}
        </span>
        <h3 className="text-sm font-bold text-white mb-2">{item.fields.judul}</h3>
        <div className="text-gray-400 text-xs overflow-y-auto custom-scrollbar">
          {item.fields.desc}
        </div>
      </div>
    </div>
  );
}
