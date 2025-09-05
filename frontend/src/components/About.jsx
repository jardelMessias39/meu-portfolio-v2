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
              <h4 className="font-semibold text-gray-900 mb-2">Início na Programação</h4>
              <p className="text-gray-600">{profileData.startDate}</p>
              <p className="text-sm text-blue-600 mt-1">DevClub</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <GraduationCap className="h-8 w-8 text-purple-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Formação</h4>
              <p className="text-gray-600">Licenciatura em Informática</p>
              <p className="text-sm text-purple-600 mt-1">UNIT - 2019</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <Building2 className="h-8 w-8 text-green-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Empresa Atual</h4>
              <p className="text-gray-600">{profileData.company}</p>
              <p className="text-sm text-green-600 mt-1">Desenvolvedor Júnior</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <Target className="h-8 w-8 text-orange-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Objetivo</h4>
              <p className="text-gray-600">Fazer a diferença através do código</p>
              <p className="text-sm text-orange-600 mt-1">Projetos que impactam vidas</p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Minha Missão</h3>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Quero participar de equipes que desenvolvem projetos que melhoram a vida das pessoas, 
            trazendo mais produtividade e fazendo a diferença no mundo. Cada linha de código 
            deve ter um propósito e gerar impacto positivo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;