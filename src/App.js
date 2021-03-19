import React, { Component } from "react";

//2.00.00

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+"];
const ids = {
  7: 'seven',
  8: 'eight',
  9: 'nine',
  4: 'four',
  5: 'five',
  6: 'six',
  1: 'one',
  2: 'two',
  3: 'three',
  0: 'zero',
  "/": 'divide',
  "*": 'multiply',
  "-": 'subtract',
  "+": 'add'
}

export default class App extends Component {
  state = {
    calc: "0",
    operation: undefined,
    lastPressed: undefined,
  };

  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText) {
      case "AC": {
        this.setState({
          calc: "0",
        });
        break;
      }
      case "=": {
        const evalued = eval(calc);
        this.setState({
          calc: evalued,
        });
        break;
      }
      case ".": {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if(!last.includes('.')) {
          this.setState ({
            calc: calc+'.'
          })
        }
        break;
      }
      default: {
        let e = undefined;

        if (ops.includes(innerText)) {
          if (ops.includes(lastPressed) && innerText !== "-") {
            const lastNumIdx = calc.split('').reverse()
            .findIndex(char => char !== ' ' && nums.includes(+char));
            e = calc.slice(0, calc.length - lastNumIdx) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else {
          e = calc === "0" ? innerText : calc + innerText;
        }
        this.setState({
          calc: e
        });
      }
    }

    this.setState({
      lastPressed: innerText
    })

  };

  // handleClick = (e) => {
  //   const { currentNum, calc, operation, lastPressed } = this.state;
  //   const { innerText } = e.target;

  //   this.setState({
  //     lastPressed: innerText
  //   })

  //   if (!Number.isNaN(Number(innerText))) {
  //     if (currentNum === "0") {
  //       this.setState({
  //         currentNum: innerText,
  //       });
  //     } else {
  //       this.setState({
  //         currentNum: currentNum + innerText,
  //       });
  //     }

  //     return;
  //   }

  //   switch (innerText) {
  //     case "AC": {
  //       this.setState({
  //         currentNum: "0",
  //         calc: undefined,
  //         operation: undefined,
  //       });
  //       break;
  //     }
  //     case ".": {
  //       if (!currentNum.includes(".")) {
  //         this.setState({
  //           currentNum: currentNum + innerText,
  //         });
  //       }
  //       break;
  //     }
  //     default: {
  //       if (!operation) {
  //         this.setState({
  //           operation: innerText,
  //           calc: currentNum,
  //           currentNum: "",
  //         });
  //       } else if (innerText === "=") {
  //         const evalued = eval(`${calc} ${operation} ${currentNum}`);
  //         this.setState({
  //           operation: undefined,
  //           calc: evalued,
  //           currentNum: evalued,
  //         });
  //       } else {
  //         const evalued = eval(`${calc} ${operation} ${currentNum}`);
  //         this.setState({
  //           operation: innerText,
  //           calc: evalued,
  //           currentNum: evalued
  //         })
  //       }
  //     }
  //   }

  //   //alert(innerText);
  // };

  render() {
    const { currentNum, calc } = this.state;

    return (
      <div className="calculator">
        <p style={{ position: "absolute", top: 0 }}>
          {JSON.stringify(this.state, null, 2)}
        </p>
        <div className="display" id="display">
          {/* <small>{calc}</small> */}
          {calc}
        </div>
        <div className="nums-container">
          <button className="big-h clear-color ac" onClick={this.handleClick} id='clear'>
            AC
          </button>
          {nums.map((num) => (
            <button
              className={`num-color ${num === 0 && "big-h"}`}
              key={num}
              onClick={this.handleClick}
              id={ids[num]}
            >
              {num}
            </button>
          ))}
          <button className="clear-color" onClick={this.handleClick} id="decimal">
            .
          </button>
        </div>
        <div className="ops-container">
          {ops.map((op) => (
            <button className="op-color" key={op} onClick={this.handleClick} id={ids[op]}>
              {op}
            </button>
            
          ))}
          <button className="op-color" onClick={this.handleClick} id="equals">
            =
          </button>
        </div>
      </div>
    );
  }
}
