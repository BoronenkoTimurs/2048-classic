import cloneDeep from "lodash.clonedeep";
import { useEffect, useState } from "react";
import Block from "./block";
import { ARROWS } from "../const";
import { useEvent } from "../utils/utils";

const Board = () => {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  // Grid init
  const initialize = () => {
    let newGrid = cloneDeep(data);

    addNumber(newGrid);
    console.table(newGrid);
    addNumber(newGrid);
    console.table(newGrid);
    setData(newGrid);
  };

  // AddNumbers
  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;

    while (!added) {
      if (gridFull) {
        break;
      }
      let random1 = Math.floor(Math.random() * 4);
      let random2 = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[random1][random2] === 0) {
        newGrid[random1][random2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  };
  // Left swipe
  const swipeLeft = () => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    setData(newArray);
  };

  const handlerKeyDown = (event) => {
    switch (event.keyCode) {
      case ARROWS.left_arrow:
        swipeLeft();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    initialize();
  }, []);
  useEvent("keydown", handlerKeyDown);
  return (
    <>
      <div className="gameBoard">
        {data.map((row, oneIndex) => {
          return (
            <div className="flex" key={oneIndex}>
              {row.map((digit, index) => (
                <Block num={digit} key={index} />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Board;
