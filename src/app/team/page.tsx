"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type TeamMember = {
    name: {
        first: string;
        last: string;
    };
    picture: {
        large: string;
    };
};

export default function TeamSection() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    
    const roles = [
        "Marketing Strategist", 
        "SEO Specialist", 
        "Content Creator", 
        "Social Media Manager", 
        "Graphic Designer", 
        "Brand Manager", 
        "Copywriter", 
        "Web Developer", 
        "PPC Specialist", 
        "Email Marketing Specialist", 
        "Account Manager", 
        "Analytics Expert"
    ];

    const generateEmail = (first: string, last: string) => `${first.toLowerCase()}.${last.toLowerCase()}@example.com`;
    const generatePhone = () => `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/?results=12');
                const data = await response.json();
                setTeamMembers(data.results);
            } catch (error) {
                console.error("Error fetching team members:", error);
            }
        };

        fetchTeamMembers();
    }, []);

    return (
        <div className="flex lg:flex-row flex-col items-center bg-black text-white min-h-screen px-4 lg:px-8 py-8 lg:py-16 pt-[80px] lg:pt-0">
            {/* Left Side: Text Section */}
            <div className="lg:w-1/3 flex flex-col justify-center text-left space-y-6 mb-8 lg:mb-0">
                <h1 className="text-3xl lg:text-5xl font-bold">Meet Our Team of Professionals</h1>
                <p className="text-md lg:text-lg text-gray-400">
                    Certified experts, each specializing in their field to bring you the best solutions. Reach out to any of our team members directly.
                </p>
            </div>

            {/* Right Side: Image Grid with Info Overlay */}
            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[70vh] mt-10">
                {teamMembers.slice(0, 12).map((member, index) => (
                    <motion.div
                        key={index}
                        className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image
                            src={member.picture.large}
                            alt="Team Member"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        
                        {/* Overlay with name, role, email, and phone */}
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center text-center transition-opacity duration-300 p-4">
                            <h3 className="text-lg font-semibold">{member.name.first} {member.name.last}</h3>
                            <p className="text-sm text-gray-300 mb-2">{roles[index % roles.length]}</p>
                            <p className="text-xs text-gray-400">{generateEmail(member.name.first, member.name.last)}</p>
                            <p className="text-xs text-gray-400">{generatePhone()}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
