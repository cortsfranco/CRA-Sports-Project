import { useAuth } from '../contexts/AuthContext';

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Equipos
            </h2>
            <p className="text-muted-foreground">
              Gestiona tus equipos deportivos
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Jugadores
            </h2>
            <p className="text-muted-foreground">
              Administra la plantilla de jugadores
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Partidos
            </h2>
            <p className="text-muted-foreground">
              Programa y gestiona los partidos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 