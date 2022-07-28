import './App.css';

function App() {
  return (
    <div className="App">
      <div className="inputAndOutputDiv">
        <div className="inputDiv">
          <label htmlFor="formulaInput">Insert the formula:</label><br/>
          <textarea id="formulaInput" name="formulaInput" rows="4" cols="50">
            *x0 (P(x0) | (~ P(x0))) 
          </textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
