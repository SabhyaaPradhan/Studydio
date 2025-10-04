"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    title: "Save Hours",
    description: "Turn long videos into quick study sets.",
  },
  {
    title: "Learn Smarter",
    description: "Personalized flashcards built for your weak points.",
  },
  {
    title: "Instant Insights",
    description: "Summaries and quizzes in seconds.",
  },
  {
    title: "Retain Better",
    description: "Built-in spaced repetition helps memory stick.",
  },
];

const audiences = [
  {
    emoji: "🎓",
    title: "Students",
    description: "Master concepts faster with auto-generated notes.",
  },
  {
    emoji: "🧑‍🏫",
    title: "Teachers",
    description: "Create quizzes instantly from your lessons.",
  },
  {
    emoji: "📚",
    title: "Lifelong Learners",
    description: "Absorb knowledge efficiently from any source.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="w-full py-24 md:py-32 bg-gradient-to-b from-stone-950 via-stone-900 to-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-5xl font-blackheat text-center text-white">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mt-4 text-lg">
            AI that adapts to the way you learn — faster, smarter, and personalized.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    style={{
                        background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.2), transparent 40%)'
                    }}
                />
              <div className="relative">
                <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                <p className="text-gray-400 mt-2">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {audiences.map((audience, i) => (
            <motion.div
              key={audience.title}
              custom={i + benefits.length}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    style={{
                        background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.2), transparent 40%)'
                    }}
                />
              <div className="relative text-center">
                <span className="text-5xl">{audience.emoji}</span>
                <h3 className="text-2xl font-bold text-white mt-4">{audience.title}</h3>
                <p className="text-gray-400 mt-2">{audience.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
