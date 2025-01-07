import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Upgrade: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleUpgrade = async () => {
    // TODO: Implementar integração com Asaas
    try {
      // Simular redirecionamento para checkout
      console.log('Redirecionando para checkout...')
    } catch (error) {
      console.error('Erro ao processar upgrade:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Desbloqueie Todo o Potencial
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Crie currículos profissionais ilimitados e destaque-se no mercado de trabalho.
          </p>
        </div>

        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  <span className="block">Plano Profissional</span>
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Por apenas R$ 9,00 por mês, você terá acesso a:
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Currículos ilimitados
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Sem marca d'água
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Acesso a todos os templates
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Atualizações regulares
                  </li>
                </ul>
                <div className="mt-8">
                  <div className="rounded-lg shadow-md">
                    <button
                      onClick={handleUpgrade}
                      className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-navy hover:bg-blue-700 transition"
                    >
                      Começar agora por R$ 9,00/mês
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Cancele quando quiser. Sem compromisso.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative -mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img
                className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="/images/resume-preview-premium.png"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Perguntas Frequentes
          </h2>
          <dl className="space-y-8">
            <div>
              <dt className="text-lg font-medium text-gray-900">
                O que acontece se eu cancelar minha assinatura?
              </dt>
              <dd className="mt-2 text-gray-500">
                Você continuará tendo acesso aos seus currículos, mas eles terão uma marca d'água quando exportados para PDF.
                Você pode reativar sua assinatura a qualquer momento para remover a marca d'água.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-gray-900">
                Posso usar o serviço gratuitamente?
              </dt>
              <dd className="mt-2 text-gray-500">
                Sim! Você pode criar e editar currículos gratuitamente. A única diferença é que os PDFs terão uma marca d'água.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-medium text-gray-900">
                Como funciona o pagamento?
              </dt>
              <dd className="mt-2 text-gray-500">
                O pagamento é processado de forma segura através do Asaas. Você pode pagar com cartão de crédito ou boleto bancário.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Upgrade
