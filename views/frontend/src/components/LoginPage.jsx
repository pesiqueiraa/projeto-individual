import React, { useState } from 'react';
import axios from 'axios';
import { Car, Mail, Lock, Gauge, Zap, Settings, Users, BarChart3 } from 'lucide-react';

const BASE_URL = 'http://localhost:3000'; // ou a URL do seu servidor

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (showError) setShowError(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setShowError(false);

        try {
            const response = await axios.post(
                `${BASE_URL}/users/login`,
                {
                    email: formData.email,
                    senha: formData.password
                }
            );

            // Se chegar aqui, status 200 e response.data.success === true
            alert(response.data.message || 'Login realizado com sucesso!');
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);

            if (err.response) {
                // Erro retornado pelo backend (401, 400, etc)
                alert(err.response.data.message || 'Erro ao fazer login.');
            } else {
                // Erro de rede ou inesperado
                alert('Erro de conexão. Tente novamente mais tarde.');
            }
            setShowError(true);
        }
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
            {/* Left Side - Branding and Features */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-20">
                        <Car className="h-32 w-32 text-white transform rotate-12" />
                    </div>
                    <div className="absolute bottom-32 right-20">
                        <Settings className="h-24 w-24 text-white transform -rotate-12" />
                    </div>
                    <div className="absolute top-1/2 left-1/3">
                        <Gauge className="h-28 w-28 text-white transform rotate-45" />
                    </div>
                </div>

                <div className="relative z-10 max-w-sm text-center">
                    {/* Logo */}
                    <div className="inline-block p-4 rounded-full mb-6" style={{ backgroundColor: '#1E293B' }}>
                        <Zap className="h-16 w-16" style={{ color: '#E63946' }} />
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl font-bold mb-3" style={{ color: '#E63946' }}>
                        Garagem AutoCars
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Sistema de Gestão Automotiva Completo
                    </p>

                    {/* Features */}
                    <div className="space-y-3 text-left">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: '#1E293B' }}>
                                <Car className="h-4 w-4" style={{ color: '#E63946' }} />
                            </div>
                            <span className="text-sm text-gray-300">Gestão completa de veículos</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: '#1E293B' }}>
                                <Users className="h-4 w-4" style={{ color: '#E63946' }} />
                            </div>
                            <span className="text-sm text-gray-300">Controle de clientes e funcionários</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: '#1E293B' }}>
                                <BarChart3 className="h-4 w-4" style={{ color: '#E63946' }} />
                            </div>
                            <span className="text-sm text-gray-300">Relatórios e análises detalhadas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-hidden" style={{ backgroundColor: '#1E293B' }}>
                <div className="w-full max-w-sm">
                    {/* Login Card */}
                    <div
                        className="rounded-2xl shadow-2xl border p-6"
                        style={{
                            backgroundColor: '#0F172A',
                            borderColor: '#334155'
                        }}
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-white mb-2">Painel de Controle</h2>
                            <p className="text-gray-400 text-sm">Acesse sua conta para continuar</p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="seu@email.com"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                        style={{
                                            backgroundColor: '#1E293B',
                                            borderColor: '#475569',
                                            '--tw-ring-color': '#E63946'
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                        style={{
                                            backgroundColor: '#1E293B',
                                            borderColor: '#475569',
                                            '--tw-ring-color': '#E63946'
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={isLoading}
                                className="w-full py-3 px-6 rounded-xl text-white font-medium flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                                style={{ backgroundColor: '#E63946' }}
                            >
                                {isLoading ? (
                                    <>
                                        <Gauge className="h-5 w-5 animate-spin" />
                                        <span>Entrando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Car className="h-5 w-5" />
                                        <span>Entrar no Sistema</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Error Message */}
                        {showError && (
                            <div
                                className="mt-6 p-4 rounded-xl text-white text-center text-sm border-l-4"
                                style={{ 
                                    backgroundColor: '#7F1D1D', 
                                    borderLeftColor: '#DC2626'
                                }}
                            >
                                Email ou senha incorretos. Tente novamente.
                            </div>
                        )} 
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-400">
                            © 2025 Garagem AutoCars. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
