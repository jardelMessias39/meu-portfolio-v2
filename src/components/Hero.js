import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
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
          <div className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4</div>
              <div className="text-sm text-gray-600">Projetos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2025</div>
              <div className="text-sm text-gray-600">DevClub</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">39</div>
              <div className="text-sm text-gray-600">Anos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
