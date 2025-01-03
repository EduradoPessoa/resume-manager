# Gerenciador de Currículos SaaS

Uma aplicação web moderna para criar, gerenciar e exportar currículos profissionais em diferentes layouts.

## Tecnologias Utilizadas

- React
- TypeScript
- Material-UI
- Tailwind CSS
- SQLite
- Vite

## Funcionalidades

- Múltiplos layouts de currículo
- Editor intuitivo com preview em tempo real
- Exportação para PDF
- Armazenamento local com SQLite
- Interface responsiva e moderna

## Como Executar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse http://localhost:5173 no seu navegador

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React reutilizáveis
  │   ├── layouts/    # Layouts de currículo
  │   └── shared/     # Componentes compartilhados
  ├── pages/          # Páginas da aplicação
  ├── services/       # Serviços e integrações
  ├── styles/         # Estilos e temas
  ├── types/          # Definições de tipos TypeScript
  └── utils/          # Funções utilitárias
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a versão de produção
- `npm run preview`: Visualiza a versão de produção localmente

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
