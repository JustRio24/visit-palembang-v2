import { useEffect, useState } from 'react'
import Ribbons from './Ribbons.jsx'

// Pembungkus efek pita kursor: satu pita berwarna kertas Musi Perak —
// warna yang sama dengan bilah kemajuan di tepi atas — dan sama-sama
// memakai mix-blend-difference, jadi di atas babak kertas ia tampil
// gelap dan di atas babak tinta ia tampil terang. Dimatikan pada
// perangkat sentuh murni dan bagi pengguna yang meminta gerakan dikurangi.
export default function CursorRibbons() {
  const [ok, setOk] = useState(false)

  useEffect(() => {
    // Nonaktifkan hanya pada perangkat sentuh murni (tanpa mouse sama
    // sekali); di laptop/desktop — termasuk layar sentuh yang juga
    // bermouse — efek tetap aktif.
    const touchOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(any-pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setOk(!touchOnly && !calm)
  }, [])

  if (!ok) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] mix-blend-difference"
    >
      <Ribbons
        colors={['#f2efe9']}
        thickness={18}
        length={1.7}
        shape="comet"
        fade
        softness={0.4}
        opacity={0.9}
      />
    </div>
  )
}
