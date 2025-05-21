import { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-50 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border p-8 flex flex-col gap-8">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-extrabold text-[#f97316] tracking-tight mb-1">CRA-SPORTS</h1>
          <p className="text-base text-gray-500 mb-2">
            Plataforma de gestión deportiva integral
          </p>
          <div className="flex justify-center mb-4 mt-4">
            <button
              className={`flex-1 py-2 rounded-l-lg border border-gray-200 text-base font-medium transition-colors ${isLogin ? 'bg-gray-100 text-[#f97316]' : 'bg-white text-gray-500'}`}
              style={{ borderRight: 0 }}
              onClick={() => setIsLogin(true)}
            >
              Iniciar Sesión
            </button>
            <button
              className={`flex-1 py-2 rounded-r-lg border border-gray-200 text-base font-medium transition-colors ${!isLogin ? 'bg-gray-100 text-[#f97316]' : 'bg-white text-gray-500'}`}
              onClick={() => setIsLogin(false)}
            >
              Registrarse
            </button>
          </div>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
            <button
              className="text-[#f97316] font-semibold hover:underline ml-1"
              onClick={() => setIsLogin(!isLogin)}
              type="button"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 