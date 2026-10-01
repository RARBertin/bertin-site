import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import arcelorLogo from './arcelor.png'
import vergalhaoTopo from './vergalhao-topo.webp'
import vergalhaoDiagonal from './vergalhao-diagonal.webp'

// Sistemas internos disponíveis no menu "Acesso interno" — adicione novas
// linhas aqui conforme novos apps forem entrando no ar.
const SISTEMAS_INTERNOS = [
  { nome: 'NetSuite', href: 'https://login.bertin.com.br' },
  { nome: 'Portal', href: 'https://portal.bertin.com.br' },
  { nome: 'Meu RH', href: 'https://rh.bertin.com.br' },
]

function BertinLandingPage() {
  const [menuAberto, setMenuAberto] = useState(false)
  const acessoRef = useRef(null)
  const sobreRef = useRef(null)

  // Parallax leve do topo e entrada do vergalhão do "Sobre". Só grava duas
  // variáveis CSS por quadro; quem pede menos movimento fica com tudo parado.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const raiz = document.documentElement
    let pendente = false
    const atualiza = () => {
      pendente = false
      raiz.style.setProperty('--rolagem', Math.min(window.scrollY, 900))
      const caixa = sobreRef.current?.getBoundingClientRect()
      if (caixa) {
        const p = Math.max(0, Math.min(1, (window.innerHeight - caixa.top) / (window.innerHeight * 0.9)))
        sobreRef.current.style.setProperty('--p', p.toFixed(3))
      }
    }
    const rolou = () => { if (!pendente) { pendente = true; requestAnimationFrame(atualiza) } }
    window.addEventListener('scroll', rolou, { passive: true })
    atualiza()
    return () => window.removeEventListener('scroll', rolou)
  }, [])

  // Fecha ao tocar fora ou com Esc. Antes fechava pelo onBlur do botão, e no
  // iPhone o botão não recebe foco no toque: o menu ficava aberto.
  useEffect(() => {
    if (!menuAberto) return
    const fora = (e) => { if (!acessoRef.current?.contains(e.target)) setMenuAberto(false) }
    const tecla = (e) => { if (e.key === 'Escape') setMenuAberto(false) }
    document.addEventListener('pointerdown', fora)
    document.addEventListener('keydown', tecla)
    return () => {
      document.removeEventListener('pointerdown', fora)
      document.removeEventListener('keydown', tecla)
    }
  }, [menuAberto])

  return (
    <div className="min-h-screen bg-[#3D3935] text-white font-sans">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D3935] via-[#2d2a27] to-black opacity-95" />
        {/* Close do vergalhão ArcelorMittal, quase apagado, sumindo por trás do texto */}
        <div className="vergalhao-topo" style={{ backgroundImage: `url(${vergalhaoTopo})` }} aria-hidden="true" />

        {/* Acesso interno — canto superior direito */}
        <div
          ref={acessoRef}
          className="absolute top-6 right-6 z-20"
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setMenuAberto(false) }}
        >
          <button
            onClick={() => setMenuAberto((v) => !v)}
            aria-expanded={menuAberto}
            className="text-sm text-[#7C878E] hover:text-[#FF5C00] transition px-3 py-2 inline-flex items-center gap-1"
          >
            Acesso interno
            <span className="text-xs">{menuAberto ? '▴' : '▾'}</span>
          </button>

          {/* Sempre montado: abre crescendo do canto do botão e fecha pelo mesmo caminho (index.css) */}
          <div
            className="menu-acesso absolute right-0 mt-2 w-52 bg-[#2d2a27] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20"
            data-aberto={menuAberto}
          >
              {SISTEMAS_INTERNOS.map((sistema) => (
                <a
                  key={sistema.nome}
                  href={sistema.href}
                  className="block px-4 py-3 text-sm text-[#C9CDD0] hover:bg-white/5 hover:text-[#FF5C00] transition"
                >
                  {sistema.nome}
                </a>
              ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-36 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="entra mb-6 inline-block border border-[#FF5C00]/40 rounded-full px-4 py-1 text-sm text-[#FF5C00] tracking-wide uppercase" style={{ '--i': 0 }}>
              Ferro • Aço • Soluções
            </div>

            <h1 className="entra text-5xl lg:text-7xl font-black italic tracking-tight leading-none mb-8" style={{ '--i': 1 }}>
              BERTIN
            </h1>

            <p className="entra text-xl lg:text-2xl text-[#C9CDD0] leading-relaxed max-w-2xl mb-10" style={{ '--i': 2 }}>
              Empresa familiar com mais de 30 anos no mercado catarinense,
              atuando no fornecimento de ferro e aço para construção civil,
              indústria, agropecuária, atacado e varejo.
            </p>

            <div className="entra flex flex-wrap gap-4" style={{ '--i': 3 }}>
              <a
                href="#contato"
                className="botao botao-relevo bg-[#FF5C00] hover:opacity-90 px-8 py-4 rounded-2xl text-lg font-semibold text-black"
              >
                Fale conosco
              </a>
            </div>
          </div>

          <div>
            <div className="entra rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur p-8 shadow-2xl" style={{ '--i': 4 }}>
              <div className="grid grid-cols-2 gap-6">

                <div className="entra entra-numero bg-black/20 rounded-2xl p-6" style={{ '--j': 0 }}>
                  <div className="text-4xl font-black text-[#FF5C00] mb-2">
                    +30
                  </div>

                  <div className="text-[#C9CDD0]">
                    Anos de mercado
                  </div>
                </div>

                <div className="entra entra-numero bg-black/20 rounded-2xl p-6" style={{ '--j': 1 }}>
                  <div className="text-4xl font-black text-[#FF5C00] mb-2">
                    +150
                  </div>

                  <div className="text-[#C9CDD0]">
                    Cidades catarinenses atendidas
                  </div>
                </div>

                <div className="entra entra-numero bg-black/20 rounded-2xl p-6" style={{ '--j': 2 }}>
                  <div className="text-4xl font-black text-[#FF5C00] mb-2">
                    100+
                  </div>

                  <div className="text-[#C9CDD0]">
                    Profissionais envolvidos
                  </div>
                </div>

                <div className="entra entra-numero bg-black/20 rounded-2xl p-6" style={{ '--j': 3 }}>
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
      <section ref={sobreRef} className="relative overflow-hidden border-t border-white/10">
        {/* Vergalhão em diagonal, como no timbrado: entra pela direita ao rolar */}
        <img src={vergalhaoDiagonal} alt="" aria-hidden="true" className="vergalhao-diagonal" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:pb-36 grid lg:grid-cols-2 gap-16 items-center">

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
      <section className="segmentos border-t border-white/10 bg-black/10">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-sm uppercase tracking-[0.2em] text-[#FF5C00] mb-4 text-center">
            Segmentos atendidos
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            Soluções para diferentes setores da indústria.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              { nome: 'Construção Civil', descricao: 'Ferro e aço para todas as etapas da obra, com volume e prazo de entrega que acompanham o seu cronograma.' },
              { nome: 'Industrial', descricao: 'Fornecimento constante para linhas de produção, com a qualidade ArcelorMittal que sua indústria exige.' },
              { nome: 'Atacado e Varejo', descricao: 'Do pedido em grande escala à compra pontual — atendimento flexível para atacadistas e varejistas de qualquer porte.' },
              { nome: 'Corte & Dobra', descricao: 'Material cortado e dobrado sob medida, pronto para aplicar — menos etapas, menos desperdício na sua obra.' },
            ].map((item) => (

              <div
                key={item.nome}
                className="segmento rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-[#FF5C00]/40 transition"
              >
                <div className="text-2xl font-bold mb-3">
                  {item.nome}
                </div>

                <div className="text-[#C9CDD0]">
                  {item.descricao}
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
              className="botao botao-relevo-laranja bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold"
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
                className="botao botao-relevo-laranja inline-block bg-black text-white px-6 py-3 rounded-2xl font-semibold"
              >
                Chamar no WhatsApp
              </a>
            </div>

            <div className="bg-black/10 rounded-3xl p-8">
              <div className="text-sm uppercase tracking-[0.2em] mb-3 opacity-70">
                DBA Chapecó
              </div>

              <div className="text-3xl font-black mb-3">
                (49) 3319-9600
              </div>

              <div className="opacity-80 mb-6">
                Atendimento e vendas • WhatsApp
              </div>

              <a
                href="https://wa.me/5549984377092"
                className="botao botao-relevo-laranja inline-block bg-black text-white px-6 py-3 rounded-2xl font-semibold"
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
