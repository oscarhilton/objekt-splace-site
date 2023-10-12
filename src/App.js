import './App.css';
import React, { useEffect, useRef } from 'react';

const CanvasAnimation = () => {
  const txt = Array(20).fill('objektobjekt')
  const canvas = useRef(null);
  const rows = Array(20).fill(txt);
  const rowPositions = Array(20).fill(0);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.fillStyle = '#019fdaff';
    ctx.textAlign = 'center';
    ctx.font = '39px Fold Grotesque Pro';

    const draw = () => {
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      rows.forEach((row, index) => {
        const isEven = index % 2 === 0
        const text = row.join('');
        const textWidth = ctx.measureText(text).width / 4;

        ctx.fillText(text, rowPositions[index] * 
2, 20 + index * 30);

        const add = (isEven ? -1 : 1)
        rowPositions[index] += add * 0.1;

        // Looping logic
        if (rowPositions[index] <= -(textWidth / 20 - 1) || rowPositions[index] >= (textWidth / 20 - 1)) {
          rowPositions[index] = (canvas.current.width / 2) * isEven ? 1 : -1;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [rowPositions, rows]);

  return <canvas ref={canvas} width={400} height={380}></canvas>;
};

function App() {
  return (
    <div>
      <header>
        <nav>
        </nav>
      </header>
      <main>
        <section style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#fff'
        }}>
          <img src="./OIG.png" alt="OIG" style={{
            width: '400px',
            height: '400px',
            position: 'absolute',
          }} />
          <CanvasAnimation />
          <h1 style={{
            position: 'absolute',
            fontSize: '1rem',
            fontWeight: 'normal',
            fontFamily: 'Fold Grotesque Pro',
            bottom: '100px',
          }}>hello@objektobjekt.com</h1>
        </section>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
