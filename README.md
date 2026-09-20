# bertin.com.br — site institucional

Página única da Ferro e Aço Bertin, distribuidora ArcelorMittal em Santa
Catarina. **React + Vite + Tailwind.**

> O README anterior era o texto padrão do `create-next-app` e descrevia um
> projeto Next.js, que este nunca foi. Substituído em 19/09/2026.

## Onde está no ar

| | |
|---|---|
| Endereços | `bertin.com.br` e `www.bertin.com.br` |
| Hospedagem | **Cloudflare Pages**, projeto `bertin-site` |
| Publicação | automática a cada `push` na branch `main` |
| Prévia | `bertin-site.pages.dev` |

Até 19/09/2026 o site ficava no Vercel. Foi migrado para o Cloudflare, que já
hospedava `financeiro.bertin.com.br` e já era o DNS do domínio — um fornecedor
a menos para administrar. O build gerado nos dois é o mesmo: o `vendor.js` saiu
byte a byte idêntico, e o `index.js` só difere no hash do pedaço que ele
importa.

## Rodar local

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera dist/
npm run serve    # confere o dist/ antes de publicar
```

**Use Node 16.** O projeto está em Vite 2 e React 17, de 2021, e não instala em
Node novo. É essa a versão que o Cloudflare usa, fixada na variável de ambiente
`NODE_VERSION` nas configurações do projeto Pages.

Isso é dívida técnica conhecida: o Node 16 não recebe mais atualização de
segurança, e um dia o Cloudflare pode deixar de oferecê-lo. Quando isso
apertar, o caminho é subir Vite e React de versão — o site é pequeno, ~310
linhas num arquivo só.

## Como o código está organizado

Não está organizado, e é bom saber disso antes de abrir:

- **`src/main.jsx` tem o site inteiro** — as ~310 linhas de JSX, os textos e os
  dados das seções. Não existe divisão em componentes.
- `src/index.css` — Tailwind mais alguns estilos próprios.
- `src/arcelor.png` — o logo da ArcelorMittal, usado na seção de parceria.
- `index.html` — o HTML base, onde ficam `<title>`, a meta descrição e as tags
  de Open Graph e Twitter Card.
- `public/` — `robots.txt` e `sitemap.xml`, copiados para a raiz no build.
- `vite.config.js` está **vazio**: o Vite roda no padrão, e é o padrão dele que
  separa o `vendor.js` das bibliotecas.

Para mudar um texto do site, é em `src/main.jsx`. Para mudar o título ou a
descrição que aparecem no Google e no WhatsApp, é em `index.html`.

## Pendência conhecida

`favicon.png` tem **1024×1024 e 1,1 MB**. Todo visitante baixa isso, e um
favicon de 256×256 resolveria o mesmo em cerca de 3% do tamanho. Não foi
mexido para não alterar um arquivo publicado sem necessidade — mas é a
melhoria de desempenho mais fácil deste repositório.
