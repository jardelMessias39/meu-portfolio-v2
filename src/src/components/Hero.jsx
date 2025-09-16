import React from 'react';
import { ArrowRight, Download, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const Hero = ({ onChatOpen }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                Desenvolvedor Júnior
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transformando
              <span className="text-blue-600 block">Ideias em Código</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Desenvolvedor Full Stack apaixonado por criar soluções que fazem a diferença. 
              Focado em acessibilidade e experiência do usuário.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Ver Projetos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={onChatOpen}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Converse Comigo
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Projetos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2025</div>
              <div className="text-sm text-gray-600">Início na DevClub</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Dedicação</div>
            </div>
          </div>
        </div>

        {/* Image/Visual */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                <div className="h-2 bg-purple-200 rounded w-1/2"></div>
                <div className="h-2 bg-green-200 rounded w-2/3"></div>
                <div className="h-2 bg-yellow-200 rounded w-1/4"></div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-blue-600 font-semibold">console.log("Olá, Mundo!");</div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-lg animate-bounce">
            <span className="text-2xl">💻</span>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-full shadow-lg animate-pulse">
            <span className="text-2xl">🚀</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;