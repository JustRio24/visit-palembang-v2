import { motion, useScroll, useSpring } from 'framer-motion'

// Bilah kemajuan baca di tepi atas layar — pengganti scrollbar bawaan
// (disembunyikan di index.css). Tipis (3px), warna kertas senada tema
// Musi Perak, mix-blend-difference agar tetap terbaca di atas Babak
// III yang terang. Gerak dihaluskan pegas agar tidak kaku.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-paper mix-blend-difference"
    />
  )
}
