import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>

      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar o Resume Manager, você concorda em cumprir estes Termos de Uso.
            Se você não concordar com qualquer parte destes termos, não poderá usar nossos serviços.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
          <p>
            O Resume Manager é uma plataforma que permite aos usuários criar, gerenciar e
            compartilhar currículos profissionais. Oferecemos templates e ferramentas
            para ajudar na criação de currículos eficazes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Conta do Usuário</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Você é responsável por manter a confidencialidade de sua senha e conta.
            </li>
            <li>
              Você é responsável por todas as atividades que ocorrem em sua conta.
            </li>
            <li>
              Você deve notificar-nos imediatamente sobre qualquer uso não autorizado.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Uso Aceitável</h2>
          <p>
            Você concorda em não usar o Resume Manager para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violar leis ou regulamentos</li>
            <li>Publicar informações falsas ou enganosas</li>
            <li>Interferir com a segurança do serviço</li>
            <li>Distribuir malware ou outros códigos maliciosos</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo fornecido pelo Resume Manager, incluindo logos, designs,
            textos e templates, é protegido por direitos autorais. Você não pode copiar,
            modificar ou distribuir este conteúdo sem autorização.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cancelamento</h2>
          <p>
            Você pode cancelar sua conta a qualquer momento. Após o cancelamento,
            seus dados serão tratados conforme nossa Política de Privacidade.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitação de Responsabilidade</h2>
          <p>
            O Resume Manager não se responsabiliza por:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Perda de dados</li>
            <li>Interrupções do serviço</li>
            <li>Danos indiretos ou consequentes</li>
            <li>Conteúdo gerado pelos usuários</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento.
            Alterações significativas serão notificadas aos usuários.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Lei Aplicável</h2>
          <p>
            Estes termos são regidos pelas leis do Brasil. Qualquer disputa será
            resolvida nos tribunais de São Paulo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contato</h2>
          <p>
            Para questões sobre estes termos, entre em contato através do email:
            suporte@phoenyx.com.br
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
