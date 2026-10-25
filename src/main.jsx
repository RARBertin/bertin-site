import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import BertinLandingPage from './Pagina'

// O index.html já chega com a página montada no build (scripts/prerender.mjs),
// para o Google e a prévia de links lerem o texto; aqui o React só assume.
const raiz = document.getElementById('root')
if (raiz.hasChildNodes()) ReactDOM.hydrate(<BertinLandingPage />, raiz)
else ReactDOM.render(<BertinLandingPage />, raiz)
