/**
 * Animated cartoon avatar drawn after the supplied portrait: side-swept black hair,
 * black rectangular glasses, black suit over a black open-collar shirt.
 * Idle animation (see hero-visual.css, `.ca-*`): breathing, head tilt, blinking,
 * a periodic wave with raised brows, and a glint across the lenses.
 */
export function CartoonAvatar({ label }: { label: string }) {
  return (
    <svg className="cartoon-avatar" viewBox="0 0 320 420" role="img" aria-label={label}>
      <defs>
        <linearGradient id="ca-suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2e3d" />
          <stop offset="1" stopColor="#0c0e15" />
        </linearGradient>
        <linearGradient id="ca-sleeve" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2e3d" />
          <stop offset="1" stopColor="#14161f" />
        </linearGradient>
        <radialGradient id="ca-skin" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#ffe6d3" />
          <stop offset="0.7" stopColor="#f2c9ac" />
          <stop offset="1" stopColor="#dca88a" />
        </radialGradient>
        <linearGradient id="ca-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b2a30" />
          <stop offset="1" stopColor="#09090d" />
        </linearGradient>
        <clipPath id="ca-lenses">
          <rect x="110" y="136" width="44" height="34" rx="9" />
          <rect x="166" y="136" width="44" height="34" rx="9" />
        </clipPath>
      </defs>

      <g className="ca-body">
        {/* other arm, relaxed */}
        <path d="M252 304 C268 334 274 372 272 420" fill="none" stroke="url(#ca-sleeve)" strokeWidth="30" strokeLinecap="round" />
        {/* jacket */}
        <path
          d="M40 420 C40 334 60 288 110 270 L140 258 L160 304 L180 258 L210 270 C260 288 280 334 280 420 Z"
          fill="url(#ca-suit)"
          stroke="#05060a"
          strokeWidth="2.5"
        />
        {/* black shirt with open collar */}
        <path d="M140 258 L160 304 L180 258 L178 420 L142 420 Z" fill="#1a1c24" />
        <path d="M145 258 L160 286 L175 258 Z" fill="url(#ca-skin)" />
        <path d="M140 256 L160 288 L148 300 L130 266 Z" fill="#23262f" stroke="#05060a" strokeWidth="1.5" />
        <path d="M180 256 L160 288 L172 300 L190 266 Z" fill="#23262f" stroke="#05060a" strokeWidth="1.5" />
        {/* lapels */}
        <path d="M140 258 L160 304 L150 420 L118 420 L124 336 L106 314 Z" fill="#20232f" stroke="#05060a" strokeWidth="1.5" />
        <path d="M180 258 L160 304 L170 420 L202 420 L196 336 L214 314 Z" fill="#20232f" stroke="#05060a" strokeWidth="1.5" />
        <path d="M106 314 L124 336" stroke="#4a5070" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M214 314 L196 336" stroke="#4a5070" strokeWidth="1.5" strokeLinecap="round" />
        {/* chest pocket + button */}
        <path d="M212 352 L242 348" stroke="#3d4258" strokeWidth="2" strokeLinecap="round" />
        <circle cx="164" cy="386" r="4" fill="#3d4258" />
        {/* rim highlight */}
        <path d="M44 410 C46 338 64 294 110 272" fill="none" stroke="#5b6694" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* waving arm: upper arm is static, forearm + hand rotate around the elbow */}
      <path d="M78 292 C58 306 42 326 36 344" fill="none" stroke="url(#ca-sleeve)" strokeWidth="34" strokeLinecap="round" />
      <g className="ca-forearm">
        <path d="M36 344 C34 312 36 288 42 266" fill="none" stroke="url(#ca-sleeve)" strokeWidth="30" strokeLinecap="round" />
        <path d="M30 272 L56 270" stroke="#1a1c24" strokeWidth="8" strokeLinecap="round" />
        <g className="ca-hand" stroke="#b9876b" strokeWidth="2">
          <rect x="22" y="216" width="10" height="30" rx="5" fill="url(#ca-skin)" transform="rotate(-12 27 246)" />
          <rect x="33" y="210" width="10" height="34" rx="5" fill="url(#ca-skin)" />
          <rect x="44" y="212" width="10" height="32" rx="5" fill="url(#ca-skin)" transform="rotate(8 49 244)" />
          <rect x="54" y="220" width="9" height="26" rx="4.5" fill="url(#ca-skin)" transform="rotate(16 58 246)" />
          <rect x="16" y="238" width="10" height="22" rx="5" fill="url(#ca-skin)" transform="rotate(-48 21 258)" />
          <ellipse cx="42" cy="252" rx="20" ry="17" fill="url(#ca-skin)" />
        </g>
      </g>

      <g className="ca-head">
        {/* neck */}
        <path d="M144 206 L176 206 L178 262 L160 278 L142 262 Z" fill="url(#ca-skin)" />
        <path d="M144 222 C152 232 168 232 176 222 L176 236 C168 244 152 244 144 236 Z" fill="#c9957a" opacity="0.5" />
        {/* ears */}
        <ellipse cx="97" cy="158" rx="11" ry="17" fill="url(#ca-skin)" stroke="#b9876b" strokeWidth="2" />
        <ellipse cx="223" cy="158" rx="11" ry="17" fill="url(#ca-skin)" stroke="#b9876b" strokeWidth="2" />
        {/* face */}
        <path
          d="M160 82 C206 82 222 116 222 152 C222 196 194 228 160 228 C126 228 98 196 98 152 C98 116 114 82 160 82 Z"
          fill="url(#ca-skin)"
          stroke="#b9876b"
          strokeWidth="2.5"
        />
        {/* blush */}
        <ellipse cx="122" cy="186" rx="11" ry="6" fill="#f29b8b" opacity="0.35" />
        <ellipse cx="198" cy="186" rx="11" ry="6" fill="#f29b8b" opacity="0.35" />

        {/* hair: back volume, swept quiff and side-swept fringe */}
        <path
          d="M96 156 C84 104 106 62 160 58 C216 54 238 100 224 156 C220 136 214 122 206 114 L116 114 C106 124 100 138 96 156 Z"
          fill="url(#ca-hair)"
        />
        <path
          d="M104 124 C102 84 132 52 176 54 C210 56 230 80 226 120 C214 100 196 92 176 94 C156 96 140 108 124 110 C114 112 108 116 104 124 Z"
          fill="url(#ca-hair)"
        />
        <path
          d="M118 84 C128 46 178 30 210 52 C222 60 228 72 228 86 C214 70 194 64 172 66 C152 68 134 74 118 84 Z"
          fill="url(#ca-hair)"
        />
        <path d="M136 72 C156 58 186 56 206 66" fill="none" stroke="#5a5c6a" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <path d="M150 96 C166 84 190 82 210 92" fill="none" stroke="#4a4c58" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* brows (raise during the wave) */}
        <g className="ca-brows" stroke="#15110f" strokeWidth="5.5" strokeLinecap="round" fill="none">
          <path d="M116 128 C126 122 140 122 150 126" />
          <path d="M170 126 C180 122 194 122 204 128" />
        </g>

        {/* eyes (blink) */}
        <g className="ca-eyes">
          <ellipse cx="132" cy="154" rx="5.5" ry="7" fill="#2a1d17" />
          <ellipse cx="188" cy="154" rx="5.5" ry="7" fill="#2a1d17" />
          <circle cx="134" cy="151" r="1.8" fill="#fff" />
          <circle cx="190" cy="151" r="1.8" fill="#fff" />
        </g>

        {/* glasses */}
        <g fill="rgba(200, 220, 255, 0.14)" stroke="#111216" strokeWidth="4.5">
          <rect x="110" y="136" width="44" height="34" rx="9" />
          <rect x="166" y="136" width="44" height="34" rx="9" />
        </g>
        <path d="M154 150 C158 146 162 146 166 150" fill="none" stroke="#111216" strokeWidth="4" />
        <path d="M110 146 L96 142 M210 146 L224 142" stroke="#111216" strokeWidth="4" strokeLinecap="round" />
        <g clipPath="url(#ca-lenses)">
          <path className="ca-glint" d="M100 176 L130 128 L142 128 L112 176 Z" fill="#fff" opacity="0.55" />
        </g>

        {/* nose + smile */}
        <path d="M160 164 C156 174 156 180 163 182" fill="none" stroke="#c48a6c" strokeWidth="3" strokeLinecap="round" />
        <path className="ca-mouth" d="M144 198 C152 208 168 208 176 198" fill="none" stroke="#7a3b2e" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
