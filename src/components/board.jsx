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
    // console.table(newGrid);
    addNumber(newGrid);
    // console.table(newGrid);
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
    console.log("swipe left");
    let oldGrid = data;
    let gridClone = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let currentRow = gridClone[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (currentRow[slow] === 0 && currentRow[fast] === 0) {
          fast++;
        } else if (currentRow[slow] === 0 && currentRow[fast] !== 0) {
          currentRow[slow] = currentRow[fast];
          currentRow[fast] = 0;
          fast++;
        } else if (currentRow[slow] !== 0 && currentRow[fast] === 0) {
          fast++;
        } else if (currentRow[slow] !== 0 && currentRow[fast] !== 0) {
          if (currentRow[slow] === currentRow[fast]) {
            currentRow[slow] += currentRow[fast];
            currentRow[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(gridClone)) {
      addNumber(gridClone);
    }
    setData(gridClone);
  };
  // Right swipe
  const swipeRight = () => {
    console.log("swipe right");
    let oldData = data;
    let gridClone = cloneDeep(data);

    for (let i = 3; i >= 0; i--) {
      let currentRow = gridClone[i];
      let slow = currentRow.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (currentRow[slow] === 0 && currentRow[fast] === 0) {
          fast--;
        } else if (currentRow[slow] === 0 && currentRow[fast] !== 0) {
          currentRow[slow] += currentRow[fast];
          currentRow[fast] = 0;
          fast--;
        } else if (currentRow[slow] !== 0 && currentRow[fast] === 0) {
          fast--;
        } else if (currentRow[slow] !== 0 && currentRow[fast] !== 0) {
          if (currentRow[slow] === currentRow[fast]) {
            currentRow[slow] += currentRow[fast];
            currentRow[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(gridClone) !== JSON.stringify(oldData)) {
      addNumber(gridClone);
    }
    setData(gridClone);
  };
  const handlerKeyDown = (event) => {
    switch (event.keyCode) {
      case ARROWS.left_arrow:
        swipeLeft();
        break;
      case ARROWS.right_arrow:
        swipeRight();
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
  );
};

export default Board;
