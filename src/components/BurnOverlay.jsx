import { useEffect, useRef } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

// OVERLAY BAKAR — meniru cara pasang komponen Framer "Scroll Burn
// Effect": tinggal DI DALAM section gelap, menempel di dasarnya
// (absolute bottom, tinggi 100vh). Saat section digulir keluar menuju
// section berikutnya, kertas section berikutnya memakan konten section
// ini dari tepi bawah dengan garis bakar runcing berdetail halus.
// Progres mengikuti perjalanan ujung section melintasi layar:
// 0 saat ujung bawah section mencapai dasar layar, 1 saat ujung itu
// mencapai puncak layar. Potongan dua warna tegas (kertas vs tembus
// pandang), digambar di canvas resolusi tinggi dari noise fraktal.

const PAPER = [242, 239, 233]

function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Peta ambang bakar 0..1 per sel; baris bawah berambang lebih rendah
// supaya front selalu naik dari bawah.
function makeBurnMap(w, h, seed) {
  const rand = mulberry32(seed)
  const data = new Float32Array(w * h)
  const octaves = [
    [8, 5, 0.3],
    [20, 12, 0.26],
    [44, 26, 0.2],
    [96, 56, 0.14],
    [192, 112, 0.1],
  ]
  for (const [gw, gh, amp] of octaves) {
    const g = new Float32Array((gw + 1) * (gh + 1))
    for (let i = 0; i < g.length; i++) g[i] = rand()
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const fx = (x / w) * gw
        const fy = (y / h) * gh
        const ix = Math.floor(fx)
        const iy = Math.floor(fy)
        const tx = fx - ix
        const ty = fy - iy
        const sx = tx * tx * (3 - 2 * tx)
        const sy = ty * ty * (3 - 2 * ty)
        const i00 = g[iy * (gw + 1) + ix]
        const i10 = g[iy * (gw + 1) + ix + 1]
        const i01 = g[(iy + 1) * (gw + 1) + ix]
        const i11 = g[(iy + 1) * (gw + 1) + ix + 1]
        const v = (i00 * (1 - sx) + i10 * sx) * (1 - sy) + (i01 * (1 - sx) + i11 * sx) * sy
        data[y * w + x] += v * amp
      }
    }
  }
  let mn = Infinity
  let mx = -Infinity
  for (let i = 0; i < data.length; i++) {
    if (data[i] < mn) mn = data[i]
    if (data[i] > mx) mx = data[i]
  }
  for (let y = 0; y < h; y++) {
    const yNorm = y / (h - 1) // 0 = atas, 1 = bawah
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      const v = (data[i] - mn) / (mx - mn)
      data[i] = v * 0.5 + (1 - yNorm) * 0.5
    }
  }
  return data
}

export default function BurnOverlay({ sectionRef }) {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['end end', 'end start'],
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const off = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    const state = { map: null, img: null, w: 0, h: 0, lastP: -1 }
    stateRef.current = state

    const draw = (prog) => {
      if (!state.map) return
      const p = prog * 1.14 - 0.05 // mulai kosong, berakhir kertas penuh
      if (Math.abs(p - state.lastP) < 0.002) return
      state.lastP = p
      const { map, img, w, h } = state
      const d = img.data
      for (let i = 0; i < w * h; i++) {
        const o = i * 4
        if (map[i] < p) {
          d[o] = PAPER[0]; d[o + 1] = PAPER[1]; d[o + 2] = PAPER[2]; d[o + 3] = 255
        } else {
          d[o + 3] = 0
        }
      }
      offCtx.putImageData(img, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(off, 0, 0, canvas.width, canvas.height)
    }
    state.draw = draw

    const setup = () => {
      const wpx = canvas.clientWidth || window.innerWidth
      const hpx = canvas.clientHeight || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = Math.round(wpx * dpr)
      canvas.height = Math.round(hpx * dpr)
      const bw = 800
      const bh = Math.max(300, Math.min(620, Math.round((bw * hpx) / wpx)))
      off.width = bw
      off.height = bh
      state.w = bw
      state.h = bh
      state.map = makeBurnMap(bw, bh, 20260682)
      state.img = offCtx.createImageData(bw, bh)
      state.lastP = -1
      draw(scrollYProgress.get())
    }

    setup()
    window.addEventListener('resize', setup)
    return () => window.removeEventListener('resize', setup)
  }, [scrollYProgress])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    stateRef.current?.draw?.(v)
  })

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 block h-screen w-full"
    />
  )
}
