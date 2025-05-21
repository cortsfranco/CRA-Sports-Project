import { useAuth } from '../../contexts/AuthContext';

export function Sidebar() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <aside className="w-64 bg-background border-r border-border h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          <a
            href="/dashboard"
            className="block px-4 py-2 rounded-md hover:bg-muted text-foreground"
          >
            Dashboard
          </a>
          <a
            href="/teams"
            className="block px-4 py-2 rounded-md hover:bg-muted text-foreground"
          >
            Equipos
          </a>
          <a
            href="/players"
            className="block px-4 py-2 rounded-md hover:bg-muted text-foreground"
          >
            Jugadores
          </a>
          <a
            href="/matches"
            className="block px-4 py-2 rounded-md hover:bg-muted text-foreground"
          >
            Partidos
          </a>
          <a
            href="/settings"
            className="block px-4 py-2 rounded-md hover:bg-muted text-foreground"
          >
            Configuración
          </a>
        </nav>
      </div>
    </aside>
  );
} 