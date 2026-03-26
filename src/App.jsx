import { useState } from 'react'
import './App.css'

// --- PARTE IMPORTANTE ---
// Estas constantes definen las reglas del juego.
// Si quieres cambiar el tamaño de la palabra o los intentos, solo cambias estos números.

const WORD_LENGTH = 6
const MAX_TURNS = 6

// --- PARTE IMPORTANTE ---
// Este array es el "diccionario" del juego.
// Solo se pueden adivinar palabras que estén aquí.
// Si quieres agregar más jugadores, los añades a esta lista.

const WORDS = [
  'NEYMAR',
  'MBAPPE',
  'MODRIC',
  'HAZARD',
  'SERGIO',
  'ANDRES',
  'GERARD',
  'ROBERT',
  'ERLING',
  'THIAGO',
  'PIERRE',
  'MARCOS',
  'CARLOS',
  'ALEXIS',
  'FELIPE',
  'SAMUEL',
  'DANIEL',
  'VICTOR',
  'JAVIER',
  'RENATO',
]

const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

// --- PARTE IMPORTANTE ---
// Esta función es el corazón del juego.
// Compara letra por letra el intento del jugador con la solución
// y devuelve un array que dice si cada letra es:
// 'correct'  → letra en la posición correcta (verde)
// 'present'  → letra existe pero en otra posición (amarillo)
// 'absent'   → letra no existe en la palabra (gris)

function evaluarIntento(intento, solucion) {
  const resultado = Array(WORD_LENGTH).fill('absent')

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (intento[i] === solucion[i]) {
      resultado[i] = 'correct'
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (resultado[i] !== 'correct') {
      if (solucion.includes(intento[i])) {
        resultado[i] = 'present'
      }
    }
  }

  return resultado
}

function App() {

  // --- PARTE IMPORTANTE ---
  // Todos estos useState guardan el estado del juego en memoria.
  // Cuando cualquiera de ellos cambia, React vuelve a dibujar la pantalla automáticamente.

  const [solucion, setSolucion] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]  // palabra aleatoria al inicio
  )
  const [intentos, setIntentos] = useState([])       // historial de palabras enviadas
  const [intentoActual, setIntentoActual] = useState('') // lo que el jugador está escribiendo
  const [evaluaciones, setEvaluaciones] = useState([])   // resultado de cada intento
  const [teclas, setTeclas] = useState({})               // color de cada tecla del teclado
  const [mensaje, setMensaje] = useState('Adivina el jugador en 6 intentos')

  // --- PARTE IMPORTANTE ---
  // Estas dos variables se calculan automáticamente a partir del estado,
  // no necesitan su propio useState porque dependen de otros valores.

  const gano = evaluaciones.some((fila) => fila.every((celda) => celda === 'correct'))
  const juegoTerminado = gano || intentos.length >= MAX_TURNS

  function presionarLetra(letra) {
    if (juegoTerminado) return
    if (intentoActual.length < WORD_LENGTH) {
      setIntentoActual(intentoActual + letra)
    }
  }

  function borrarLetra() {
    if (juegoTerminado) return
    setIntentoActual(intentoActual.slice(0, -1))
  }

  // --- PARTE IMPORTANTE ---
  // Esta función corre cuando el jugador presiona ENTER.
  // Tiene 3 pasos: validar, evaluar y guardar.

  function enviarIntento() {
    const palabra = intentoActual.toUpperCase()

    // Paso 1: validar que la palabra sea correcta antes de procesarla

    if (palabra.length !== WORD_LENGTH) {
      setMensaje(`La palabra debe tener ${WORD_LENGTH} letras`)
      return
    }
    if (!WORDS.includes(palabra)) {
      setMensaje('No está en la lista. Intenta otro jugador.')
      return
    }

    // Paso 2: evaluar el intento y guardarlo en el historial

    const resultado = evaluarIntento(palabra, solucion)
    setIntentos([...intentos, palabra])
    setEvaluaciones([...evaluaciones, resultado])

    // Paso 3: actualizar el color de las teclas del teclado
    // Solo se actualiza si el nuevo color es "mejor" (correct > present > absent)

    const nuevasTeclas = { ...teclas }
    const orden = { absent: 1, present: 2, correct: 3 }
    for (let i = 0; i < palabra.length; i++) {
      const letra = palabra[i]
      const estadoAnterior = nuevasTeclas[letra]
      if (!estadoAnterior || orden[resultado[i]] > orden[estadoAnterior]) {
        nuevasTeclas[letra] = resultado[i]
      }
    }
    setTeclas(nuevasTeclas)
    setIntentoActual('')

    if (resultado.every((celda) => celda === 'correct')) {
      setMensaje(`¡GOL! Acertaste: ${solucion}. Presiona Reiniciar.`)
    } else if (intentos.length + 1 >= MAX_TURNS) {
      setMensaje(`Fuera. La respuesta era ${solucion}. Presiona Reiniciar.`)
    } else {
      setMensaje('Sigue intentando.')
    }
  }

  function reiniciarJuego() {
    setSolucion(WORDS[Math.floor(Math.random() * WORDS.length)])
    setIntentos([])
    setIntentoActual('')
    setEvaluaciones([])
    setTeclas({})
    setMensaje('Adivina el jugador en 6 intentos')
  }

  // --- PARTE IMPORTANTE ---
  // El return es todo lo que se dibuja en pantalla.
  // Usamos Array.from({ length: MAX_TURNS }) para crear las 6 filas del tablero
  // y dentro de cada fila, otro Array.from para crear las 6 celdas (tiles).

  return (
    <main className="wordle-app">
      <h1>Wordle <span>Fútbol</span></h1>
      <p>Jugadores · {WORD_LENGTH} letras · {MAX_TURNS} intentos</p>

      <div className="leyenda">
        <div className="leyenda-item">
          <div className="leyenda-dot" style={{ background: '#25a653' }}></div>
          Correcta
        </div>
        <div className="leyenda-item">
          <div className="leyenda-dot" style={{ background: '#f5c518' }}></div>
          Lugar incorrecto
        </div>
        <div className="leyenda-item">
          <div className="leyenda-dot" style={{ background: '#3d3d3d' }}></div>
          No está
        </div>
      </div>

      <div className="board">
        {Array.from({ length: MAX_TURNS }).map((_, fila) => {
          const intento = intentos[fila] || ''
          const evaluacion = evaluaciones[fila] || []
          return (
            <div className="row" key={fila}>
              {Array.from({ length: WORD_LENGTH }).map((_, col) => {
                const letra =
                  intento[col] ||
                  (fila === intentos.length ? intentoActual[col] || '' : '')
                const estado = evaluacion[col] || ''
                return (
                  <div className={`tile ${estado}`} key={col}>
                    {letra}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <p className="message">{mensaje}</p>

      <div className="keyboard">
        {keyboardRows.map((fila) => (
          <div className="keyboard-row" key={fila}>
            {fila.split('').map((letra) => (
              <button
                key={letra}
                type="button"
                className={`key ${teclas[letra] || ''}`}
                onClick={() => presionarLetra(letra)}
              >
                {letra}
              </button>
            ))}
            {fila === 'ASDFGHJKL' && (
              <button className="key action" onClick={borrarLetra}>
                ⌫
              </button>
            )}
            {fila === 'ZXCVBNM' && (
              <button className="key action" onClick={enviarIntento}>
                ↵
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="restart-button" onClick={reiniciarJuego}>
        Reiniciar partido
      </button>
    </main>
  )
}

export default App