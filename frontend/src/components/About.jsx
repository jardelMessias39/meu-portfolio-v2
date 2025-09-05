import React from 'react';
import { Calendar, GraduationCap, Building2, Target } from 'lucide-react';
import { profileData } from '../data/mock';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre Mim</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma jornada de descoberta e paixão pela programação, com foco em criar 
            soluções que realmente fazem a diferença na vida das pessoas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">Minha História</h3>
              <p className="text-gray-600 leading-relaxed">
                Olá! Sou <strong>Jardel Messias</strong>, tenho 39 anos e sou um desenvolvedor Full Stack com uma 
                jornada única. Nascido em Salvador-BA, vim para Sergipe aos 13 anos para morar com minha 
                avó materna, onde aprendi importantes lições sobre respeito e perseverança.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Formei-me em Licenciatura em Informática pela UNIT há 8 anos, mas foi só agora, em junho 
                de 2025 com a DevClub, que descobri minha verdadeira paixão pela programação. Antes trabalhei 
                como cortador na Dakota Calçados e fiz diversos cursos, desde instalador elétrico até 
                atendimento ao cliente.
              </p>
              <p className="text-gray-600 leading-relaxed">
                O que realmente me encanta é a capacidade de materializar ideias em código e resolver 
                problemas que façam a diferença na vida das pessoas. Sou uma pessoa conservadora, que 
                valoriza a família acima de tudo. Minha maior motivação é dar condições melhores à minha 
                família e ter tempo para passear com eles.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Agradeço a Deus pela força e garra ao longo desta trajetória. Acredito que nunca é tarde 
                para seguir seus sonhos, e estou pronto para colocar minhas ideias em prática como desenvolvedor.
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <Calendar className="h-8 w-8 text-blue-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Jornada</h4>
              <p className="text-gray-600">Salvador-BA → Sergipe aos 13 anos</p>
              <p className="text-sm text-blue-600 mt-1">Vida com a avó materna</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <GraduationCap className="h-8 w-8 text-purple-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Formação</h4>
              <p className="text-gray-600">Licenciatura em Informática</p>
              <p className="text-sm text-purple-600 mt-1">UNIT - Há 8 anos</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <Building2 className="h-8 w-8 text-green-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Experiência</h4>
              <p className="text-gray-600">DevClub + Dakota Calçados</p>
              <p className="text-sm text-green-600 mt-1">Cortador + Desenvolvedor</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <Target className="h-8 w-8 text-orange-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Motivação</h4>
              <p className="text-gray-600">Família e fazer a diferença</p>
              <p className="text-sm text-orange-600 mt-1">Condições melhores através do código</p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Minha Missão</h3>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-4">
            Quero fazer parte de equipes que desenvolvem projetos que melhorem a vida das pessoas. 
            Meu objetivo é dar condições melhores à minha família e ter tempo para passear com eles, 
            enquanto uso a tecnologia para resolver problemas reais.
          </p>
          <p className="text-blue-100 italic">
            "Nunca é tarde para seguir seus sonhos. Cada linha de código é um passo em direção a um futuro melhor."
          </p>
          
          {/* Download CV Button */}
          <div className="mt-6">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Baixar Currículo (PDF)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;