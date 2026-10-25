import React from 'react'
import { renderToString } from 'react-dom/server'
import BertinLandingPage from './Pagina'

// Usado só no build (scripts/prerender.mjs): monta o HTML da página.
export const render = () => renderToString(<BertinLandingPage />)
