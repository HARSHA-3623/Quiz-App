import React from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cXVpenxlbnwwfDB8MHx8fDI%3D)' }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative max-w-3xl w-full text-center bg-transparent bg-opacity-70 rounded-2xl shadow-xl p-8 md:p-12">
                <div className="flex justify-center mb-6">
                    <Brain className="w-16 h-16 md:w-20 md:h-20 text-blue-600" />
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Welcome to QuizMaster
                </h1>
                
                <p className="text-base md:text-lg text-white mb-2 max-w-2xl mx-auto">
                    Test your knowledge with our engaging quiz challenges. Are you ready to prove your expertise?
                </p>

                <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            <span className="text-sm md:text-base">Exciting Questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            <span className="text-sm md:text-base">30 Sec per Question</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            <span className="text-sm md:text-base">Instant Results</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/instructions')}
                    className="inline-flex items-center gap-1 px-3 py-3 bg-blue-600 text-white rounded-lg font-semibold text-base md:text-lg hover:bg-blue-700 transition-colors"
                >
                    Start Your Journey 
                    <ArrowRight className="w-4 h-4 mt-1 md:w-5 md:h-5" />
                </button>
            </div>
        </div>
    );
}