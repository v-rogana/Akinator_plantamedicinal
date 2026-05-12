// Ícones em linha desenhados à mão, inspirados em cadernos de campo botânicos.
// Tudo usa stroke="currentColor", então a cor vem do texto pai (Tailwind text-*).

export function Sprig({ className = '', size = 72 }) {
  return (
    <svg
      viewBox="0 0 64 84"
      width={size}
      height={(size * 84) / 64}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* haste principal, levemente curva */}
      <path d="M32 82 C 32 70 31 50 33 30 C 34 18 33 10 33 4" />
      {/* folha ponta (topo) */}
      <path d="M33 4 C 28 8 26 14 30 18 C 35 16 38 10 33 4 Z" />
      <path d="M31 7 L 32 16" opacity="0.55" />
      {/* par superior — folha direita */}
      <path d="M33 20 C 44 18 54 22 58 30 C 50 32 38 28 33 26" />
      <path d="M35 23 L 56 28" opacity="0.5" />
      {/* par superior — folha esquerda */}
      <path d="M33 30 C 22 28 12 32 8 40 C 16 42 28 38 33 36" />
      <path d="M31 33 L 10 38" opacity="0.5" />
      {/* par inferior — folha direita */}
      <path d="M33 44 C 44 42 54 46 58 54 C 50 56 38 52 33 50" />
      <path d="M35 47 L 56 52" opacity="0.5" />
      {/* par inferior — folha esquerda */}
      <path d="M33 56 C 22 54 12 58 8 66 C 16 68 28 64 33 62" />
      <path d="M31 59 L 10 64" opacity="0.5" />
      {/* base — pequeno ornamento */}
      <circle cx="32" cy="82" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Leaf({ className = '', size = 32 }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* forma da folha */}
      <path d="M6 22 C 8 12 16 4 26 6 C 28 16 20 24 10 26 Z" />
      {/* nervura central */}
      <path d="M6 22 L 26 6" opacity="0.55" />
      {/* nervuras laterais */}
      <path d="M11 19 L 17 14" opacity="0.4" />
      <path d="M15 23 L 22 16" opacity="0.4" />
    </svg>
  );
}

export function Lens({ className = '', size = 24 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* lupa de naturalista, mira interna */}
      <circle cx="10" cy="10" r="6.5" />
      <path d="M14.8 14.8 L 21 21" />
      <path d="M10 7 L 10 13" opacity="0.55" />
      <path d="M7 10 L 13 10" opacity="0.55" />
    </svg>
  );
}

export function Divider({ className = '', width = 180 }) {
  return (
    <svg
      viewBox="0 0 180 18"
      width={width}
      height={(width * 18) / 180}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* linha esquerda */}
      <path d="M2 9 L 70 9" />
      {/* folha central */}
      <path d="M76 9 C 80 4 88 4 92 9 C 88 14 80 14 76 9 Z" />
      <path d="M76 9 L 92 9" opacity="0.55" />
      {/* haste curta entre folha e linha direita */}
      <circle cx="90" cy="9" r="0.8" fill="currentColor" stroke="none" />
      <path d="M98 9 C 102 4 110 4 114 9 C 110 14 102 14 98 9 Z" />
      <path d="M98 9 L 114 9" opacity="0.55" />
      <path d="M120 9 L 178 9" />
    </svg>
  );
}

export function Book({ className = '', size = 22 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* livro aberto */}
      <path d="M3 5 C 6 5 9 6 12 8 C 15 6 18 5 21 5 L 21 19 C 18 19 15 20 12 22 C 9 20 6 19 3 19 Z" />
      <path d="M12 8 L 12 22" opacity="0.55" />
      <path d="M6 9 L 10 10" opacity="0.45" />
      <path d="M6 12 L 10 13" opacity="0.45" />
      <path d="M14 10 L 18 9" opacity="0.45" />
      <path d="M14 13 L 18 12" opacity="0.45" />
    </svg>
  );
}

export function Compass({ className = '', size = 22 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* rosa dos ventos */}
      <circle cx="12" cy="12" r="9" />
      <path d="M12 5 L 14 12 L 12 19 L 10 12 Z" />
      <path d="M5 12 L 12 10 L 19 12 L 12 14 Z" opacity="0.55" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
