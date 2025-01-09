import React from 'react';

interface ConsentTermsProps {
  onConsent: (consents: {
    terms: boolean;
    marketing: boolean;
    analytics: boolean;
    thirdParty: boolean;
  }) => void;
}

const ConsentTerms: React.FC<ConsentTermsProps> = ({ onConsent }) => {
  const [consents, setConsents] = React.useState({
    terms: false,
    marketing: false,
    analytics: false,
    thirdParty: false,
  });

  const handleChange = (field: keyof typeof consents) => {
    setConsents((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consents.terms) {
      alert('Você precisa aceitar os termos de uso para continuar.');
      return;
    }
    onConsent(consents);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Termos de Uso e Privacidade</h2>
        
        <div className="space-y-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={consents.terms}
                onChange={() => handleChange('terms')}
                className="w-4 h-4 border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3">
              <label htmlFor="terms" className="font-medium text-gray-700">
                Aceito os Termos de Uso e Política de Privacidade
              </label>
              <p className="text-sm text-gray-500">
                Ao aceitar, você concorda com nossos termos de uso e política de privacidade.
                Este consentimento é necessário para usar o serviço.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="marketing"
                type="checkbox"
                checked={consents.marketing}
                onChange={() => handleChange('marketing')}
                className="w-4 h-4 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="marketing" className="font-medium text-gray-700">
                Aceito receber comunicações de marketing
              </label>
              <p className="text-sm text-gray-500">
                Você receberá emails sobre novidades, promoções e atualizações do serviço.
                Você pode cancelar a qualquer momento.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="analytics"
                type="checkbox"
                checked={consents.analytics}
                onChange={() => handleChange('analytics')}
                className="w-4 h-4 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="analytics" className="font-medium text-gray-700">
                Aceito o uso de analytics
              </label>
              <p className="text-sm text-gray-500">
                Coletamos dados anônimos de uso para melhorar nosso serviço.
                Nenhuma informação pessoal é compartilhada.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="thirdParty"
                type="checkbox"
                checked={consents.thirdParty}
                onChange={() => handleChange('thirdParty')}
                className="w-4 h-4 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="thirdParty" className="font-medium text-gray-700">
                Aceito o compartilhamento com terceiros
              </label>
              <p className="text-sm text-gray-500">
                Seus dados podem ser compartilhados com parceiros selecionados para
                melhorar sua experiência. Você pode revogar este consentimento a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continuar
        </button>
      </div>
    </form>
  );
};

export default ConsentTerms;
