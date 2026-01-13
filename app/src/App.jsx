import { useState } from 'react'

function App() {
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreview(url)
    setResult(null)
  }

  async function handleGenerate() {
    setLoading(true)
    setResult(null)

    // simula tempo da IA
    setTimeout(async () => {
      // baixa UMA vez a imagem fake
      const response = await fetch('https://picsum.photos/400/500')
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      setResult(blobUrl)
      setLoading(false)
    }, 2000)
  }

  function handleDownload() {
    const link = document.createElement('a')
    link.href = result
    link.download = 'fashionflow_gerada.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function handleWhatsApp() {
    const text = encodeURIComponent(
      'Olha essa imagem gerada com IA no FashionFlow 👇'
    )
    const url = encodeURIComponent(result)
    window.open(`https://wa.me/?text=${text}%0A${url}`, '_blank')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial'
      }}
    >
      <div
        style={{
          background: '#111',
          padding: '30px',
          borderRadius: '14px',
          width: '100%',
          maxWidth: '900px',
          color: '#fff',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}
      >
        <h1 style={{ marginTop: 0 }}>FashionFlow IA</h1>
        <p style={{ color: '#aaa' }}>
          Experimente roupas com inteligência artificial
        </p>

        <hr style={{ borderColor: '#222', margin: '20px 0' }} />

        <h3>Upload da peça</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <br /><br />

        <button
          onClick={handleGenerate}
          disabled={!preview || loading}
          style={{
            padding: '12px 24px',
            background: loading ? '#555' : '#00ffcc',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Processando...' : 'Gerar imagem com IA'}
        </button>

        {loading && (
          <p style={{ marginTop: '15px', color: '#00ffcc' }}>
            Gerando imagem com IA...
          </p>
        )}

        <div
          style={{
            display: 'flex',
            gap: '30px',
            marginTop: '30px',
            flexWrap: 'wrap'
          }}
        >
          {preview && (
            <div>
              <h3>Imagem original</h3>
              <img
                src={preview}
                alt="Original"
                style={{ maxWidth: '300px', borderRadius: '10px' }}
              />
            </div>
          )}

          {result && (
            <div>
              <h3>Imagem gerada</h3>
              <img
                src={result}
                alt="Gerada"
                style={{ maxWidth: '300px', borderRadius: '10px' }}
              />

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '15px'
                }}
              >
                <button
                  onClick={handleDownload}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#222',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  ⬇️ Baixar
                </button>

                <button
                  onClick={handleWhatsApp}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#25D366',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  📲 WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
