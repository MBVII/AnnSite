import { motion } from "framer-motion";
import Frame from "../components/shared/Frame";

export default function StoryTimeline({ story }) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-5xl">
          {story.title}
        </h2>
        <p className="mt-3 font-body text-xl italic text-white/65">{story.intro}</p>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-[var(--color-flix-red)] via-white/20 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-10 sm:space-y-14">
          {story.milestones.map((milestone, index) => (
            <motion.article
              key={`${milestone.date}-${milestone.title}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative grid grid-cols-[24px_1fr] gap-5 sm:grid-cols-2 sm:gap-16"
            >
              <div className="absolute left-3 top-1.5 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-flix-red)] shadow-[0_0_0_5px_rgba(229,9,20,0.16)] sm:left-1/2" />

              <div
                className={`col-start-2 ${
                  index % 2 === 0 ? "sm:col-start-1 sm:text-right" : "sm:col-start-2"
                }`}
              >
                <p className="font-ui text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-flix-red)]">
                  {milestone.date}
                </p>
                <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">
                  {milestone.title}
                </h3>
                <p className="mt-1 font-body text-lg italic text-white/60">{milestone.caption}</p>
                <p className="mt-4 font-ui text-sm leading-6 text-white/70">{milestone.text}</p>
              </div>

              <div
                className={`col-start-2 sm:row-start-1 ${
                  index % 2 === 0 ? "sm:col-start-2" : "sm:col-start-1"
                }`}
              >
                <Frame
                  src={milestone.image.src}
                  alt={milestone.image.alt}
                  className="aspect-[4/3] w-full max-w-md overflow-hidden rounded-md bg-[var(--color-flix-panel)] shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                  fit="cover"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}