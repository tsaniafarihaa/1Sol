'use client';

import { memo, useEffect, useState, useCallback } from "react";
import Image from 'next/image';
import Link from "next/link";
import { BriefcaseIcon } from "@heroicons/react/outline";
import AOS from 'aos';
import Testimonials from "@/components/testimonial";

type TeamMember = {
  picture: { large: string; };
};

const HERO_IMAGES = {
  one: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800&q=60",
  solution: "https://images.pexels.com/photos/2678468/pexels-photo-2678468.jpeg?auto=compress&cs=tinysrgb&w=800&q=60",
  services: "https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp?auto=compress&w=1200&q=50"
};

const SERVICES = [
  {
    id: 1,
    title: "Threat Detection & Monitoring",
    description: "Real-time detection to catch threats before they impact your business.",
  },
  {
    id: 2,
    title: "Vulnerability Assessments",
    description: "Identifying and strengthening potential weaknesses in your system.",
  },
  {
    id: 3,
    title: "Incident Response",
    description: "Fast, reliable response to any cybersecurity incident.",
  },
  {
    id: 4,
    title: "Security Training",
    description: "Equip your team with the knowledge to prevent attacks.",
  },
  {
    id: 5,
    title: "Cybersecurity Compliance",
    description: "Guiding businesses through the complex landscape of cybersecurity compliance.",
  },
] as const;


const HeroHalf = memo(function HeroHalf({ title, image }: { title: string; image: string }) {
  return (
    <div
      className="w-full md:w-1/2 h-[60vh] md:min-h-screen relative bg-cover bg-center group"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4 mt-0">
        <div className="transform -translate-y-1/4 md:translate-y-0">
          <h2 className="text-white text-base sm:text-lg font-bold mb-2" data-aos="fade-down">WE ARE</h2>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-widest transition-all duration-300 group-hover:text-[#2Fa4F9] group-hover:scale-110" data-aos="fade-up">{title}</h1>
        </div>
      </div>
    </div>
  );
});

const ServiceCard = memo(function ServiceCard({ title, description, index }: { title: string; description: string; index: number; }) {
  return (
    <div className="card bg-white/30 backdrop-blur-sm shadow-lg rounded-lg p-4 sm:p-6 hover:bg-[#2FA4F9] transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay={index * 100}>
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-white text-sm sm:text-base">{description}</p>
    </div>
  );
});



export default function HomePage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const fetchTeamMembers = useCallback(async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=8&nat=us');
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      setTeamMembers(data.results);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    });
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  return (
    <main className="overflow-x-hidden pt-16 md:pt-0">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row">
        <HeroHalf title="ONE" image={HERO_IMAGES.one} />
        <HeroHalf title="SOLUTION" image={HERO_IMAGES.solution} />
      </section>

      {/* About Section */}
      <section className="flex flex-col lg:flex-row items-center bg-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-24">
        <div className="lg:w-1/2 p-6 sm:p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-8 lg:mb-0" data-aos="fade-right">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 flex items-center group">
            <BriefcaseIcon className="h-8 w-8 text-[#2FA4F9] mr-2 group-hover:text-[#0E80C2] transition-colors duration-300" />
            About Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
            With over a decade of experience in the cybersecurity industry, 1Sol was founded with a mission to protect companies of all sizes from emerging digital threats.
          </p>
          <Link href="/about" className="mt-4 inline-block bg-[#2FA4F9] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#0E80C2] transition-colors duration-300">
            Learn More
          </Link>
        </div>
        <div className="lg:w-1/2 h-full flex items-center justify-center" data-aos="fade-left">
          <Image
            src="/img/1sol.png"
            alt="About Us"
            width={500}
            height={500}
            className="object-cover rounded-lg w-full max-w-md"
            loading="lazy"
            quality={75}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-24">
        <div className="absolute inset-0 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGES.services})` }} />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container mx-auto relative z-10">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-10" data-aos="fade-up">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-10">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
          <div className="flex justify-center" data-aos="fade-up">
            <Link href="/portfolio" className="inline-block bg-[#2FA4F9] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#0E80C2] transition-colors duration-300">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="flex flex-col lg:flex-row items-center bg-black text-white py-16 lg:px-24 px-6">
        <div className="text-center lg:text-left lg:w-1/2 px-6 mb-6 lg:mb-0" data-aos="fade-right">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Your Trusted Experts{" "}
            <Link href="/team" className="mt-4 inline-block bg-[#2FA4F9] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#0E80C2] transition-colors duration-300">
              Team
            </Link>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full lg:w-1/2" data-aos="fade-left">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full aspect-square overflow-hidden rounded-lg" data-aos="zoom-in" data-aos-delay={index * 50}>
              <Image
                src={`${member.picture.large}?compress=true&quality=50`}
                alt={`Team Member ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                width={100}
                height={100}
                loading="lazy"
                quality={40}
                sizes="(max-width: 768px) 80px, 100px"
              />
            </div>
          ))}
        </div>
      </section>

      <Testimonials/>
    </main>
  );
}