import React from 'react';
import { Github, Linkedin, Mail, Heart, Code } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/jardelMessias39", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/jardel-messias-desenvolvedor", label: "LinkedIn" },
    { icon: Mail, href: "mailto:jardel.messias.dev@gmail.com", label: "Email" }
  ];

  const quickLinks = [
    { label: 'Sobre', href: '#about' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Contato', href: '#contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">Desenvolvedor Full Stack</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Apaixonado por transformar ideias em código e criar soluções que fazem 
              a diferença na vida das pessoas. Sempre em busca de novos desafios e 
              aprendizados.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 h-10 w-10"
                  asChild
                >
                  <a href={href} aria-label={label}>
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a 
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-3 text-gray-400">
              <div>
                <p className="font-medium text-white mb-1">Email</p>
                <a 
                  href="mailto:contato@desenvolvedor.com"
                  className="hover:text-white transition-colors"
                >
                  contato@desenvolvedor.com
                </a>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Localização</p>
                <p>Brasil</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Status</p>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Disponível para projetos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Desenvolvedor Full Stack. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>e muito</span>
              <Code className="h-4 w-4 text-blue-500" />
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              "Ninguém nasce sabendo - estou sempre correndo atrás do conhecimento 
              para me tornar um programador cada vez melhor."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;