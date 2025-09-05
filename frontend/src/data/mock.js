// Mock data para o portfólio

export const profileData = {
  name: "Jardel Messias",
  title: "Desenvolvedor Júnior Full Stack",
  bio: "Transformando ideias em código desde junho de 2025. Apaixonado por criar soluções que fazem a diferença na vida das pessoas.",
  company: "DevClub",
  startDate: "1 de junho de 2025",
  education: "Licenciatura em Informática - UNIT (2019)",
  location: "Brasil",
  phone: "(79) 99806-1093",
  email: "jardel.messias.dev@gmail.com",
  linkedin: "www.linkedin.com/in/jardel-messias-desenvolvedor",
  github: "https://github.com/jardelMessias39"
};

export const skills = {
  current: ["HTML", "CSS", "JavaScript"],
  learning: ["React", "Node.js"],
  tools: ["Git", "VS Code", "Figma"]
};

export const projects = [
  {
    id: 1,
    title: "Jogo Embaralhado (Shuffle)",
    category: "Game Development",
    description: "Quebra-cabeça interativo onde o usuário escolhe uma imagem e define em quantas partes quer dividi-la para depois remontar. Inclui diferentes imagens temáticas do Brasil.",
    features: [
      "Múltiplas opções de divisão (4x2, 3x3, etc.)",
      "Imagens temáticas brasileiras", 
      "Interface intuitiva de drag-and-drop",
      "Sistema de pontuação e tempo"
    ],
    objective: "Desenvolver concentração, percepção visual e coordenação motora",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "https://customer-assets.emergentagent.com/job_prompt-portfolio-bot/artifacts/q4dc5ygc_Captura%20de%20tela%202025-09-05%20121222.png",
    demo: "#",
    github: "https://github.com/jardelMessias39"
  },
  {
    id: 2,
    title: "Chuva de Palavras",
    category: "Game Development", 
    description: "Jogo de digitação espacial onde palavras caem do céu como uma chuva cósmica. O jogador deve digitá-las rapidamente antes que atinjam o solo.",
    features: [
      "Visual espacial com efeito de estrelas",
      "Sistema de pontuação dinâmico",
      "Aumento progressivo de velocidade",
      "Interface moderna e imersiva",
      "Contador de tempo e recordes"
    ],
    objective: "Desenvolver velocidade de digitação, reflexos e coordenação motora",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "https://customer-assets.emergentagent.com/job_prompt-portfolio-bot/artifacts/51kl3uus_Captura%20de%20tela%202025-08-19%20034940.png",
    demo: "#",
    github: "https://github.com/jardelMessias39"
  },
  {
    id: 3,
    title: "Site Comidas Típicas do Brasil",
    category: "Web Development",
    description: "Plataforma gastronômica dedicada à culinária brasileira, apresentando pratos típicos de diferentes regiões com receitas de chefs renomados.",
    features: [
      "Catálogo de comidas típicas regionais",
      "Seções organizadas: bebidas, doces, receitas",
      "Design responsivo e atrativo",
      "Sistema de cadastro e login",
      "Interface intuitiva para navegação"
    ],
    objective: "Preservar e divulgar a rica cultura gastronômica brasileira",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "https://customer-assets.emergentagent.com/job_prompt-portfolio-bot/artifacts/dg8hmwun_Captura%20de%20tela%202025-07-03%20010054.png",
    demo: "#",
    github: "https://github.com/jardelMessias39"
  },
  {
    id: 4,
    title: "Gerador de Link do WhatsApp",
    category: "Web Development",
    description: "Ferramenta prática para gerar links diretos do WhatsApp, facilitando o contato comercial e pessoal sem precisar salvar números na agenda.",
    features: [
      "Geração automática de links wa.me",
      "Campo para número com DDD",
      "Mensagem personalizada opcional",
      "Interface limpa e funcional",
      "Copiar link com um clique"
    ],
    objective: "Simplificar a comunicação via WhatsApp para negócios e uso pessoal",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "https://customer-assets.emergentagent.com/job_prompt-portfolio-bot/artifacts/pagr3vll_Captura%20de%20tela%202025-08-26%20022956.png",
    demo: "#",
    github: "https://github.com/jardelMessias39"
  }
];

export const experience = [
  {
    role: "Desenvolvedor Júnior",
    company: "DevClub",
    period: "Jun 2025 - Presente",
    description: "Desenvolvimento de projetos web e jogos educativos com foco em acessibilidade e experiência do usuário."
  }
];

export const chatbotResponses = {
  greeting: "Olá! Sou o assistente virtual do portfólio. Posso te contar sobre a experiência, projetos e objetivos como desenvolvedor. O que gostaria de saber?",
  
  experience: "Comecei na programação em 1 de junho de 2025 na empresa DevClub. Sou formado em Licenciatura em Informática pela UNIT desde 2019. Atualmente estou focado em aprender HTML, CSS e JavaScript, com planos de estudar React e Node.js em breve.",
  
  projects: "Já desenvolvi 3 projetos principais: o Jogo Embaralhado (quebra-cabeça interativo), Chuva de Palavras (jogo de digitação) e um Site de Turismo com foco em acessibilidade. Cada projeto foi pensado para gerar impacto positivo na vida das pessoas.",
  
  motivation: "O que me fascina na programação é ver códigos se transformarem em algo visual e funcional. A capacidade de transformar uma ideia em realidade através do código é o que me motiva todos os dias. Quero fazer parte de equipes que desenvolvem projetos que melhoram a vida das pessoas.",
  
  goals: "Meu objetivo é me tornar um bom programador e profissional, sempre correndo atrás do conhecimento. Quero participar de equipes que fazem a diferença no mundo, desenvolvendo projetos que tragam produtividade e melhorem a vida das pessoas.",
  
  skills: "Atualmente estou estudando HTML, CSS e JavaScript. Meu próximo passo é aprender React e Node.js para me tornar um desenvolvedor full stack completo.",
  
  default: "Desculpe, não entendi sua pergunta. Você pode me perguntar sobre experiência, projetos, motivação, objetivos ou habilidades!"
};

export const testimonials = [
  {
    name: "Equipe DevClub",
    role: "Colegas de Trabalho",
    content: "Um desenvolvedor dedicado e sempre disposto a aprender. Seus projetos mostram criatividade e preocupação com acessibilidade.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
  },
  {
    name: "Professor Orientador",
    role: "UNIT - Licenciatura em Informática", 
    content: "Demonstrou excelente capacidade de transformar conceitos teóricos em soluções práticas e acessíveis.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  }
];