import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-navy to-blue-600 text-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Resume Manager</div>
          <div className="space-x-4">
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link 
              to="/register" 
              className="bg-white text-navy px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Começar Grátis
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Crie Currículos Profissionais em Minutos
              </h1>
              <p className="text-xl mb-8">
                Layouts modernos e atraentes para destacar suas habilidades. 
                Crie quantos currículos quiser de forma rápida e inteligente.
              </p>
              <Link 
                to="/register" 
                className="bg-white text-navy px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
              >
                Comece Agora - É Grátis!
              </Link>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <img 
                src="/images/hero-resume.png" 
                alt="Resume Preview" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o Resume Manager?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-4">Layouts Modernos</h3>
              <p>Templates profissionais e atualizados regularmente para manter seu currículo sempre atraente.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-4">Rápido e Fácil</h3>
              <p>Interface intuitiva que permite criar currículos profissionais em poucos minutos.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-4">Ilimitado</h3>
              <p>Crie quantos currículos desejar e mantenha diferentes versões para cada oportunidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Planos de Apoio</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-center mb-4">Plano Profissional</h3>
                <div className="text-center mb-8">
                  <span className="text-4xl font-bold">R$ 9</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <ul className="space-y-4 mb-8">
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
                <Link 
                  to="/register" 
                  className="block w-full bg-navy text-white text-center py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Começar Agora
                </Link>
              </div>
            </div>
            <p className="text-center mt-6 text-gray-600">
              Experimente grátis! Você pode criar e visualizar currículos sem compromisso.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Resume Manager</h4>
              <p className="text-gray-300">
                Transforme sua busca por emprego com currículos profissionais e modernos.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-white">Sobre</Link></li>
                <li><Link to="/terms" className="hover:text-white">Termos de Uso</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacidade</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <p className="text-gray-300">
                Dúvidas? Entre em contato conosco.
                <br />
                suporte@resumemanager.com.br
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Resume Manager. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
