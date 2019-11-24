import React, { useState, useEffect } from 'react';
import Square from './Square';

export default () => {

  // SETTING BOARD VALUES

  const [playBoxes, setPlayBoxes] = useState([])

  // Randomly assigns a value of 2 or 4 to a box
  const newBoxValue = () => {
    const probability = Math.random()
    if (probability < .9) {
      return 2;
    } else {
      return 4;
    }
  }
  // Returns the index of a random empty box, skipIndex is a box to be skipped manually
  const findEmptyBoxIndex = (boxes, skipIndex) => {
    const emptyBoxes = boxes.filter(box => (
      skipIndex === undefined ?
        box.val === null
        :
        box.index !== skipIndex
    ));
    const rand = Math.floor(Math.random() * emptyBoxes.length);
    return emptyBoxes[rand].index;
  }

  // Sets a value to a box by index
  const setBoxValueByIndex = (boxes, value, i) => {
    boxes[i] = { index: i, val: value }
  }

  // Creates an array from which to build an empty board of boxes
  const boxBuild = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  }

  // Resets playBoxes in state by building a blank board and filling in two boxes
  const startNewGame = () => {
    const emptyBoxes = boxBuild().map(i => ({
      index: i,
      val: null,
    }
    ))
    let firstIndex = findEmptyBoxIndex(emptyBoxes);
    setBoxValueByIndex(emptyBoxes, newBoxValue(), firstIndex);
    let secondIndex = findEmptyBoxIndex(emptyBoxes, firstIndex);
    setBoxValueByIndex(emptyBoxes, newBoxValue(), secondIndex);
    setPlayBoxes(emptyBoxes);
  }

  useEffect(() => {
    startNewGame()

  }, [])

  // BOARD MOVEMENT

  const getKeyCode = (e) => {
    return e.keyCode || e.charCode || 0
  }

  const getMovementPack = (e) => {
    const keyCode = getKeyCode(e);
    if (keyCode === 38 || keyCode === 87) {
      return {
        direction: 'up',
        moveBack: 'down',
        starterIndices: [0, 1, 2, 3]
      }
    }
    if (keyCode === 39 || keyCode === 68) {
      return {
        direction: 'right',
        moveBack: 'left',
        starterIndices: [3, 7, 11, 15]
      }
    }
    if (keyCode === 40 || keyCode === 83) {
      return {
        direction: 'down',
        moveBack: 'up',
        starterIndices: [15, 14, 13, 12]
      }
    }
    if (keyCode === 37 || keyCode === 65) {
      return {
        direction: 'left',
        moveBack: 'right',
        starterIndices: [12, 8, 4, 0]
      }

    }
  }

  const findBoxIndex = (i, dir, distance) => {
    if (dir === 'up') {
      if (i <= (3 + (4 * (distance - 1)))) {
        return null;
      } else {
        return i - (4 * distance);
      }
    }
    if (dir === 'right') {
      if (i % 4 === (3 - (distance - 1))) {
        return null;
      } else {
        return i + distance;
      }
    }
    if (dir === 'down') {
      if (i >= (12 - (4 * (distance - 1)))) {
        return null;
      } else {
        return i + (4 * distance);
      }
    }
    if (dir === 'left') {
      if (i % 4 === (0 + (distance - 1))) {
        return null;
      } else {
        return i - distance;
      }
    }
  }

  const moveBoxes = (e) => {
    let movementPack = getMovementPack(e);
    if (movementPack) {
      let newPlayBoxes = [];
      let boxesMoved = false;
      movementPack.starterIndices.forEach(i => {
        let boxRoot = { ...playBoxes[i] }
        let firstBoxBack = { ...playBoxes[findBoxIndex(i, movementPack.moveBack, 1)] };
        let secondBoxBack = { ...playBoxes[findBoxIndex(i, movementPack.moveBack, 2)] };
        let thirdBoxBack = { ...playBoxes[findBoxIndex(i, movementPack.moveBack, 3)] };
        if (boxRoot.val) {
          if (firstBoxBack.val) {
            if (firstBoxBack.val === boxRoot.val) {
              boxRoot.val *= 2
              firstBoxBack.val = null
              boxesMoved = true;
            }
          } else if (secondBoxBack.val) {
            if (secondBoxBack.val === boxRoot.val) {
              boxRoot.val *= 2
              secondBoxBack.val = null
              boxesMoved = true;
            }
          } else if (thirdBoxBack.val) {
            if (thirdBoxBack.val === boxRoot.val) {
              boxRoot.val *= 2
              thirdBoxBack.val = null
              boxesMoved = true;
            }
          }
        } else {
          if (firstBoxBack.val) {
            boxRoot.val = firstBoxBack.val;
            firstBoxBack.val = null;
            boxesMoved = true;
            if (secondBoxBack.val && secondBoxBack.val === boxRoot.val) {
              boxRoot.val *= 2;
              secondBoxBack.val = null;
            } else if (thirdBoxBack.val && thirdBoxBack.val === boxRoot.val) {
              boxRoot.val *= 2;
              thirdBoxBack.val = null;
            }
          } else if (secondBoxBack.val) {
            boxRoot.val = secondBoxBack.val;
            secondBoxBack.val = null;
            boxesMoved = true;
            if (thirdBoxBack.val && thirdBoxBack.val === boxRoot.val) {
              boxRoot.val *= 2;
              thirdBoxBack.val = null;
            }
          } else if (thirdBoxBack.val) {
            boxRoot.val = thirdBoxBack.val;
            thirdBoxBack.val = null;
            boxesMoved = true;
          }
        }

        if (firstBoxBack.val) {
          if (secondBoxBack.val) {
            if (secondBoxBack.val === firstBoxBack.val) {
              firstBoxBack.val *= 2
              secondBoxBack.val = null
              boxesMoved = true;
            }
          } else if (thirdBoxBack.val) {
            if (thirdBoxBack.val === firstBoxBack.val) {
              firstBoxBack.val *= 2
              thirdBoxBack.val = null
              boxesMoved = true;
            }
          }
        } else {
          if (secondBoxBack.val) {
            firstBoxBack.val = secondBoxBack.val;
            secondBoxBack.val = null;
            boxesMoved = true;
            if (thirdBoxBack.val && thirdBoxBack.val === firstBoxBack.val) {
              firstBoxBack.val *= 2;
              thirdBoxBack.val = null;
            }
          } else if (thirdBoxBack.val) {
            firstBoxBack.val = thirdBoxBack.val;
            thirdBoxBack.val = null;
            boxesMoved = true;
          }
        }

        if (secondBoxBack.val) {
          if (thirdBoxBack.val) {
            if (thirdBoxBack.val === secondBoxBack.val) {
              secondBoxBack.val *= 2
              thirdBoxBack.val = null
              boxesMoved = true;
            }
          }
        } else {
          if (thirdBoxBack.val) {
            secondBoxBack.val = thirdBoxBack.val;
            thirdBoxBack.val = null;
            boxesMoved = true;
          }
        }
        newPlayBoxes.push(boxRoot, firstBoxBack, secondBoxBack, thirdBoxBack)
      })
      
      newPlayBoxes.sort((a, b) => (a.index > b.index) ? 1 : -1)
      if (boxesMoved) {
        const emptyBoxes = newPlayBoxes.filter(box => (
          !box.val
        ))
        const random = Math.floor(Math.random() * emptyBoxes.length);
        const randomEmptyBoxInd = emptyBoxes[random].index;
        newPlayBoxes[randomEmptyBoxInd].val = newBoxValue()
      }
      setPlayBoxes(newPlayBoxes)
    }
  }



  return (
    <div className='game-board-container'>
      <div className='game-board'>
        {playBoxes.map(box => (
          <div key={box.index}>
            <Square box={box} />
          </div>
        ))}
      </div>
      <input className='hide' autoFocus onBlur={(e) => e.target.focus()} type='submit' name='click' onKeyDown={moveBoxes} />
      <br />
      <button id='reset-button' onClick={startNewGame}>New Game</button>
    </div>


  )
}