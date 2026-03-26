# Wordle de Fútbol

Una versión adaptada del popular juego Wordle, pero enfocada en el fútbol. Adivina el nombre de un jugador famoso en 6 intentos o menos. Cada intento te da pistas sobre qué letras están correctas, en la posición equivocada o no existen en el nombre.

## Cómo Jugar

- El juego selecciona aleatoriamente un nombre de jugador de fútbol de 6 letras.
- Tienes 6 intentos para adivinarlo.
- Después de cada intento, las letras cambian de color:
  - **Verde**: La letra está en la posición correcta.
  - **Amarillo**: La letra existe en el nombre, pero en otra posición.
  - **Gris**: La letra no existe en el nombre.
- Usa el teclado en pantalla o tu teclado físico para escribir.
- Presiona ENTER para enviar tu intento, o BKSP para borrar.

## Tecnologías Usadas

- **React**: Para la interfaz de usuario.
- **Vite**: Para el desarrollo y construcción rápida.
- **CSS**: Para el diseño y estilos responsivos.
- **ESLint**: Para mantener la calidad del código.

## Instalación y Ejecución

1. Clona este repositorio:
   ```bash
   git clone https://github.com/ANDRESDLRG2007/Wordle-de-futbol.git
   cd Wordle-de-futbol
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173` para jugar.

## Despliegue

Este proyecto está configurado para desplegarse en Netlify. Para construir la versión de producción:

```bash
npm run build
```

Los archivos generados en la carpeta `dist` pueden subirse a Netlify para el despliegue web.

## App Original: Deploy en Parejas (0.75 pts) 27 de Marzo

Cristian Andres De La Rue Garcia
Ronald Fabian Lopez Castaño