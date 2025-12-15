function HomePage() {
  return (
    <div>
      <h1>Herramientas: Base64 · URL · JSON · Diff · YAML · Hash</h1>
      <div className="card" style={{ marginTop: '20px' }}>
        <h2>Bienvenido</h2>
        <p>Selecciona una herramienta desde el menú de navegación:</p>
        <ul>
          <li><strong>Base64:</strong> Codifica/decodifica texto y archivos con Base64, e importa/exporta archivos</li>
          <li><strong>URL:</strong> Codifica y decodifica URLs con seguridad</li>
          <li><strong>JSON:</strong> Valida y minifica archivos JSON</li>
          <li><strong>Diff:</strong> Compara dos textos y visualiza las diferencias</li>
          <li><strong>YAML:</strong> Valida YAML, lo formatea y convierte a application.properties</li>
          <li><strong>Hash:</strong> Genera hashes (MD5, SHA1, SHA256, SHA512) con salida en Hex y Base64</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h2>Notas rápidas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <p className="small-text">
              • <strong>Base64 Archivo:</strong> "Archivo → Base64" usa data URL (ej: data:image/png;base64,...).
            </p>
            <p className="small-text">
              • <strong>Base64 → Descargar:</strong> Crea un archivo a partir del Base64. Si no se especifica MIME se usa application/octet-stream.
            </p>
            <p className="small-text">
              • <strong>Diff Checker:</strong> Compara línea por línea, mostrando adiciones y eliminaciones.
            </p>
            <p className="small-text">
              • <strong>YAML Validator:</strong> Valida sintaxis YAML y muestra la estructura en JSON.
            </p>
          </div>
          <div>
            <p className="small-text">
              • <strong>URL Encode:</strong> encodeURIComponent; hay alternativa que convierte espacios a +.
            </p>
            <p className="small-text">
              • <strong>JSON Validator:</strong> Intenta parsear y muestra error con posición si falla.
            </p>
            <p className="small-text">
              • <strong>Hash Generator:</strong> Genera hashes con salt opcional, salida en Hex y Base64.
            </p>
            <p className="small-text">
              • <strong>YAML to Properties:</strong> Convierte configuración YAML a application.properties con prefijos personalizados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

