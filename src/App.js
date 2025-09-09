import React from 'react';
import Hero from './components/Hero';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-600">Jardel Messias</h1>
          <p className="text-gray-600">Desenvolvedor Full Stack</p>
        </div>
      </header>

      <Hero />
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Transformando <span className="text-blue-600">Ideias em Código</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Desenvolvedor Full Stack apaixonado por criar soluções que fazem a diferença
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Meus Projetos</h3>
            <ul className="text-left space-y-2">
              <li>🎮 Jogo Embaralhado (Shuffle)</li>
              <li>🌧️ Chuva de Palavras</li>
              <li>🍽️ Comidas Típicas do Brasil</li>
              <li>📱 Gerador Link WhatsApp</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <p>📧 jardel.messias.dev@gmail.com</p>
          <p>📱 (79) 99806-1093</p>
          <p className="mt-4">© 2025 Jardel Messias - Desenvolvedor Full Stack</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
