
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Validação com as credenciais específicas
        setTimeout(() => {
            if (email === 'admin@admin.com' && password === '123456') {
                alert('Login realizado com sucesso!');
                // Aqui você pode redirecionar o usuário ou definir um estado de autenticação
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', email);
                window.location.reload(); // Recarrega a página para aplicar o estado de autenticação
            } else {
                setError('Email ou senha inválidos. Use admin@admin.com e senha 123456');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center h-20 w-20 bg-[#02a7a0] rounded-full">
                        <span className="text-3xl font-bold text-white tracking-tighter">QM</span>
                    </div>
                </div>
                
                <h1 className="text-2xl font-bold text-center text-gray-900">
                    Login - Quintal do Marchetti
                </h1>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                                placeholder="voce@exemplo.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#02a7a0] focus:border-[#02a7a0]"
                                placeholder="Sua senha"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#02a7a0] hover:bg-[#018d87] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#02a7a0] disabled:opacity-50"
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
