import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';

const Header = ({ onChatOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Início', id: 'home' },
    { label: 'Sobre', id: 'about' },
    { label: 'Projetos', id: 'projects' },
    { label: 'Habilidades', id: 'skills' },
    { label: 'Contato', id: 'contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DEV</span>
            </div>
            <span className="font-bold text-gray-900">Portfolio</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <a href="https://github.com/jardelMessias39" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <a href="https://www.linkedin.com/in/jardel-messias-desenvolvedor" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <a href="mailto:jardel.messias.dev@gmail.com">
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <Button 
                onClick={onChatOpen}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Converse Comigo
              </Button>
            </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={onChatOpen}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Converse Comigo
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;