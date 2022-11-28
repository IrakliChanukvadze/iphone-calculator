import { useState } from "react";
import "./App.css";
import buttons from "./data/ButtonData";

function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState("0");
  const [reseted, setReseted] = useState(false);
  const makeTotal = () => {
    setNumber(eval(number));
  };

  const clicked = (value) => {
    if (value === "X") {
      value = "*";
    }
    if (
      number.length > 1 &&
      /[+*/%-]/.test(number[number.length - 1]) &&
      /[+*/%-]/.test(value)
    ) {
      console.log("asd");
      setNumber((prev) => prev.slice(0, -1) + value);
      return;
    }
    if (number === "0" && /[0-9]/.test(value)) {
      console.log(value);

      setNumber(`${value}`);
      return;
    }
    if (/[0-9]/.test(value) && reseted) {
      setNumber(value);
      setReseted(false);
      return;
    }
    setReseted(false);
    if (!number && value === ".") {
      setNumber("0.");
      return;
    }

    // if (!number && /[+*/-]/.test(value)) {
    //   return;
    // }

    if (value === "=") {
      if (number.match(/[+-/%*]/)) {
        setReseted(true);
      }
      makeTotal();
    } else if (value === "AC") {
      setNumber("0");
    } else setNumber((prev) => `${prev}${value}`);
  };
  const calcButtons = buttons.map((item) => (
    <button
      className={`${item.className} calc-button`}
      key={item.value}
      onClick={() => clicked(item.value)}
    >
      {!item.value && <div className="zero-squarer"></div>}
      {item.value}
    </button>
  ));

  return (
    <div className="App">
      <div className="calculator-container">
        <p className="number">{number}</p>

        <div className="calc">{calcButtons}</div>
      </div>
    </div>
  );
}

export default App;
