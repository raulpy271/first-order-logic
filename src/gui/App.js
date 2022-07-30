import React from 'react';

import './App.css';
import {formula_parser} from '../language-parser/formula.js';
import {allPredicateSymbolsInTreeAreInThisArray, getAllPredicateSymbols, getPredicateSymbolsNotInExpectedArray} from '../language-parser/tree_analyzer.js';

const empty_line_re = /^\s*$/;

class App extends React.Component {
  constructor() {
    super()
    this.use_custom_predicate_symbols = false;
    this.array_of_predicate_symbols = [];
  }

  parseArrayOfCustomSymbols(text) {
    let symbols = []
    let lines = text.split('\n');
    for (let line of lines) {
      let valuesInLineWithOptionalWhitespace = line.split(',')
      let valuesInLineWithEmptySpaces = valuesInLineWithOptionalWhitespace.map(v => v.trim());
      let valuesInLine = valuesInLineWithEmptySpaces.filter(value => ! value.match(empty_line_re))
      symbols = symbols.concat(valuesInLine);
    }
    return symbols;
  }

  setArrayOfCustomSymbols() {
    let textCustomSymbols = document.getElementById('customPredicateSymbolsInput').value;
    this.array_of_predicate_symbols = this.parseArrayOfCustomSymbols(textCustomSymbols);
    console.log(`Setting array of custom predicates: ${JSON.stringify(this.array_of_predicate_symbols)}`);
  }

  arrayOfCustomSymbolsAreValid() {
    let startWithXorY = /^(x|y)/;
    for (let customSymbol of this.array_of_predicate_symbols) {
      if (customSymbol.match(startWithXorY)) {
        return false;
      }
    }
    return true;
  }

  selectPredicateSymbols() {
    let predicateSymbolsCustomTag = document.getElementById('predicateSymbolsCustom');
    let textarea = document.getElementById('customPredicateSymbolsInput');
    this.use_custom_predicate_symbols = predicateSymbolsCustomTag.checked;
    if (this.use_custom_predicate_symbols) {
      textarea.style.display = "inline";
    } else {
      this.array_of_predicate_symbols = [];
      textarea.style.display = "none";
    }
  }

  checkFormulaBtn() {
    let text_content = document.getElementById("formulaInput").value;
    console.log(text_content);
    let lines_not_empty = text_content.split('\n').filter(line => ! line.match(empty_line_re))
    console.log(lines_not_empty)
    if (lines_not_empty.length) {
      let formula = lines_not_empty[0];
      let result = formula_parser.run(formula);
      if (result.isError) {
        this.setOutput(result.error, true);
      } else {
        if (result.index < formula.length) {
          this.setOutput(`ParseError (position ${result.index}): got unexpected string "${formula.slice(result.index)}".`, true)
        } else {
          if (!this.use_custom_predicate_symbols) {
            this.setOutput('Success!');
          } else {
            this.setArrayOfCustomSymbols();
            if (this.arrayOfCustomSymbolsAreValid()) {
              console.log(`all predicates in formula: ${getAllPredicateSymbols(result.result)}`)
              let formulaUseCustomSymbols = allPredicateSymbolsInTreeAreInThisArray(result.result, this.array_of_predicate_symbols);
              if (formulaUseCustomSymbols) {
                this.setOutput('Success!');
              } else {
                this.setOutput(`Got unexpected predicate symbol "${getPredicateSymbolsNotInExpectedArray(result.result,  this.array_of_predicate_symbols)}".`, true)
              }
            } else {
              this.setOutput('Custom predicate symbols can\'t start with <span class="formulaSyntax">x</span> or <span class="formulaSyntax">y</span>', true)
            }
          }
        }
      }
    } else {
      this.setOutput('No content to parse.', true)
    }
  }

  setOutput(text, error) {
    let output_tag = document.getElementById('formulaOutput');
    if (error) {
      output_tag.classList = ["outputError"]
    } else {
      output_tag.classList = ["outputSuccess"]
    }
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
            <div className="predicateSymbols">
              <label id="predicateSymbolsPTag">Predicate symbols:</label><br/>
              <input type="radio" id="predicateSymbolsAllSymbols" name="predicateSymbols" defaultChecked onChange={() => this.selectPredicateSymbols()}/>
              <label htmlFor="predicateSymbolsAllSymbols">All visible characters</label>
              <input type="radio" id="predicateSymbolsCustom" name="predicateSymbols" onChange={() => this.selectPredicateSymbols()}/>
              <label htmlFor="predicateSymbolsCustom">A custom character set</label><br/>
              <textarea id="customPredicateSymbolsInput" name="customPredicateSymbolsInput" rows="1" cols="30" defaultValue="P, Q, S"></textarea>
            </div>
            <input type="submit" value="Check formula" onClick={() => this.checkFormulaBtn()}></input><br/>
          </div>
          <span id="formulaOutput">Parse result: <i>waiting input...</i></span>
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
