# Resume Manager

Resume Manager é uma aplicação SaaS inovadora para criar e gerenciar currículos. Com uma interface intuitiva, oferece templates personalizáveis, armazenamento seguro em banco de dados e geração fácil de currículos. Os usuários podem enviar currículos diretamente, criar cartas de apresentação e acompanhar candidaturas, maximizando a eficiência e as chances de sucesso na busca por emprego.

## 🚀 Funcionalidades

- ✨ Interface moderna e responsiva com Tailwind CSS
- 📝 Editor de currículo passo a passo
- 💾 Armazenamento local com SQLite
- 🎨 Templates profissionais personalizáveis
  - Template Moderno com barra lateral
  - Template Minimalista limpo e elegante
- 📄 Exportação para PDF com margens otimizadas
- 📱 Design responsivo para todas as telas
- 🌍 Suporte a formatos de data localizados (BR/US)

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router DOM
  - html2pdf.js
  - TinyMCE (Editor Rich Text)

- **Backend**:
  - SQLite
  - Better-SQLite3

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/EduradoPessoa/resume-manager.git
```

2. Instale as dependências:
```bash
cd resume-manager
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse `http://localhost:5173` no seu navegador

## 🏗️ Estrutura do Projeto

```
src/
  ├── components/     # Componentes React reutilizáveis
  │   ├── common/     # Componentes compartilhados
  │   ├── forms/      # Formulários do currículo
  │   └── templates/  # Templates de currículo
  ├── pages/          # Páginas da aplicação
  ├── services/       # Serviços (banco de dados, etc)
  ├── styles/         # Estilos e temas
  ├── types/          # Definições de tipos TypeScript
  └── utils/          # Funções utilitárias
```

## 🎯 Status do Projeto

### Implementado
- ✅ Estrutura base do projeto
- ✅ Configuração do Tailwind CSS
- ✅ Sistema de roteamento
- ✅ Formulários de criação de currículo
- ✅ Integração com SQLite
- ✅ Componentes base (PersonalInfo, Experience, Education, Skills)
- ✅ Templates de currículo (Moderno e Minimalista)
- ✅ Sistema de exportação para PDF
- ✅ Editor Rich Text para descrições
- ✅ Upload de foto de perfil
- ✅ Suporte a formatos de data localizados
- ✅ Margens otimizadas para impressão

## 🗺️ Roadmap

### Próximas Funcionalidades
- 🔲 Criação de cartas de apresentação
- 🔲 Sistema de acompanhamento de candidaturas
- 🔲 Envio direto de currículos
- 🔲 Sistema de autenticação de usuários
- 🔲 Dashboard personalizado
- 🔲 Análise de currículo com IA
- 🔲 Sugestões de melhorias baseadas em IA
- 🔲 Integração com plataformas de emprego
- 🔲 Sistema de backup na nuvem
- 🔲 Versão mobile do aplicativo

### Melhorias Técnicas Planejadas
- 🔲 Testes unitários e de integração
- 🔲 CI/CD pipeline
- 🔲 Otimização de performance
- 🔲 PWA (Progressive Web App)
- 🔲 Internacionalização (i18n)
- 🔲 Tema escuro/claro
- 🔲 Acessibilidade (WCAG)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuindo

Contribuições são sempre bem-vindas! Por favor, leia o guia de contribuição primeiro.
