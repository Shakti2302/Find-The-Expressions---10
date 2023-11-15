import React, { useState } from "react";
import "./RandomNumberGame.css"

const RandomNumberGame = () => {
  const [numbers, setNumbers] = useState([]);
  const [userExpression, setUserExpression] = useState("");
  const [result, setResult] = useState(null);

  const generateNumbers = () => {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
  };

  const evaluateUserExpression = () => {
    try {
      // Check if the user's input contains only the current round's numbers
      const userNumbers = userExpression.match(/\d+/g);
      if (
        userNumbers &&
        userNumbers.every((num) => numbers.includes(parseInt(num, 10)))
      ) {
        const calculatedResult = eval(userExpression);
        setResult(calculatedResult === 10 ? "Correct!" : "Incorrect");
      } else {
        setResult("Only use numbers from above");
      }
    } catch (error) {
      setResult("Invalid expression");
    }
  };

  const findNumbersFor10 = () => {
    let found = false;
    while (!found) {
      const newNumbers = generateNumbers();
      setNumbers(newNumbers);
      found = evaluateNumbersFor10(newNumbers);
    }
  };

  const evaluateNumbersFor10 = (newNumbers) => {
    const possibleExpressions = generatePossibleExpressions(newNumbers);
    for (const expr of possibleExpressions) {
      if (eval(expr) === 10) {
        setUserExpression(expr);
        setResult(null);
        return true;
      }
    }
    return false;
  };

  const generatePossibleExpressions = (numbers) => {
    const ops = ["+", "-", "*", "/"];
    const permutations = getPermutations(numbers);
    const expressions = [];
    permutations.forEach((perm) => {
      for (let i = 0; i < ops.length; i++) {
        for (let j = 0; j < ops.length; j++) {
          for (let k = 0; k < ops.length; k++) {
            expressions.push(
              `${perm[0]} ${ops[i]} ${perm[1]} ${ops[j]} ${perm[2]} ${ops[k]} ${perm[3]}`
            );
          }
        }
      }
    });
    return expressions;
  };

  const getPermutations = (arr) => {
    if (arr.length === 1) {
      return [arr];
    }

    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const permutations = getPermutations(remaining);
      for (const perm of permutations) {
        result.push([current, ...perm]);
      }
    }
    return result;
  };

  return (
    <div className="random-number-game-container">
      <h2 className="random-number-game">Find The Expressions</h2>
      <p className="random-number-game-numbers">
        Numbers: {numbers.join(", ")}
      </p>
      <p>
        Enter expression:
        <input
          className="random-number-game-input"
          type="text"
          // value={userExpression}
          onChange={(e) => setUserExpression(e.target.value)}
          placeholder="Use the numbers above and operators (+, -, *, /)"
        />
      </p>
      <p className="random-number-game-result">Result: {result}</p>
      <div className="random-number-game-buttons">
        <button
          className="random-number-game-button"
          onClick={evaluateUserExpression}
        >
          Check Result
        </button>
        <button
          className="random-number-game-button"
          onClick={findNumbersFor10}
        >
          Generate Numbers for 10
        </button>
      </div>
     
    </div>
  );
};

export default RandomNumberGame;
