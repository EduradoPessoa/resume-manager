import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
          <p>
            Esta Política de Privacidade descreve como o Resume Manager coleta, usa,
            armazena e protege suas informações pessoais, em conformidade com a
            Lei Geral de Proteção de Dados (LGPD).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Dados que Coletamos</h2>
          <h3 className="text-xl font-semibold mb-2">2.1 Dados fornecidos por você:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nome completo</li>
            <li>Endereço de email</li>
            <li>Número de telefone</li>
            <li>Informações profissionais do currículo</li>
            <li>Foto de perfil (opcional)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Dados coletados automaticamente:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Endereço IP</li>
            <li>Dados de uso do serviço</li>
            <li>Informações do dispositivo</li>
            <li>Cookies e tecnologias similares</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Como Usamos seus Dados</h2>
          <p>Utilizamos seus dados pessoais para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer e melhorar nossos serviços</li>
            <li>Personalizar sua experiência</li>
            <li>Enviar comunicações importantes sobre o serviço</li>
            <li>Processar pagamentos</li>
            <li>Prevenir fraudes e abusos</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Base Legal para Processamento</h2>
          <p>Processamos seus dados com base em:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consentimento explícito</li>
            <li>Execução de contrato</li>
            <li>Obrigações legais</li>
            <li>Interesses legítimos</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Compartilhamento de Dados</h2>
          <p>
            Podemos compartilhar seus dados com:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prestadores de serviços (processamento de pagamento, hospedagem)</li>
            <li>Autoridades quando legalmente requerido</li>
            <li>Parceiros de negócios (com seu consentimento)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos</h2>
          <p>
            De acordo com a LGPD, você tem direito a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acessar seus dados</li>
            <li>Corrigir dados incorretos</li>
            <li>Solicitar a exclusão de dados</li>
            <li>Revogar consentimento</li>
            <li>Solicitar portabilidade dos dados</li>
            <li>Ser informado sobre compartilhamento</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Segurança dos Dados</h2>
          <p>
            Implementamos medidas técnicas e organizacionais para proteger seus dados:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Criptografia em trânsito e em repouso</li>
            <li>Controles de acesso</li>
            <li>Monitoramento de segurança</li>
            <li>Backups regulares</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Retenção de Dados</h2>
          <p>
            Mantemos seus dados apenas pelo tempo necessário para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fornecer nossos serviços</li>
            <li>Cumprir obrigações legais</li>
            <li>Resolver disputas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Cookies e Rastreamento</h2>
          <p>
            Usamos cookies e tecnologias similares para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Manter sua sessão</li>
            <li>Lembrar suas preferências</li>
            <li>Analisar o uso do serviço</li>
            <li>Personalizar conteúdo</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Alterações na Política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Notificaremos sobre
            mudanças significativas por email ou através do site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Contato</h2>
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre privacidade, contate
            nosso Encarregado de Proteção de Dados (DPO):
          </p>
          <ul className="list-none space-y-2">
            <li>Email: dpo@phoenyx.com.br</li>
            <li>Telefone: (11) 1234-5678</li>
            <li>Endereço: Rua Exemplo, 123 - São Paulo, SP</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
