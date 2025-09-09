import React from 'react';
import { Code, Lightbulb, Wrench } from 'lucide-react';
import { skills } from '../data/mock';

const Skills = () => {
  const skillCategories = [
    {
      title: "Tecnologias Atuais",
      icon: <Code className="h-6 w-6" />,
      skills: skills.current,
      color: "blue",
      description: "Linguagens que estou dominando atualmente"
    },
    {
      title: "Próximos Passos",
      icon: <Lightbulb className="h-6 w-6" />,
      skills: skills.learning,
      color: "purple",
      description: "Tecnologias que pretendo aprender em breve"
    },
    {
      title: "Ferramentas",
      icon: <Wrench className="h-6 w-6" />,
      skills: skills.tools,
      color: "green",
      description: "Ferramentas que utilizo no desenvolvimento"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "text-blue-600",
        text: "text-blue-900",
        skill: "bg-blue-100 text-blue-700"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200", 
        icon: "text-purple-600",
        text: "text-purple-900",
        skill: "bg-purple-100 text-purple-700"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "text-green-600", 
        text: "text-green-900",
        skill: "bg-green-100 text-green-700"
      }
    };
    return colors[color];
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Habilidades</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estou em constante aprendizado, sempre buscando novas tecnologias e 
            aprimorando minhas habilidades para me tornar um desenvolvedor completo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const colorClasses = getColorClasses(category.color);
            return (
              <div 
                key={index}
                className={`${colorClasses.bg} ${colorClasses.border} border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${colorClasses.icon}`}>
                    {category.icon}
                  </div>
                  <h3 className={`text-lg font-bold ${colorClasses.text}`}>
                    {category.title}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className={`${colorClasses.skill} px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Journey */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Jornada de Aprendizado</h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              "Ninguém nasce sabendo" - essa é minha filosofia. Estou sempre correndo atrás 
              do conhecimento, participando de cursos, lendo documentações e praticando através 
              de projetos reais.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">6+</div>
                <div className="text-blue-100">Meses de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-blue-100">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">∞</div>
                <div className="text-blue-100">Vontade de Aprender</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
