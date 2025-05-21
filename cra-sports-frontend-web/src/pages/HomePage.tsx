import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Bienvenido a CRA Sports
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            La plataforma definitiva para gestionar tus equipos deportivos
          </p>
          {!isAuthenticated && (
            <a
              href="/auth"
              className="inline-block px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Comenzar Ahora
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 