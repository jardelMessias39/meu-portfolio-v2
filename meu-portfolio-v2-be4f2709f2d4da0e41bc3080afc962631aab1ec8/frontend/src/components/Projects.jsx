import React from 'react';
import { ExternalLink, Github, Target, Cpu } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { projects } from '../data/mock';

const Projects = () => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Game Development':
        return <Cpu className="h-5 w-5" />;
      case 'Web Development':
        return <ExternalLink className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Game Development':
        return 'bg-green-100 text-green-700';
      case 'Web Development':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Projetos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada projeto foi desenvolvido com propósito: criar soluções que fazem a diferença 
            na vida das pessoas, com foco em acessibilidade e experiência do usuário.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(project.category)} font-medium`}>
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </span>
                  </Badge>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                {/* Objective */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-blue-900 mb-1">Objetivo do Projeto:</p>
                  <p className="text-sm text-blue-700">{project.objective}</p>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Tecnologias:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-2">Funcionalidades:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Código
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quer ver mais projetos em desenvolvimento?
            </h3>
            <p className="text-gray-600 mb-6">
              Estou sempre trabalhando em novos projetos e aprendendo novas tecnologias. 
              Acompanhe meu progresso no GitHub!
            </p>
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
              <Github className="h-5 w-5 mr-2" />
              Ver GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;