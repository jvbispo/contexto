import React, { useState, useCallback, useMemo, useEffect,  } from 'react';
import './App.scss';

// const boardInitialValue = [
//   ["a", "b", "c", "d", "e"],
//   ["a", "b", "c", "d", "e"],
//   ["a", "b", "c", "d", "e"],
//   ["a", "b", "c", "d", "e"],
//   ["a", "b", "c", "d", "e"],
//   ["a", "b", "c", "d", "e"],
// ];

const boardInitialValue = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// const boardInitialValue = [
//   [{ value: "" },{ value: "" },{ value: "" },{ value: "" },{ value: "" }],
//   [{ value: "" },{ value: "" },{ value: "" },{ value: "" },{ value: "" }],
//   [{ value: "" },{ value: "" },{ value: "" },{ value: "" },{ value: "" }],
//   [{ value: "" },{ value: "" },{ value: "" },{ value: "" },{ value: "" }],
//   [{ value: "" },{ value: "" },{ value: "" },{ value: "" },{ value: "" }],
//   [{ value: "" },{ value: "" },{ value: "" },{ value: "" },{ value: "" }],
// ];

const height = 6;
const width = 5;

function App() {
  const [word, setWord] = useState<string>("motel");
  const [tries, setTries] = useState<string[][]>(boardInitialValue);
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState<number>(0);

  const checkCode = (code: number) => {
    if ((code > 64 && code < 91) || code === 13 || code === 8) {
      return true;
    }
    return false;
  };

  

  useEffect(() => {
    function handlePress(e: KeyboardEvent) {
      const _tries = JSON.parse(JSON.stringify(tries));
      switch (e.keyCode) {
        case 13: 
          setColumn(0);
          setRow(row + 1)
          break;
        case 8: 
          if(column === 1) {
            _tries[row][0] = "";
          } else {
            _tries[row][column - 1] = "";
          }
          setTries([..._tries]);
          setColumn(column - 1);
          break;
        default:
          if (checkCode(e.keyCode)) {
            e.stopPropagation();
            if (column < width && checkCode(e.keyCode)) {
              _tries[row][column] = e.key;
      
              setTries([..._tries]);
      
              setColumn(column + 1);
            } else {
              console.log("aaaaaa");
            }
          }
          break;
      }
      e.stopImmediatePropagation();
    }

    document.addEventListener("keyup", (e) => {
      handlePress(e);
    }, false)
  }, [ tries, column, row ]);

  return (
    <div id="container">
      <div id="header">
        <h1 id="title">
          Vocábulo
        </h1>
      </div>
      <div id="content">
        <div id="board">
          {tries.map((boardRow, i) => (
            <div className="row" key={`row-${i}`}>
              {boardRow.map((letter, j) => (
                <span className="letter" key={`row-${i}/column-${j}`}>{letter}</span>
              ))}
            </div>
          ))}
        </div>
        <div id="keyboard">
          <h1>teclado</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
