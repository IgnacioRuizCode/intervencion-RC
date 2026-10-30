import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import './ThemeToggle.css'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'rc-theme'

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage bloqueado: el tema igual funciona en la sesión */
}
  }, [theme])

  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className="themeToggle"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      title={isLight ? 'Modo oscuro' : 'Modo claro'}
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}

export default ThemeToggle