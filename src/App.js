import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function getDeterminate(matrix, size){
  
  if(size === 2){
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  else if(size === 3){
    var line_1 = matrix[0][0] * matrix[1][1] * matrix[2][2];
    var line_2 = matrix[0][2] * matrix[1][0] * matrix[2][1];
    var line_3 = matrix[0][1] * matrix[1][2] * matrix[2][0];

    var first_part = line_1 + line_2 + line_3;

    var line_4 = matrix[0][2] * matrix[1][1] * matrix[2][0];
    var line_5 = matrix[0][0] * matrix[1][2] * matrix[2][1];
    var line_6 = matrix[0][1] * matrix[1][0] * matrix[2][2];

    var second_part = line_4 - line_5 - line_6;

    var result = first_part - second_part;

    return result;
  } else return 0
}

function App() {

  const [matrix, setMatrix] = useState([
    [1,3,3],
    [2,1,3],
    [3,2,2],
  ]);

  const [result, setResult] = useState(0);

  const [matrixSize, setMatrixSize] = useState(3);

  var replace = (matrix, i, j, value) => {
    var new_matrix = matrix.slice();
    new_matrix[i][j] = value;
    return new_matrix;
  }


  return (
    <div style={{display: "flex", alignContent: "center", justifyContent: "center", height: "100%", alignItems: "center", flexDirection: "column"}}>
      <div style={{display: "grid", gridTemplateColumns: matrixSize === 3 ? "auto auto auto" : "auto auto", columnGap: "5px", rowGap: "5px", marginBottom: "1rem"}}>
        {
          Array.from({length: matrixSize}, (_, k) => k).map(j =>
            Array.from({length: matrixSize}, (_, k) => k).map(i => <input id={`el_${j}_${i}`} value={matrix[j][i]} onChange={(e) => setMatrix(replace(matrix, j, i, Number(e.target.value)))} key={`el_${j}_${i}`} style={{width: "1rem", fontSize: "1.5rem"}}/>)
          )
        }
      </div>
      <div style={{display: "flex", justifyContent: "space-between", width: "5rem"}}>
        <button onClick={() => setMatrixSize(2)} style={{marginBottom: "1rem"}}>2x2</button>
        <button onClick={() => setMatrixSize(3)} style={{marginBottom: "1rem"}}>3x3</button>
      </div>
      <button onClick={() => setResult(getDeterminate(matrix, matrixSize))}>Calculate Determinant</button>
      {result !== 0 && <h1>{result}</h1>}
    </div>
  );
}

export default App;
