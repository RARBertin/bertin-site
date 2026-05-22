import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import arcelorLogo from './arcelor.png'

function BertinLandingPage() {
  return (
    <div className="min-h-screen bg-[#3D3935] text-white font-sans">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D3935] via-[#2d2a27] to-black opacity-95" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-36 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6 inline-block border border-[#FF5C00]/40 rounded-full px-4 py-1 text-sm text-[#FF5C00] tracking-wide uppercase">
              Ferro • Aço • Soluções
            </div>

            <h1 className="text-5xl lg:text-7xl font-black italic tracking-tight leading-none mb-8">
              BERTIN
            </h1>

            <p className="text-xl lg:text-2xl text-[#C9CDD0] leading-relaxed max-w-2xl mb-10">
              Empresa familiar com mais de 30 anos no mercado catarinense,
              atuando no fornecimento de ferro e aço para construção civil,
              indústria, agropecuária, atacado e varejo.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contato"
                className="bg-[#FF5C00] hover:opacity-90 transition px-8 py-4 rounded-2xl text-lg font-semibold text-black shadow-2xl"
              >
                Fale conosco
              </a>

              <a
                href="https://login.bertin.com.br"
                className="text-sm text-[#7C878E] hover:text-[#FF5C00] transition px-2 py-2"
              >
                Acesso interno
              </a>
            </div>
          </div>

          <div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">

                <div className="bg-black/20 rounded-2xl p-6">
                  <div className="text-4xl font-black text-[#FF5C00] mb-2">
                    +30
                  </div>

                  <div className="text-[#C9CDD0]">
                    Anos de mercado
                  </div>
                </div>

                <div className="bg-black/20 rounded-2xl p-6">
                  <div className="text-4xl font-black text-[#FF5C00] mb-2">
                    +150
                  </div>

                  <div className="text-[#C9CDD0]">
                    Cidades catarinenses atendidas
                  </div>
                </div>

                <div className="bg-black/20 rounded-2xl p-6">
                  <div className="text-4xl font-black text-[#FF5C00] mb-2">
                    100+
                  </div>

                  <div className="text-[#C9CDD0]">
                    Profissionais envolvidos
                  </div>
                </div>

                <div className="bg-black/20 rounded-2xl p-6">
                  <div className="text-4xl font-black text-[#FF5C00] mb-2">
                    SC
                  </div>

                  <div className="text-[#C9CDD0]">
                    Joinville • Chapecó
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-[#FF5C00] mb-4">
              Sobre a Bertin
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Tradição, estrutura e atendimento próximo ao cliente.
            </h2>
          </div>

          <div className="space-y-6 text-lg text-[#C9CDD0] leading-relaxed">
            <p>
              Atuamos no fornecimento e distribuição de ferro e aço para
              construção civil, indústria, agropecuária, atacado e varejo,
              com operações em Joinville e Chapecó.
            </p>

            <p>
              Contamos com estrutura operacional integrada, atendimento próximo
              e soluções em corte e dobra voltadas especialmente para a
              construção civil e o setor industrial.
            </p>
          </div>

        </div>
      </section>

      {/* PARCERIA ARCELORMITTAL */}
      <section className="bg-[#FF5C00] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <img
              src={arcelorLogo}
              alt="ArcelorMittal"
              className="w-[260px] lg:w-[420px] opacity-95"
            />

            <div className="mt-8 h-[2px] w-32 bg-white/40 rounded-full" />
          </div>

          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-white/70 mb-4">
              Parceria estratégica
            </div>

            <h2 className="text-4xl lg:text-6xl font-black leading-tight mb-8">
              +20 anos
              <br />
              de parceria.
            </h2>

            <p className="text-xl lg:text-2xl leading-relaxed text-white/90 max-w-2xl">
              Distribuidor exclusivo ArcelorMittal no mercado catarinense,
              atuando com fornecimento de aço para construção civil,
              indústria e operações estratégicas.
            </p>

            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Relacionamento consolidado ao longo de décadas com foco em
              confiança, estrutura operacional e continuidade.
            </p>
          </div>

        </div>
      </section>

      {/* SEGMENTOS */}
      <section className="border-t border-white/10 bg-black/10">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-sm uppercase tracking-[0.2em] text-[#FF5C00] mb-4 text-center">
            Segmentos atendidos
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            Soluções para diferentes setores da indústria.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              'Construção Civil',
              'Industrial',
              'Atacado e Varejo',
              'Corte & Dobra',
            ].map((item) => (

              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-[#FF5C00]/40 transition"
              >
                <div className="text-2xl font-bold mb-3">
                  {item}
                </div>

                <div className="text-[#C9CDD0]">
                  Atendimento com foco em qualidade,
                  prazo e transparência.
                </div>
              </div>

            ))}

          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="bg-[#FF5C00] text-black">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Vamos conversar!
          </h2>

          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-80">
            Entre em contato para conhecer nossas soluções,
            estrutura e formas de atendimento.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="mailto:contato@bertin.com.br"
              className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold"
            >
              contato@bertin.com.br
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">

            <div className="bg-black/10 rounded-3xl p-8">
              <div className="text-sm uppercase tracking-[0.2em] mb-3 opacity-70">
                DBA Joinville
              </div>

              <div className="text-3xl font-black mb-3">
                (47) 3451-4888
              </div>

              <div className="opacity-80 mb-6">
                Atendimento e vendas • WhatsApp
              </div>

              <a
                href="https://wa.me/554734514888"
                className="inline-block bg-black text-white px-6 py-3 rounded-2xl font-semibold"
              >
                Chamar no WhatsApp
              </a>
            </div>

            <div className="bg-black/10 rounded-3xl p-8">
              <div className="text-sm uppercase tracking-[0.2em] mb-3 opacity-70">
                DBA Chapecó
              </div>

              <div className="text-3xl font-black mb-3">
                (47) 3319-9600
              </div>

              <div className="opacity-80 mb-6">
                Atendimento e vendas • WhatsApp
              </div>

              <a
                href="https://wa.me/554733199600"
                className="inline-block bg-black text-white px-6 py-3 rounded-2xl font-semibold"
              >
                Chamar no WhatsApp
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

ReactDOM.render(
  <BertinLandingPage />,
  document.getElementById('root')
)