/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        papel: '#F5F0E8',
        papelEscuro: '#EAE0CC',
        tinta: '#3D2B1F',
        folha: '#4A7C59',
        folhaEscura: '#2F5438',
        sepia: '#B8860B',
        terracota: '#C75B39'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['Lora', 'Georgia', 'serif']
      },
      boxShadow: {
        caderno: '0 1px 0 rgba(61,43,31,0.08), 0 8px 24px -12px rgba(61,43,31,0.25)'
      }
    }
  },
  plugins: []
};
