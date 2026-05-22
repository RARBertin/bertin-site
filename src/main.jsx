import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return (
    <div
      style={{
        background: '#3D3935',
        color: 'white',
        minHeight: '100vh',
        padding: '80px',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '72px', marginBottom: '20px' }}>
        BERTIN
      </h1>

      <p
        style={{
          fontSize: '24px',
          maxWidth: '900px',
          lineHeight: 1.6,
          color: '#C9CDD0',
        }}
      >
        Empresa familiar com mais de 30 anos no mercado catarinense,
        atuando no fornecimento de ferro e aço para construção civil,
        indústria, agropecuária, atacado e varejo.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginTop: '40px',
        }}
      >
        <a
          href="https://wa.me/554734514888"
          style={{
            background: '#FF5C00',
            color: 'black',
            padding: '18px 30px',
            borderRadius: '18px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Fale conosco
        </a>

        <a
          href="https://login.bertin.com.br"
          style={{
            color: '#7C878E',
            textDecoration: 'none',
            paddingTop: '18px',
          }}
        >
          Acesso interno
        </a>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)