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
        "Cybersecurity Analyst", 
        "Penetration Tester", 
        "Incident Response Specialist", 
        "Threat Intelligence Expert", 
        "Security Architect", 
        "Compliance Officer", 
        "Security Software Engineer", 
        "Risk Management Consultant", 
        "SOC Analyst", 
        "Malware Analyst", 
        "Network Security Engineer", 
        "Chief Information Security Officer (CISO)"
    ];

    const generateEmail = (first: string, last: string) => `${first.toLowerCase()}.${last.toLowerCase()}@cybersecurityco.com`;
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

            <div className="lg:w-1/3 flex flex-col justify-center text-left space-y-6 mb-8 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-bold text-[#2FA4F9]">
                    Meet Our Team of Cybersecurity Experts
                </h1>
                <p className="text-md lg:text-lg text-gray-400">
                    Our team of certified cybersecurity professionals is dedicated to protecting your business from evolving threats. Learn more about our experts and how they can help secure your digital infrastructure.
                </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 h-[70vh] mt-10">
                {teamMembers.slice(0, 12).map((member, index) => (
                    <motion.div
                        key={index}
                        className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image
                            src={member.picture.large}
                            alt="Team Member"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        
                      
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
