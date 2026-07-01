'use client'

import { useState } from 'react'
import Logo3D from './Logo3D'
import { useLang } from '../context/LangContext'
import { T } from '../data/translations'

interface AppNavProps {
  cur: number
  go: (n: number) => void
}

export default function AppNav({ cur, go }: AppNavProps) {
  const { lang, setLang } = useLang()
  const t = T[lang]
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 mx-auto flex items-center justify-between px-[clamp(18px,5vw,52px)] py-2">
        {/* Logo + brand name */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => { go(0); close() }}
            className="w-14 h-14 shrink-0 bg-transparent border-0 cursor-pointer p-0 flex"
            aria-label="Нүүр хуудас"
          >
            <Logo3D cameraZ={12} />
          </button>
          <p className="text-white font-serif text-xl select-none" style={{ marginLeft: 1 }}>
            PIXEL
          </p>
        </div>

        {/* Mobile (<820px): lang toggle + hamburger button */}
        <div className="flex tablet:hidden items-center gap-2">
          <div className="flex items-center gap-[3px] p-[3px] rounded-[10px] bg-glass border border-line">
            {(['mn', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`font-heading font-bold text-[9px] px-2.5 py-[5px] min-h-11 rounded-[10px] uppercase tracking-[0.06em] border-0 cursor-pointer transition-all duration-[250ms] ${
                  lang === l
                    ? 'text-white [background:linear-gradient(90deg,#6f63ff,#ff4fd8)] shadow-[0_4px_14px_rgba(111,99,255,0.35)]'
                    : 'text-mute bg-transparent hover:text-pxwhite'
                }`}
              >
                {l === 'mn' ? 'МН' : 'ENG'}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Цэс хаах' : 'Цэс нээх'}
            className="w-11 h-11 flex items-center justify-center rounded-xl border-0 cursor-pointer transition-all duration-200"
            style={{
              background: open ? 'rgba(111,99,255,0.18)' : 'rgba(18,24,44,0.52)',
              border: '1px solid rgba(111,99,255,0.22)',
              color: open ? '#ff4fd8' : 'rgba(247,249,255,0.8)',
              fontSize: 20,
            }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Tablet (≥820px) + desktop: nav links + lang toggle */}
        <div className="hidden tablet:flex gap-[32px]">
          {t.nav.map((label, i) => (
            <a
              key={i}
              onClick={() => go(i + 1)}
              className={`text-xs font-semibold tracking-[0.04em] uppercase cursor-pointer transition-colors duration-[250ms] no-underline ${
                cur === i + 1 ? 'text-hot' : 'text-pxwhite/80 hover:text-pxwhite'
              }`}
            >
              {label}
            </a>
          ))}
          <div className="flex items-center -mt-[9px] gap-[3px] p-[3px] rounded-[10px] bg-glass border border-line ml-10">
            {(['mn', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`font-heading font-bold text-[9px] px-2.5 py-[5px] rounded-[10px] uppercase tracking-[0.06em] border-0 cursor-pointer transition-all duration-[250ms] ${
                  lang === l
                    ? 'text-white [background:linear-gradient(90deg,#6f63ff,#ff4fd8)] shadow-[0_4px_14px_rgba(111,99,255,0.35)]'
                    : 'text-mute bg-transparent hover:text-pxwhite'
                }`}
              >
                {l === 'mn' ? 'МН' : 'ENG'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile dropdown — vertical nav list, closes on item tap */}
      {open && (
        <div
          className="tablet:hidden fixed top-[64px] left-0 right-0 z-[39] flex flex-col"
          style={{
            background: 'rgba(5,5,20,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(111,99,255,0.18)',
          }}
        >
          {t.nav.map((label, i) => (
            <button
              key={i}
              onClick={() => { go(i + 1); close() }}
              className="w-full text-left px-6 py-4 border-0 cursor-pointer transition-colors duration-200"
              style={{
                background: 'transparent',
                color: cur === i + 1 ? '#ff4fd8' : 'rgba(247,249,255,0.75)',
                borderBottom: '1px solid rgba(111,99,255,0.08)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: 'rgba(111,99,255,0.5)', fontFamily: 'monospace', fontSize: 10, marginRight: 12 }}>
                0{i + 1}
              </span>
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
