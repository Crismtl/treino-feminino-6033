"use client"

import { useState } from 'react'
import { Check, Star, Users, Clock, Shield, ArrowRight, X } from 'lucide-react'

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            FitGlow
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Começar Agora
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full text-sm mb-8">
            <Star className="w-4 h-4 mr-2" />
            Mais de 10.000 pessoas transformaram suas vidas
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transforme Seu Corpo em
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 90 Dias</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            O método completo que já ajudou milhares de pessoas a conquistarem o corpo dos sonhos, 
            com treinos personalizados e nutrição inteligente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-2xl"
            >
              Quero Transformar Meu Corpo
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            <div className="text-gray-400 text-sm">
              ⚡ Acesso imediato • 🔒 Garantia de 7 dias
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>+10.000 alunos</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              <span>4.9/5 estrelas</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>Garantia total</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="px-4 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            O Que Você Vai Conquistar
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Corpo Definido",
                description: "Perca gordura e ganhe músculos com nosso método científico comprovado",
                icon: "💪"
              },
              {
                title: "Energia Máxima",
                description: "Sinta-se mais disposto e energizado todos os dias da semana",
                icon: "⚡"
              },
              {
                title: "Autoestima Elevada",
                description: "Recupere sua confiança e se sinta incrível na sua própria pele",
                icon: "✨"
              },
              {
                title: "Hábitos Saudáveis",
                description: "Desenvolva uma rotina sustentável que dura para toda a vida",
                icon: "🎯"
              },
              {
                title: "Resultados Rápidos",
                description: "Veja mudanças visíveis já nas primeiras 2 semanas",
                icon: "🚀"
              },
              {
                title: "Suporte Total",
                description: "Acompanhamento personalizado durante toda sua jornada",
                icon: "🤝"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oferta Especial */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm p-12 rounded-3xl border border-purple-500/30">
            <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Oferta por tempo limitado
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comece Sua Transformação
              <span className="text-purple-400"> Hoje</span>
            </h2>
            
            <div className="mb-8">
              <div className="text-gray-400 text-lg line-through mb-2">De R$ 197,00</div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                R$ 29<span className="text-3xl">,97</span>
              </div>
              <div className="text-purple-300 text-xl">por mês durante 3 meses</div>
              <div className="text-gray-400 text-sm mt-2">Total: R$ 89,91 (economia de R$ 107,09)</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="space-y-3">
                {[
                  "Treinos personalizados para seu biotipo",
                  "Plano nutricional completo",
                  "App exclusivo com acompanhamento",
                  "Suporte direto com especialistas"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  "Receitas práticas e saborosas",
                  "Vídeos explicativos detalhados",
                  "Comunidade exclusiva de alunos",
                  "Garantia de 7 dias ou seu dinheiro de volta"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl mb-4"
            >
              Quero Começar Agora
            </button>
            
            <div className="text-gray-400 text-sm">
              🔒 Pagamento 100% seguro • ⚡ Acesso imediato
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="px-4 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Histórias de Sucesso
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                result: "Perdeu 15kg em 3 meses",
                text: "Nunca pensei que conseguiria, mas o método realmente funciona! Me sinto uma nova pessoa.",
                rating: 5
              },
              {
                name: "João Santos",
                result: "Ganhou 8kg de massa muscular",
                text: "Os treinos são incríveis e a alimentação é muito prática. Recomendo para todos!",
                rating: 5
              },
              {
                name: "Ana Costa",
                result: "Transformação completa",
                text: "Não foi só o corpo que mudou, minha autoestima e energia aumentaram muito!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-purple-400 text-sm">{testimonial.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "Como funciona o pagamento?",
                answer: "Você paga R$ 29,97 por mês durante 3 meses. Total de R$ 89,91 com economia de mais de 50%."
              },
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim! Você tem 7 dias de garantia total. Se não ficar satisfeito, devolvemos 100% do seu dinheiro."
              },
              {
                question: "Funciona para iniciantes?",
                answer: "Absolutamente! Nosso método é adaptado para todos os níveis, do iniciante ao avançado."
              },
              {
                question: "Preciso de equipamentos caros?",
                answer: "Não! Temos opções de treino para casa e academia. Você escolhe o que funciona melhor para você."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-4 py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sua Transformação Começa Agora
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Não deixe para amanhã o que você pode começar hoje. 
            Milhares já transformaram suas vidas, agora é sua vez!
          </p>
          
          <button 
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl mb-6"
          >
            Começar Minha Transformação
          </button>
          
          <div className="text-gray-400">
            ⏰ Oferta válida por tempo limitado • 🔒 Compra 100% segura
          </div>
        </div>
      </section>

      {/* Modal de Checkout */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Finalizar Compra
              </h3>
              
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  R$ 29,97/mês
                </div>
                <div className="text-gray-600">por 3 meses</div>
                <div className="text-sm text-gray-500 mt-2">
                  Total: R$ 89,91 (economia de R$ 107,09)
                </div>
              </div>
              
              <div className="space-y-3 text-left mb-6">
                {[
                  "✅ Acesso imediato ao app",
                  "✅ Treinos personalizados",
                  "✅ Plano nutricional completo",
                  "✅ Suporte especializado",
                  "✅ Garantia de 7 dias"
                ].map((item, index) => (
                  <div key={index} className="text-gray-700">{item}</div>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
                Finalizar Compra
              </button>
              
              <div className="text-xs text-gray-500 mt-4">
                🔒 Pagamento processado com segurança
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}