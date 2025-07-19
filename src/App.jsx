import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');

  const addToDisplay = (value) => {
    setDisplay((prev) => prev + value);
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(display);
      setDisplay(String(result));
    } catch {
      setDisplay('Erro');
    }
  };

  const backspace = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const clear = () => {
    setDisplay('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.'].includes(key)) {
        addToDisplay(key);
      } else if (key === 'Enter') {
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === 'Escape') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display]);

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  const handleClick = (value) => {
    if (value === 'C') clear();
    else if (value === '=') calculate();
    else addToDisplay(value);
  };

  return (
    <div className="calculator-container">
      <h1>CALCULADORA</h1> {/* Aqui está o título */}
      <div className="calculator">
        <input type="text" value={display} readOnly />
        <div className="buttons">
          {buttons.map((btn) => (
            <button key={btn} onClick={() => handleClick(btn)}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
