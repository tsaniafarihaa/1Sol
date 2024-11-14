'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Target, HandshakeIcon, Sparkles, Sprout } from "lucide-react";

interface TeamMember {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
  email: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const TeamMember = ({ name, role, image, description }: {
  name: string;
  role: string;
  image: string;
  description: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="flex flex-col items-center p-4 sm:p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors duration-300"
  >
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover rounded-full border-4 border-[#2FA4F9] transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 128px, 160px"
      />
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">{name}</h3>
    <p className="text-[#2FA4F9] font-medium mb-4 text-center">{role}</p>
    <p className="text-gray-400 text-center text-sm sm:text-base">{description}</p>
  </motion.div>
);

const MilestoneCard = ({ year, title, description }: {
  year: string;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left"
  >
    <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-[#2FA4F9] rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white">
      {year}
    </div>
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm sm:text-base">{description}</p>
    </div>
  </motion.div>
);

const ValueCard = ({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-gray-900 p-4 sm:p-6 rounded-xl hover:bg-gray-800 transition-all duration-300 group"
  >
    <div className="text-[#2FA4F9] mb-4 flex justify-center sm:justify-start">
      <Icon size={32} className="transition-transform duration-300 group-hover:scale-110" />
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-center sm:text-left">{title}</h3>
    <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">{description}</p>
  </motion.div>
);

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=2&gender=male');
        const data = await response.json();
        setTeamMembers(data.results);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const getTeamMemberDescription = (index: number) => {
    if (index === 0) {
      return "With over 15 years of experience in the tech industry, he recognized the growing need for businesses to stay ahead of evolving cyber threats. In 2010, he founded 1Sol with the goal of providing companies with simple yet powerful cybersecurity solutions that would empower them to thrive in an increasingly digital world.";
    }
    return "As Co-Founder and Chief Technology Officer of 1Sol, his technical prowess drives the company’s innovation. His ability to foresee emerging cyber threats and create effective, scalable solutions has been integral in the development of 1Sol’s services.";
  };

  const milestones = [
    {
      year: "2016",
      title: "The Beginning: A Vision for Stronger Cybersecurity",
      description: "1Sol was founded with a simple yet powerful mission: to provide businesses with robust cybersecurity solutions that are both effective and easy to implement. From day one, our goal was to make the digital world safer for all."
    },
    {
      year: "2018",
      title: "Building Expertise: Innovating in the Face of Emerging Threats",
      description: "Over the years, our team of experts has continuously evolved, staying ahead of emerging cyber threats with cutting-edge technologies and innovative solutions. We've grown into a trusted partner, known for our deep expertise and dedication to security."
    },
    {
      year: "2020",
      title: "Expanding Reach: Serving Global Clients",
      description: "As our reputation grew, so did our reach. We expanded our services internationally, working with clients across various industries—from healthcare to finance—helping them meet their unique cybersecurity challenges."
    },
    {
      year: "2023",
      title: "Looking Ahead: A Future of Continuous Innovation",
      description: "Our journey is far from over. At 1Sol, we are committed to continuous improvement, always adapting to new security needs. Our future is focused on harnessing the latest technologies to provide even more effective, tailored solutions to safeguard your digital assets."
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Integrity First",
      description: "Our clients can trust us to protect their most valuable assets with transparency and honesty."
    },
    {
      icon: HandshakeIcon,
      title: "Innovation & Excellence",
      description: "We foster a culture of continuous learning and innovation."
    },
    {
      icon: Sparkles,
      title: "Collaboration & Teamwork",
      description: "Our team works together seamlessly, combining diverse skills and perspectives."
    },
    {
      icon: Sprout,
      title: "Client-Centric Approach",
      description: "We take the time to understand their unique challenges and goals."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900">
          <div className="absolute inset-0 bg-[#2FA4F9]/10 mix-blend-overlay" />
        </div>
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
          <motion.h1 
            {...fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            About <span className="text-[#2FA4F9]">1Sol</span>
          </motion.h1>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl text-gray-300 px-4"
          >
            One Solution, Infinite Protection.
          </motion.p>
        </div>
      </div>

      {/* History Timeline Section */}
      <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
        >
          Our <span className="text-[#2FA4F9]">Journey</span>
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
          {milestones.map((milestone) => (
            <MilestoneCard
              key={milestone.year}
              year={milestone.year}
              title={milestone.title}
              description={milestone.description}
            />
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
          >
            Visionaries Behind<span className="text-[#2FA4F9]"> 1Sol</span>
          </motion.h2>
          {isLoading ? (
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[...Array(2)].map((_, i) => (
                <div key={`skeleton-${i}`} className="h-64 sm:h-96 bg-gray-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, i) => (
                <TeamMember
                  key={`${member.email}-${i}`}
                  name={`${member.name.first} ${member.name.last}`}
                  role={i === 0 ? "Founder & CEO" : "Co-Founder & Creative Director"}
                  image={member.picture.large}
                  description={getTeamMemberDescription(i)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Culture & Values Section */}
      <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
        >
          Our <span className="text-[#2FA4F9]">Culture & Values</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {values.map((value) => (
            <ValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </section>

    </div>
  );
}