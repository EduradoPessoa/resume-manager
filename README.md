# Resume Manager

Um aplicativo web moderno para criar e gerenciar currículos profissionais de forma fácil e elegante.

## 🚀 Funcionalidades

- ✨ Interface moderna e responsiva com Tailwind CSS
- 🔐 Sistema de autenticação de usuários
- 📝 Criação e edição de currículos
- 📱 Design responsivo para todas as telas
- 🎨 Templates profissionais
- 🖨️ Exportação para PDF
- 💾 Salvamento automático
- 🔄 Sincronização entre dispositivos

## 🛠️ Tecnologias Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- React Hook Form
- date-fns
- Vite

## 📦 Pré-requisitos

- Node.js 16+
- npm ou yarn

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/resume-manager.git
cd resume-manager
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse o aplicativo em `http://localhost:5173`

## 📝 Estrutura do Projeto

```
resume-manager/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── contexts/       # Contextos do React
│   ├── pages/          # Páginas da aplicação
│   ├── services/       # Serviços e APIs
│   ├── types/          # Tipos TypeScript
│   └── utils/          # Funções utilitárias
├── public/            # Arquivos estáticos
└── ...
```

## 🔒 Autenticação

O sistema utiliza autenticação baseada em localStorage para desenvolvimento. Em produção, recomenda-se implementar um backend seguro com JWT.

### Usuário de Teste
- Email: hzimm@phoenyx.com.br
- Senha: 123456

## 📋 Funcionalidades por Página

### Landing Page
- Apresentação do produto
- Links para login e registro
- Informações sobre planos

### Dashboard
- Lista de currículos criados
- Botão para criar novo currículo
- Opções de edição e exclusão

### Editor de Currículo
- Formulário em etapas
- Informações pessoais
- Experiência profissional
- Educação
- Habilidades
- Preview em tempo real

### Visualização
- Preview do currículo
- Opção de impressão/PDF
- Compartilhamento

## 🎨 Personalização

O projeto usa Tailwind CSS para estilização. As cores principais podem ser customizadas em `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      navy: {
        DEFAULT: '#1a237e',
        dark: '#0d1b60',
        light: '#534bae'
      }
    }
  }
}
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@phoenyx.com.br ou abra uma issue no GitHub.

## 🔄 Últimas Atualizações

### v0.2.0 (06/01/2025)
- ✨ Adicionado suporte a múltiplos templates
- 🔐 Melhorado sistema de autenticação
- 🎨 Atualizado design com Tailwind CSS
- 🐛 Correções de bugs e melhorias de performance

### v0.1.0 (Inicial)
- 🚀 Lançamento inicial
- 📝 Funcionalidades básicas de criação de currículo
- 👤 Sistema básico de usuários
