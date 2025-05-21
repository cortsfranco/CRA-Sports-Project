import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">CRA Sports</span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-foreground hover:bg-muted"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Cerrar Sesión
              </button>
            ) : (
              <a
                href="/auth"
                className="ml-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Iniciar Sesión
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 