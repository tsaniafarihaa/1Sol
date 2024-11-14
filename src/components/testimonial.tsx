import { memo } from "react";

type Testimonial = {
  id: number;
  text: string;
  author: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "1Sol transformed our approach to cybersecurity. Their team expertise and proactive monitoring have been invaluable in safeguarding our sensitive data.",
    author: "Annalia",
    role: "CEO of ENTe"
  },
  {
    id: 2,
    text: "We faced constant threats that disrupted our operations, but since partnering with 1Sol, we've seen a complete turnaround.",
    author: "Putri Ayu",
    role: "CEO of Sukbir Peeps"
  },
  {
    id: 3,
    text: "1Sol not only helped us meet compliance standards but went above and beyond to ensure our entire team understood cybersecurity best practices.",
    author: "Aisha",
    role: "CEO of Pondok Teruna"
  },
] as const;

const TestimonialCard = memo(function TestimonialCard({ text, author, role, index }: { text: string; author: string; role: string; index: number; }) {
  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay={index * 100}>
      <p className="text-base sm:text-lg italic">&quot;{text}&quot;</p>
      <p className="mt-4 text-right font-semibold">- {author}, {role}</p>
    </div>
  );
});

const Testimonials = () => {
  return (
    <section className="bg-black py-16 px-4 sm:px-6 lg:px-24 text-white">
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-10" data-aos="fade-up">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {TESTIMONIALS.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            text={testimonial.text}
            author={testimonial.author}
            role={testimonial.role}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
