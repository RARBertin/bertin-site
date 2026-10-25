import React, { useState, useEffect, useRef } from 'react'
import arcelorLogo from './arcelor.png'
import vergalhaoTopo from './vergalhao-topo.webp'
import vergalhaoDiagonal from './vergalhao-diagonal.webp'
import fotoVergalhao from './produtos/vergalhao.webp'
import fotoCorteDobra from './produtos/corte-e-dobra.webp'
import fotoChapas from './produtos/chapas.webp'
import fotoBobinas from './produtos/bobinas.webp'
import fotoTela from './produtos/tela-soldada.webp'
import fotoTrelica from './produtos/trelica.webp'
import fotoAramePregos from './produtos/arame-pregos.webp'
import OndeAtendemos from './mapa/OndeAtendemos'

// Sistemas internos disponíveis no menu "Acesso interno" — adicione novas
// linhas aqui conforme novos apps forem entrando no ar.
const SISTEMAS_INTERNOS = [
  { nome: 'Portal', href: 'https://portal.bertin.com.br' },
  { nome: 'Meu RH', href: 'https://rh.bertin.com.br' },
]

// O WhatsApp já abre com o pedido escrito: o cliente só completa o que precisa.
const MENSAGEM_COTACAO = encodeURIComponent('Olá! Vim pelo site da Bertin e gostaria de uma cotação.')
const UNIDADES = [
  { nome: 'Unidade Joinville', cidade: 'Joinville', telefone: '(47) 3451-4888', numero: '554734514888' },
  { nome: 'Unidade Chapecó', cidade: 'Chapecó', telefone: '(49) 3319-9600', numero: '554933199600' },
]
const whatsapp = (u) => `https://wa.me/${u.numero}?text=${MENSAGEM_COTACAO}`
const whatsappProduto = (u, produto) =>
  `https://wa.me/${u.numero}?text=${encodeURIComponent(`Olá! Vim pelo site da Bertin e gostaria de uma cotação de ${produto}.`)}`

// Linhas escolhidas pelo Raffael em 25/10/2026 (estratégia v2). Fotos do
// portal Conexão ArcelorMittal, recortadas em 800×500.
const PRODUTOS = [
  { nome: 'Vergalhão CA‑50 e CA‑60', pedido: 'vergalhão CA-50 e CA-60', foto: fotoVergalhao, descricao: 'Barra e rolo com a marca ArcelorMittal gravada e certificado da usina.' },
  { nome: 'Corte e dobra', pedido: 'corte e dobra', foto: fotoCorteDobra, descricao: 'Vergalhão cortado e dobrado pelo seu projeto na nossa central de Chapecó, pronto para montar.' },
  { nome: 'Chapas', pedido: 'chapas', foto: fotoChapas, descricao: 'Fina e grossa a quente, a frio, zincada e xadrez, para indústria e serralheria.' },
  { nome: 'Bobinas', pedido: 'bobinas', foto: fotoBobinas, descricao: 'Aço plano em bobina para quem corta e conforma na própria fábrica.' },
]
// Também vendemos, com menos destaque: cartão baixo, foto pequena ao lado
const PRODUTOS_MAIS = [
  { nome: 'Tela soldada', pedido: 'tela soldada', foto: fotoTela, descricao: 'Painel e rolo para laje, piso e parede.' },
  { nome: 'Treliça', pedido: 'treliça', foto: fotoTrelica, descricao: 'Para laje treliçada, com a altura do seu projeto.' },
  { nome: 'Arame recozido e pregos', pedido: 'arame recozido e pregos', foto: fotoAramePregos, descricao: 'Para amarrar a armação e montar a forma.' },
]

export default function BertinLandingPage() {
  const [menuAberto, setMenuAberto] = useState(false)
  const acessoRef = useRef(null)
  const topoRef = useRef(null)
  const contatoRef = useRef(null)
  const [barraVisivel, setBarraVisivel] = useState(false)
  const [cotando, setCotando] = useState(null)

  // Barra de WhatsApp do celular: aparece depois do topo e some quando o
  // Contato está na tela, para não repetir os mesmos botões.
  useEffect(() => {
    const vistos = { topo: true, contato: false }
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => { vistos[e.target === topoRef.current ? 'topo' : 'contato'] = e.isIntersecting })
      setBarraVisivel(!vistos.topo && !vistos.contato)
    })
    obs.observe(topoRef.current)
    obs.observe(contatoRef.current)
    return () => obs.disconnect()
  }, [])

  // Parallax leve do topo e entrada dos vergalhões do Sobre/Segmentos. Só grava duas
  // variáveis CSS por quadro; quem pede menos movimento fica com tudo parado.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const raiz = document.documentElement
    let pendente = false
    const atualiza = () => {
      pendente = false
      raiz.style.setProperty('--rolagem', Math.min(window.scrollY, 900))
      document.querySelectorAll('[data-entra]').forEach((el) => {
        const caixa = el.getBoundingClientRect()
        const p = Math.max(0, Math.min(1, (window.innerHeight - caixa.top) / (window.innerHeight * 0.8)))
        el.style.setProperty('--p', p.toFixed(3))
      })
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
      <section ref={topoRef} className="relative overflow-hidden">
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
            className="text-sm text-[#A3ACB2] hover:text-marca-clara transition px-3 py-2 inline-flex items-center gap-1"
          >
            Acesso interno
            <span className="text-xs" aria-hidden="true">{menuAberto ? '▴' : '▾'}</span>
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
                  className="block px-4 py-3 text-sm text-[#C9CDD0] hover:bg-white/5 hover:text-marca-clara transition"
                >
                  {sistema.nome}
                </a>
              ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-36 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="entra mb-6 inline-block border border-marca/60 rounded-full px-4 py-1 text-sm font-semibold text-marca-clara tracking-wide uppercase" style={{ '--i': 0 }}>
              Distribuidor ArcelorMittal
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
                className="botao botao-relevo bg-marca hover:opacity-90 px-8 py-4 rounded-2xl text-xl font-bold text-white texto-no-laranja"
              >
                Pedir cotação
              </a>
            </div>
          </div>

          <div>
            <div className="entra rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur p-8 shadow-2xl" style={{ '--i': 4 }}>
              <div className="grid grid-cols-2 gap-6">

                <div className="entra entra-numero bg-black/20 rounded-2xl p-6" style={{ '--j': 0 }}>
                  <div className="text-4xl font-black text-marca mb-2">
                    +30
                  </div>

                  <div className="text-[#C9CDD0]">
                    Anos de mercado
                  </div>
                </div>

                <div className="entra entra-numero bg-black/20 rounded-2xl p-6" style={{ '--j': 1 }}>
                  <div className="text-4xl font-black text-marca mb-2">
                    170
                  </div>

                  <div className="text-[#C9CDD0]">
                    Cidades atendidas em SC
                  </div>
                </div>

                <div className="entra entra-numero bg-black/20 rounded-2xl p-6" style={{ '--j': 2 }}>
                  <div className="text-4xl font-black text-marca mb-2">
                    100+
                  </div>

                  <div className="text-[#C9CDD0]">
                    Profissionais envolvidos
                  </div>
                </div>

                <div className="entra entra-numero bg-black/20 rounded-2xl p-6" style={{ '--j': 3 }}>
                  <div className="text-4xl font-black text-marca mb-2">
                    Frota
                  </div>

                  <div className="text-[#C9CDD0]">
                    Própria, com entrega em Joinville, Chapecó e região
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARCERIA ARCELORMITTAL */}
      {/* Branco sobre o laranja oficial dá 3,6:1: só vale em letra grande
          (24 px) ou em negrito a partir de 19 px, sempre opaco e com a sombra
          leve de texto-no-laranja. Rótulo pequeno vai numa etiqueta grafite. */}
      <section className="texto-no-laranja bg-marca text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <img
              src={arcelorLogo}
              alt="ArcelorMittal"
              className="w-[260px] lg:w-[420px]"
            />
          </div>

          <div>
            <div className="etiqueta-grafite mb-5">
              Parceria estratégica
            </div>

            <h2 className="text-4xl lg:text-6xl font-black leading-tight mb-8">
              +20 anos
              <br />
              de parceria.
            </h2>

            <p className="text-2xl lg:text-3xl font-bold leading-snug max-w-2xl">
              Distribuidor exclusivo ArcelorMittal na sua região: aço de usina,
              entregue por quem está perto.
            </p>

            <p className="mt-6 text-[19px] font-bold leading-relaxed max-w-2xl">
              Relacionamento consolidado ao longo de décadas com foco em
              confiança, estrutura operacional e continuidade.
            </p>
          </div>

        </div>
      </section>

      {/* PRODUTOS — "Cotar" troca o botão pelas duas unidades; o WhatsApp abre
          com o nome do produto já escrito */}
      <section id="produtos" className="bg-[#2d2a27]">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-marca-clara mb-4 text-center">
            Produtos
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
            Aço de usina para a obra e para a fábrica.
          </h2>

          <p className="text-lg text-[#C9CDD0] text-center max-w-2xl mx-auto mb-16">
            Escolha o produto e fale com a unidade mais perto de você.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUTOS.map((p) => (
              <div key={p.nome} className="segmento flex flex-col rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
                <img src={p.foto} alt={p.nome} width="800" height="500" loading="lazy" className="w-full aspect-[8/5] object-cover" />

                <div className="flex flex-col flex-1 p-6">
                  <div className="text-2xl font-bold mb-2">
                    {p.nome}
                  </div>

                  <div className="text-[#C9CDD0] mb-6 flex-1">
                    {p.descricao}
                  </div>

                  {cotando === p.nome ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-2 text-sm text-[#C9CDD0]">Chamar no WhatsApp de:</div>
                      {UNIDADES.map((u) => (
                        <a
                          key={u.nome}
                          href={whatsappProduto(u, p.pedido)}
                          className="botao texto-no-laranja bg-marca text-white font-bold text-[19px] rounded-xl py-3 text-center"
                        >
                          {u.cidade}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => setCotando(p.nome)}
                      className="botao texto-no-laranja bg-marca text-white font-bold text-[19px] rounded-xl py-3 w-full"
                    >
                      Cotar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-[#A3ACB2] mb-4">
            Também temos
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUTOS_MAIS.map((p) => (
              <div key={p.nome} className="segmento flex rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <img src={p.foto} alt={p.nome} width="320" height="320" loading="lazy" className="w-28 shrink-0 object-cover" />

                <div className="flex flex-col flex-1 p-4">
                  <div className="text-lg font-bold">
                    {p.nome}
                  </div>

                  <div className="text-sm text-[#C9CDD0] mb-3 flex-1">
                    {p.descricao}
                  </div>

                  {cotando === p.nome ? (
                    <div className="flex gap-2">
                      {UNIDADES.map((u) => (
                        <a key={u.nome} href={whatsappProduto(u, p.pedido)} className="botao flex-1 text-center border border-marca text-marca-clara font-semibold rounded-lg py-1.5">
                          {u.cidade}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <button onClick={() => setCotando(p.nome)} className="botao self-start border border-marca text-marca-clara font-semibold rounded-lg px-5 py-1.5">
                      Cotar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEGMENTOS + SOBRE — mesmo fundo, um bloco só, com dois vergalhões em
          diagonal como no timbrado: um entra pela direita, o outro pela esquerda */}
      <section className="segmentos relative overflow-hidden">
        <img src={vergalhaoDiagonal} alt="" aria-hidden="true" data-entra className="vergalhao-diagonal vergalhao-direita" />
        <img src={vergalhaoDiagonal} alt="" aria-hidden="true" data-entra className="vergalhao-diagonal vergalhao-esquerda" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">

          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-marca-clara mb-4 text-center">
            Segmentos atendidos
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            Aço para a obra, a fábrica e a revenda.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              { nome: 'Construção Civil', descricao: 'Ferro e aço para todas as etapas da obra, com volume e prazo de entrega que acompanham o seu cronograma.' },
              { nome: 'Indústria e Planos', descricao: 'Chapas, bobinas, tubos e barras com certificado de usina, com entrega programada para a sua produção.' },
              { nome: 'Atacado e Varejo', descricao: 'Do pedido em grande escala à compra pontual — atendimento flexível para atacadistas e varejistas de qualquer porte.' },
              { nome: 'Corte & Dobra', descricao: 'Aço cortado e dobrado pelo seu projeto na nossa central de Chapecó, com entrega também na região de Joinville.' },
            ].map((item) => (

              <div
                key={item.nome}
                className="segmento rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-marca/50 transition"
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
        <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-24 lg:pb-32 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-marca-clara mb-4">
              Sobre a Bertin
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Uma família no aço, em Joinville desde 1994.
            </h2>
          </div>

          <div className="space-y-6 text-lg text-[#C9CDD0] leading-relaxed">
            <p>
              A história começou com o aço em Londrina e Maringá, no Paraná.
              Em 1994 a Bertin abriu em Joinville e cresceu junto com quem
              constrói em Santa Catarina. Desde 2004 é distribuidor ArcelorMittal.
            </p>

            <p>
              Hoje são duas unidades, em Joinville e em Chapecó, uma equipe de
              mais de 100 pessoas e frota própria para levar o aço até a obra.
            </p>
          </div>

        </div>
      </section>

      <OndeAtendemos />

      {/* CONTATO */}
      <section id="contato" ref={contatoRef} className="texto-no-laranja bg-marca text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Vamos conversar!
          </h2>

          <p className="text-2xl font-medium leading-snug max-w-3xl mx-auto mb-12">
            Chame a unidade mais perto no WhatsApp
            e peça a sua cotação.
          </p>

          {/* WhatsApp na frente: é por onde o cliente pede cotação */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            {UNIDADES.map((u) => (
              <div key={u.nome} className="bg-black/10 rounded-3xl p-8">
                <div className="etiqueta-grafite mb-4">
                  {u.nome}
                </div>

                <a href={`tel:+${u.numero}`} className="block text-3xl font-black mb-2">
                  {u.telefone}
                </a>

                <div className="text-[19px] font-bold mb-6">
                  Atendimento e vendas
                </div>

                <a
                  href={whatsapp(u)}
                  className="botao botao-relevo-laranja !block sm:!inline-block text-center bg-black text-white px-4 sm:px-8 py-4 rounded-2xl text-lg font-semibold"
                >
                  Pedir cotação no WhatsApp
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 text-2xl font-medium">
            ou escreva para{' '}
            <a href="mailto:contato@bertin.com.br?subject=Cota%C3%A7%C3%A3o%20pelo%20site" className="font-bold underline underline-offset-4">
              contato@bertin.com.br
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-grafite text-[#C9CDD0] text-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between gap-3">
          <span>Ferro e Aço Bertin • Joinville e Chapecó • SC</span>
          <a href="/privacidade" className="underline underline-offset-4 hover:text-white">Política de Privacidade</a>
        </div>
      </footer>

      {/* Só no celular: os dois WhatsApp sempre à mão enquanto rola a página */}
      <nav className="barra-cotacao md:hidden" data-visivel={barraVisivel} aria-label="Pedir cotação" aria-hidden={!barraVisivel}>
        {UNIDADES.map((u) => (
          <a key={u.nome} href={whatsapp(u)} tabIndex={barraVisivel ? 0 : -1} className="botao texto-no-laranja bg-marca text-white font-bold text-[19px] rounded-xl py-3 !flex items-center justify-center gap-2" aria-label={`WhatsApp ${u.cidade}`}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>
            {u.cidade}
          </a>
        ))}
      </nav>

    </div>
  )
}
