import { motion } from "framer-motion";
import Frame from "./shared/Frame";

const rotations = [-3, 2, -1.5];

export default function StorySection({ data }) {
  return (
    <div className="scroll-thin h-full w-full overflow-y-auto px-6 py-16 sm:px-12 md:px-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-4xl text-[var(--color-cream-50)] sm:text-5xl">
            {data.title}
          </h2>
          <p className="mt-3 font-body text-lg italic text-[var(--color-blush-200)]/75">
            {data.intro}
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {data.milestones.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`flex flex-col items-center gap-8 sm:flex-row ${
                i % 2 === 1 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                className="polaroid w-[220px] shrink-0 sm:w-[260px]"
                style={{ rotate: `${rotations[i % rotations.length]}deg` }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <Frame src={m.image.src} alt={m.image.alt} className="aspect-[4/3]" />
              </motion.div>

              <div className="text-center sm:text-left">
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-[var(--color-gold-300)]/70">
                  {m.date}
                </p>
                <h3 className="mt-2 font-display text-2xl text-[var(--color-cream-50)] sm:text-3xl">
                  {m.title}
                </h3>
                <p className="mt-2 font-script text-2xl text-[var(--color-rose-300)]">
                  {m.caption}
                </p>
                <p className="mx-auto mt-3 max-w-sm font-body text-base leading-relaxed text-[var(--color-blush-200)]/85 sm:mx-0">
                  {m.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
