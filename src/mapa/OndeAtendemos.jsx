import React, { useState, useEffect, useMemo, useRef } from 'react'
import { CIDADES } from './cidades'

// Mapa "Onde atendemos": o cliente digita (ou toca) a cidade e vê qual unidade
// chamar. Os contornos (41 KB) só carregam no navegador, depois da página.
const UNIDADE = {
  J: { nome: 'Unidade Joinville', numero: '554734514888', cor: '#FF3700' },
  C: { nome: 'Unidade Chapecó', numero: '554933199600', cor: '#FF9A66' },
}
// Posição das unidades no desenho (mesma projeção de contornos.js)
const PINOS = [
  { u: 'J', nome: 'Joinville', x: 914, y: 67 },
  { u: 'C', nome: 'Chapecó', x: 224, y: 231 },
]

// Em Chapecó cada região tem o seu vendedor (planilha "Chapecó - Raffa Whatsapp",
// aba 3). Região sem vendedor certo (Caçador vinha com o telefone arrastado no
// Excel) fica fora daqui e cai na central da unidade, o 9600.
const VENDEDOR_CHAPECO = {
  'Chapecó': { nome: 'Oiller', numero: '554933199620' },
  'São Lourenço do Oeste': { nome: 'Neimar', numero: '554933199618' },
  'São Miguel do Oeste - BR 282': { nome: 'Neimar', numero: '554933199618' },
  'São Miguel do Oeste - BR 283': { nome: 'Neimar', numero: '554933199618' },
  'São Miguel do Oeste - SC 160': { nome: 'Neimar', numero: '554933199618' },
  'Concórdia': { nome: 'Bruno', numero: '554933199617' },
  'Xanxerê': { nome: 'Bruno', numero: '554933199617' },
  'Joaçaba': { nome: 'Alex', numero: '554933199619' },
}

const sem = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
const POR_IBGE = Object.fromEntries(CIDADES.map(([ibge, nome, u, regiao]) =>
  [ibge, { ibge, nome, u, vendedor: u === 'C' ? VENDEDOR_CHAPECO[regiao] : null }]))
const POR_NOME = Object.fromEntries(CIDADES.map(([ibge, nome]) => [sem(nome), ibge]))

const mensagem = (cidade, produto) =>
  encodeURIComponent(`Olá! Vim pelo site da Bertin. Sou de ${cidade} e gostaria de uma cotação${produto ? ` de ${produto}` : ''}.`)
// Fora da lista, as linhas de aço são do distribuidor ArcelorMittal daquela
// região e só o corte e dobra a Bertin atende. O site não diz "não atendemos"
// nem manda o cliente embora: a unidade conversa e orienta onde comprar.
const whatsappOrientacao = (u, cidade) => `https://wa.me/${UNIDADE[u].numero}?text=${encodeURIComponent(
  `Olá! Vim pelo site da Bertin. Sou de ${cidade} e gostaria de uma orientação para comprar aço ArcelorMittal ou corte e dobra.`)}`
// Cidade da lista: o vendedor da região quando há um; senão, a unidade
const whatsappAtendida = (c) => `https://wa.me/${c.vendedor ? c.vendedor.numero : UNIDADE[c.u].numero}?text=${mensagem(c.nome)}`

export default function OndeAtendemos() {
  const [mapa, setMapa] = useState(null)
  const [texto, setTexto] = useState('')
  const [ibge, setIbge] = useState(null)
  const [foco, setFoco] = useState(null)
  const [rotulo, setRotulo] = useState(null)
  const caminhos = useRef({})

  useEffect(() => { import('./contornos').then(setMapa) }, [])

  // Nome em cima da cidade: a que está sob o mouse, senão a escolhida
  const destaque = (foco && POR_IBGE[foco] ? foco : null) || ibge
  useEffect(() => {
    const el = destaque && caminhos.current[destaque]
    if (!el || !mapa) { setRotulo(null); return }
    const b = el.getBBox()
    // meia largura aproximada do nome (a letra é maior no celular, ver index.css)
    const meia = POR_IBGE[destaque].nome.length * (matchMedia('(max-width: 640px)').matches ? 16 : 10) + 12
    const x = Math.min(Math.max(b.x + b.width / 2, meia), mapa.LARGURA - meia)
    setRotulo({ x, y: b.y - 14 < 40 ? b.y + b.height + 40 : b.y - 14, nome: POR_IBGE[destaque].nome })
  }, [destaque, mapa])

  const escolhida = ibge && POR_IBGE[ibge]
  const naoAchou = !escolhida && texto.trim().length >= 3
  const contagem = useMemo(() => ({
    J: CIDADES.filter((c) => c[2] === 'J').length,
    C: CIDADES.filter((c) => c[2] === 'C').length,
  }), [])

  const digitou = (valor) => {
    setTexto(valor)
    setIbge(POR_NOME[sem(valor)] || null)
  }
  const tocou = (cod) => {
    if (!POR_IBGE[cod]) return
    setIbge(cod)
    setTexto(POR_IBGE[cod].nome)
  }

  return (
    <section id="onde-atendemos" className="bg-[#2d2a27]">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-5 gap-12 items-center">

        <div className="lg:col-span-2">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-marca-clara mb-4">
            Onde atendemos
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {CIDADES.length} cidades em Santa Catarina.
          </h2>

          <p className="text-lg text-[#C9CDD0] mb-8">
            Digite a sua cidade e veja qual unidade atende você.
          </p>

          <label htmlFor="cidade" className="block text-sm font-semibold text-[#C9CDD0] mb-2">
            Sua cidade
          </label>
          <input
            id="cidade"
            list="cidades-atendidas"
            value={texto}
            onChange={(e) => digitou(e.target.value)}
            placeholder="Ex.: Jaraguá do Sul"
            autoComplete="off"
            className="w-full rounded-xl bg-[#3D3935] border border-white/15 px-4 py-3 text-lg text-white placeholder-[#8a8d90] focus:outline-none focus:border-marca"
          />
          <datalist id="cidades-atendidas">
            {CIDADES.map(([cod, nome]) => <option key={cod} value={nome} />)}
          </datalist>

          <div className="mt-6 min-h-[136px]" aria-live="polite">
            {escolhida && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xl font-bold mb-1">
                  {escolhida.nome}
                </div>
                <div className="text-[#C9CDD0] mb-4">
                  Atendida pela <span className="text-white font-semibold">{UNIDADE[escolhida.u].nome}</span>
                  {escolhida.vendedor && <>, com o vendedor <span className="text-white font-semibold">{escolhida.vendedor.nome}</span></>}
                </div>
                <a
                  href={whatsappAtendida(escolhida)}
                  className="botao texto-no-laranja bg-marca text-white font-bold text-[19px] rounded-xl px-6 py-3"
                >
                  Chamar no WhatsApp
                </a>
              </div>
            )}

            {naoAchou && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-[#C9CDD0] mb-4">
                  Fale com a gente: orientamos você a conseguir aço ArcelorMittal perto da sua obra.
                  E o <span className="text-white font-semibold">corte e dobra</span> a gente atende também.
                </div>
                <div className="text-sm text-[#C9CDD0] mb-2">Chamar no WhatsApp de:</div>
                <div className="grid grid-cols-2 gap-2">
                  {['J', 'C'].map((u) => (
                    <a key={u} href={whatsappOrientacao(u, texto.trim())} className="botao texto-no-laranja bg-marca text-white font-bold text-[19px] rounded-xl py-3 text-center">
                      {u === 'J' ? 'Joinville' : 'Chapecó'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          <svg
            viewBox={`0 0 ${mapa ? mapa.LARGURA : 1000} ${mapa ? mapa.ALTURA : 695}`}
            className="mapa-sc w-full h-auto"
            role="img"
            aria-label={`Mapa de Santa Catarina com as ${CIDADES.length} cidades atendidas: ${contagem.J} pela unidade de Joinville e ${contagem.C} pela de Chapecó`}
          >
            {mapa && mapa.CONTORNOS.map(([cod, d]) => {
              const c = POR_IBGE[cod]
              return (
                <path
                  key={cod}
                  ref={(el) => { caminhos.current[cod] = el }}
                  d={d}
                  fill={cod === ibge ? '#FFFFFF' : c ? UNIDADE[c.u].cor : '#4a4642'}
                  className={c ? 'atendida' : undefined}
                  onClick={() => tocou(cod)}
                  onMouseEnter={() => setFoco(cod)}
                  onMouseLeave={() => setFoco(null)}
                >
                  <title>{c ? `${c.nome}: ${UNIDADE[c.u].nome}` : ''}</title>
                </path>
              )
            })}

            {/* Contorno branco por cima da cidade em destaque, para ela saltar do vizinho */}
            {mapa && destaque && caminhos.current[destaque] && (
              <path d={caminhos.current[destaque].getAttribute('d')} className="contorno-destaque" pointerEvents="none" />
            )}

            {mapa && PINOS.map((p) => (
              <g key={p.nome} className="pino" pointerEvents="none">
                <circle cx={p.x} cy={p.y} r="13" fill="#2d2a27" stroke="#FFFFFF" strokeWidth="5" />
                <text x={p.x} y={p.y + (p.y < 100 ? 48 : -26)} textAnchor="middle">{p.nome}</text>
              </g>
            ))}
            {rotulo && (
              <text x={rotulo.x} y={rotulo.y} textAnchor="middle" className="rotulo-cidade" pointerEvents="none">{rotulo.nome}</text>
            )}
          </svg>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#C9CDD0]">
            <span className="inline-flex items-center gap-2"><i className="w-3.5 h-3.5 rounded-sm" style={{ background: UNIDADE.J.cor }} /> Unidade Joinville ({contagem.J})</span>
            <span className="inline-flex items-center gap-2"><i className="w-3.5 h-3.5 rounded-sm" style={{ background: UNIDADE.C.cor }} /> Unidade Chapecó ({contagem.C})</span>
          </div>
        </div>

      </div>
    </section>
  )
}
