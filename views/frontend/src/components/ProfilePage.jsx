import React, { useState } from 'react';
import { Car, Mail, User, Plus, X, Zap, Calendar, Gauge, Settings, LogOut, AlertCircle } from 'lucide-react';
import axios from 'axios';


const BASE_URL = 'http://localhost:3000';

const ProfilePage = ({ user, onLogout }) => {
    const [cars, setCars] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [showAddCarModal, setShowAddCarModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [error, setError] = useState('');
    const [newCar, setNewCar] = useState({
        modelo: '',
        potencia: '',
        ano_fabricacao: '',
        marca_id: ''
    });
    console.log('Usuário logado:', user);
    React.useEffect(() => {
        loadInitialData();
    }, []); 

    const loadInitialData = async () => {
        try {
            setIsLoadingPage(true);
            await Promise.all([
                loadCars(),
                loadMarcas()
            ]);
        } catch (error) {
            setError('Erro ao carregar dados iniciais');
            console.error('Erro ao carregar dados:', error);
        } finally {
            setIsLoadingPage(false);
        }
    };

    const loadCars = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/carros`);

        const userCars = (response.data.data || []).filter(car => car.user_id === user.id);
        setCars(userCars);
    } catch (error) {
        console.error('Erro ao carregar carros:', error);
        setError('Erro ao carregar carros');
    }
    };

    const loadMarcas = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/marcas`);
            setMarcas(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Erro ao carregar marcas:', error);
            setError('Erro ao carregar marcas');
            setMarcas([]); 
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCar(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCar = async () => {
        if (!newCar.modelo || !newCar.potencia || !newCar.ano_fabricacao || !newCar.marca_id) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const carData = {
                modelo: newCar.modelo,
                potencia: parseInt(newCar.potencia),
                ano_fabricacao: parseInt(newCar.ano_fabricacao),
                marca_id: newCar.marca_id,
                user_id: user.id
            };
            console.log('Enviando para API:', carData); 


            const response = await axios.post(`${BASE_URL}/carros`, carData);

            if (response.status === 201 || response.status === 200) {
                await loadCars();

                setNewCar({ modelo: '', potencia: '', ano_fabricacao: '', marca_id: '' });
                setShowAddCarModal(false);
            }
        } catch (error) {
            console.error('Erro ao adicionar carro:', error);
            setError(error.response?.data?.message || 'Erro ao adicionar carro');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCar = async (carId) => {
        if (!confirm('Tem certeza que deseja excluir este carro?')) {
            return;
        }

        try {
            await axios.delete(`${BASE_URL}/carros/${carId}`);
            await loadCars();
        } catch (error) {
            console.error('Erro ao deletar carro:', error);
            setError('Erro ao deletar carro');
        }
    };

    const handleLogout = () => {
        onLogout();
    };

    const getMarcaById = (marcaId) => {
        return marcas.find(marca => marca.id === marcaId);
    };

    if (isLoadingPage) {
        return (
            <div className="min-h-screen w-screen flex items-center justify-center" style={{ backgroundColor: '#0F172A' }}>
                <div className="text-center">
                    <Settings className="h-12 w-12 text-gray-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: '#0F172A' }}>
            <div className="border-b" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full" style={{ backgroundColor: '#0F172A' }}>
                                <Zap className="h-8 w-8" style={{ color: '#E63946' }} />
                            </div>
                            <h1 className="text-xl font-bold" style={{ color: '#E63946' }}>
                                Garagem AutoCars
                            </h1>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
                            style={{ backgroundColor: '#334155' }}
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="text-sm">Sair</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {error && (
                    <div className="mb-6 p-4 rounded-xl border-l-4 flex items-center space-x-3"
                        style={{ backgroundColor: '#7F1D1D', borderLeftColor: '#DC2626' }}>
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <span className="text-white">{error}</span>
                        <button
                            onClick={() => setError('')}
                            className="ml-auto text-red-400 hover:text-red-300"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <div className="mb-8">
                    <div
                        className="rounded-2xl shadow-xl border p-6"
                        style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
                    >
                        <div className="flex items-center space-x-6">
                            <div className="p-4 rounded-full" style={{ backgroundColor: '#0F172A' }}>
                                <User className="h-16 w-16" style={{ color: '#E63946' }} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">{user.nome}</h2>
                                <div className="flex items-center space-x-2 text-gray-300">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Meus Carros ({cars.length})</h3>
                    <button
                        onClick={() => setShowAddCarModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                        style={{ backgroundColor: '#E63946' }}
                    >
                        <Plus className="h-4 w-4" />
                        <span>Adicionar Carro</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => {
                        const marca = getMarcaById(car.marca_id);
                        return (
                            <div
                                key={car.id}
                                className="rounded-xl shadow-lg border p-6 transform hover:-translate-y-1 transition-all duration-200 relative group"
                                style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
                            >
                                <button
                                    onClick={() => handleDeleteCar(car.id)}
                                    className="absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                    style={{ backgroundColor: '#7F1D1D' }}
                                >
                                    <X className="h-4 w-4 text-white" />
                                </button>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        {marca?.logo_url && (
                                            <img
                                                src={marca.logo_url}
                                                alt={marca.nome}
                                                className="h-8 w-8 object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        )}
                                        <span className="text-sm text-gray-300">{marca?.nome || 'Marca não encontrada'}</span>
                                    </div>
                                    <Car className="h-5 w-5" style={{ color: '#E63946' }} />
                                </div>

                                <h4 className="text-lg font-bold text-white mb-3">{car.modelo}</h4>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Gauge className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-300">Potência</span>
                                        </div>
                                        <span className="text-sm text-white font-medium">{car.potencia} HP</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-300">Ano</span>
                                        </div>
                                        <span className="text-sm text-white font-medium">{car.ano_fabricacao}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {cars.length === 0 && (
                    <div className="text-center py-12">
                        <Car className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">Nenhum carro adicionado ainda</p>
                        <p className="text-gray-500 text-sm">Clique em "Adicionar Carro" para começar</p>
                    </div>
                )}
            </div>

            {showAddCarModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <div
                        className="w-full max-w-md rounded-2xl shadow-2xl border p-6"
                        style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Adicionar Novo Carro</h3>
                            <button
                                onClick={() => {
                                    setShowAddCarModal(false);
                                    setError('');
                                    setNewCar({ modelo: '', potencia: '', ano_fabricacao: '', marca_id: '' });
                                }}
                                className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200"
                                style={{ backgroundColor: '#334155' }}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Marca
                                </label>
                                <select
                                    name="marca_id"
                                    value={newCar.marca_id}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border text-white focus:outline-none focus:ring-2 transition-all duration-200"
                                    style={{
                                        backgroundColor: '#0F172A',
                                        borderColor: '#475569',
                                        '--tw-ring-color': '#E63946'
                                    }}
                                    required
                                >
                                    <option value="">Selecione a marca</option>
                                    {Array.isArray(marcas) && marcas.map(marca => (
                                        <option key={marca.id} value={marca.id}>{marca.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Modelo
                                </label>
                                <input
                                    type="text"
                                    name="modelo"
                                    value={newCar.modelo}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Civic, Corolla, Golf..."
                                    className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                    style={{
                                        backgroundColor: '#0F172A',
                                        borderColor: '#475569',
                                        '--tw-ring-color': '#E63946'
                                    }}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Potência (HP)
                                </label>
                                <input
                                    type="number"
                                    name="potencia"
                                    value={newCar.potencia}
                                    onChange={handleInputChange}
                                    placeholder="Ex: 150, 300, 500..."
                                    min="1"
                                    className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                    style={{
                                        backgroundColor: '#0F172A',
                                        borderColor: '#475569',
                                        '--tw-ring-color': '#E63946'
                                    }}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Ano de Fabricação
                                </label>
                                <input
                                    type="number"
                                    name="ano_fabricacao"
                                    value={newCar.ano_fabricacao}
                                    onChange={handleInputChange}
                                    placeholder="Ex: 2020, 2021, 2022..."
                                    min="1900"
                                    max="2025"
                                    className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200"
                                    style={{
                                        backgroundColor: '#0F172A',
                                        borderColor: '#475569',
                                        '--tw-ring-color': '#E63946'
                                    }}
                                    required
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log('abrir modal');
                                        setShowAddCarModal(true);
                                        setError('');
                                        setNewCar({ modelo: '', potencia: '', ano_fabricacao: '', marca_id: '' });
                                    }}
                                    className="flex-1 py-3 px-4 rounded-xl text-gray-300 font-medium border transition-all duration-200 hover:bg-gray-700"
                                    style={{ backgroundColor: '#334155', borderColor: '#475569' }}
                                    disabled={isLoading}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddCar}
                                    disabled={isLoading}
                                    className="flex-1 py-3 px-4 rounded-xl text-white font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#E63946' }}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <Settings className="h-4 w-4 animate-spin" />
                                            <span>Salvando...</span>
                                        </div>
                                    ) : (
                                        'Adicionar'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;