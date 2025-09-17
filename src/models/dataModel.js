// Model para gerenciar dados da aplicação
// Simulando dados que normalmente viriam de um banco de dados

// Dados da empresa/projeto para a landing page
const companyInfo = {
  name: "TechSolutions",
  tagline: "Inovação e Tecnologia para o Futuro",
  description:
    "Desenvolvemos soluções tecnológicas inovadoras para empresas que buscam crescer no mundo digital.",
  founded: "2024",
  employees: "50+",
  projects: "200+",
};

// Serviços oferecidos
const categories = [
  {
    id: 1,
    title: "Saladas",
    description:
      "Saladas frescas e variadas, preparadas com ingredientes selecionados.",
    icon: "🥗",
    price: "A partir de R$ 25",
  },
  {
    id: 2,
    title: "Bowls",
    description: "Bowls nutritivos e completos para todas as refeições.",
    icon: "🍲",
    price: "A partir de R$ 30",
  },
  {
    id: 3,
    title: "Snacks Saudáveis",
    description:
      "Snacks práticos e saudáveis para o seu dia a dia.",
    icon: "🍎",
    price: "A partir de R$ 10",
  },
];

// Depoimentos de clientes
const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    company: "StartupXYZ",
    message:
      "Excelente trabalho! Nossa plataforma ficou incrível e nossos usuários adoraram.",
    rating: 5,
    avatar: "MS",
  },
  {
    id: 2,
    name: "João Santos",
    company: "Empresa ABC",
    message:
      "Profissionais competentes e prazo cumprido. Recomendo para todos!",
    rating: 5,
    avatar: "JS",
  },
  {
    id: 3,
    name: "Ana Costa",
    company: "Digital Corp",
    message:
      "Transformaram nossa ideia em realidade. Estamos muito satisfeitos com o resultado.",
    rating: 5,
    avatar: "AC",
  },
];

// Estatísticas da empresa
const stats = [
  { label: "Projetos Concluídos", value: "200+", icon: "✅" },
  { label: "Clientes Satisfeitos", value: "150+", icon: "😊" },
  { label: "Anos de Experiência", value: "5+", icon: "🎯" },
  { label: "Tecnologias Dominadas", value: "20+", icon: "⚡" },
];

class DataModel {
  // Métodos para obter dados
  getCompanyInfo() {
    return companyInfo;
  }

  getCategories() {
    return categories;
  }

  getCategoriesById(id) {
    return services.find((service) => service.id === parseInt(id));
  }

  getTestimonials() {
    return testimonials;
  }

  getStats() {
    return stats;
  }

  // Método para simular dados dinâmicos
  getLandingPageData() {
    return {
      company: this.getCompanyInfo(),
      services: this.getCategories(),
      testimonials: this.getTestimonials(),
      stats: this.getStats(),
    };
  }
}

module.exports = new DataModel();
