/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        papel: '#f5efe4',
        papelEscuro: '#ede5d4',
        tinta: '#1f1a14',
        tintaSuave: '#6b5d4f',
        folha: '#2b3d2f',
        folhaEscura: '#1f2c22',
        folhaSuave: '#5e7a64',
        sepia: '#d88058',
        terracota: '#b8573a',
        linha: '#d4c8b1'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        caderno: '0 1px 0 rgba(31,26,20,0.06), 0 8px 24px -12px rgba(31,26,20,0.22)'
      }
    }
  },
  plugins: []
};
