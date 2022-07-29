import React from 'react';

import './App.css';
import {formula_parser} from '../language-parser/formula.js';

class App extends React.Component {

  checkFormulaBtn() {
    let empty_line_re = /^\s*$/;
    let text_content = document.getElementById("formulaInput").value;
    console.log(text_content);
    let lines_not_empty = text_content.split('\n').filter(line => ! line.match(empty_line_re))
    console.log(lines_not_empty)
    if (lines_not_empty.length) {
      let formula = lines_not_empty[0];
      let result = formula_parser.run(formula);
      if (result.isError) {
        this.setOutput(result.error);
      } else {
        if (result.index < formula.length) {
          this.setOutput(`ParseError (position ${result.index}): got unexpected string "${formula.slice(result.index)}".`)
        } else {
          this.setOutput('Success!');
        }
      }
    } else {
      this.setOutput('No content to parse.')
    }
  }

  setOutput(text) {
    let output_tag = document.getElementById('formulaOutput');
    output_tag.innerHTML = text;
  }

  render() {
    return (
      <div className="App">
        <div className="inputAndOutputDiv">
          <div className="inputDiv">
            <label htmlFor="formulaInput">Insert the formula:</label><br/>
            <textarea id="formulaInput" name="formulaInput" rows="4" cols="50" defaultValue="*x0 (P(x0) | (~ P(x0)))">
            </textarea><br/>
            <input type="submit" value="Check formula" onClick={() => this.checkFormulaBtn()}></input><br/>
          </div>
          <p id="formulaOutput">Parse result: <i>waiting input...</i></p>
        </div>
        <div className="formulaExamples">
          See some examples:
          <ul>
            <li>
              Using disjunction: <span className="formulaSyntax"> (y1 | y2) </span>
            </li>
            <li>
              Using conjunction: <span className="formulaSyntax"> (y1 & y2) </span>
            </li>
            <li>
              Using implication: <span className="formulaSyntax"> (y1 =&gt; P(x12)) </span>
            </li>
            <li>
              Exists a x0 that don't have a property: <span className="formulaSyntax">!x0 (~ P(x0)) </span>
            </li>
            <li>
              For all x0, x0 implies x0: <span className="formulaSyntax">*x0 ( P(x0) =&gt; P(x0) ) </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
