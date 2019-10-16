import React, { useState, useEffect } from 'react';

export default () => {

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

  // const rightFindBox = (i, distance) => {
  //   if (i % 4 === (3 - (distance - 1))) {
  //     return null;
  //   } else {
  //     return i + distance;
  //   }
  // }

  // const downFindBox = (i, distance) => {
  //   if (i >= (12 - (4 * (distance - 1)))) {
  //     return null;
  //   } else {
  //     return i + (4 * distance);
  //   }
  // }

  // const leftFindBox = (i, distance) => {
  //   if (i % 4 === (0 + (distance - 1))) {
  //     return null;
  //   } else {
  //     return i - distance;
  //   }
  // }

  const findX = (i) => {
    if (i >= 12) {
      return 0
    }
    if (i >= 8 && i < 12) {
      return 1
    }
    if (i >= 4 && i < 8) {
      return 2
    }
    if (i >= 0 && i < 4) {
      return 3;
    }
  }

  const findY = (i) => {
    return i % 4;
  }

  const movementStarter = (direction) => {
    if (direction === 'up') {
      return {
        start: [0, 1, 2, 3],
        moveback: 'down'
      }
    } else if (direction === 'right') {
      return {
        start: [3, 7, 11, 15],
        moveback: 'left'
      }
    } else if (direction === 'down') {
      return {
        start: [15, 14, 13, 12],
        moveback: 'up'
      }
    } else if (direction === 'left') {
      return {
        start: [12, 8, 4, 0],
        moveback: 'right'
      }
    }

  }

  const [playBoxes, setPlayBoxes] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => ({
    index: i,
    // x: findX(i),
    // y: findY(i),
    justDoubled: false,
    val: null,
  }
  )))

  // const randomSixteen = () => {
  //   return Math.floor(Math.random() * 16);
  // }

  const fillSpecificBox = (i, val) => {
    let updatedBoxes = [...playBoxes]
    updatedBoxes[i] = { ...updatedBoxes[i], val: val }
    // console.log(i)
    // console.log(updatedBoxes)
    setPlayBoxes(updatedBoxes)
  }


  const getKeyCode = (e) => {
    return e.keyCode || e.charCode || 0
  }

  const findDirection = (input) => {
    if (input === 38 || input === 87) {
      return 'up'
    }
    if (input === 39 || input === 68) {
      return 'right'
    }
    if (input === 40 || input === 83) {
      return 'down'
    }
    if (input === 37 || input === 65) {
      return 'left'
    }

  }

  const checkDestination = (i, direction) => {
    if (!playBoxes[i][`${direction}Ind`]) {
      return false
    } else if (playBoxes[i].val === playBoxes[i][`${direction}Val`]) {
      return 'match';
    } else if (!playBoxes[i][`${direction}Val`]) {
      return 'open';
    } else {
      return false;
    }
  }

  const destinationInfo = (i, direction, iRange) => {

    let indexTwo;
    let indexThree;
    let indexFour;

    if (iRange = 1) {
      let indexTwo = playBoxes[i][`${direction}Ind`];
      if (playBoxes[indexTwo].val && playBoxes[i].val !== playBoxes[indexTwo].val) {
        return {
          index: i,
          val: playBoxes[i].val
        }
      }
      if (playBoxes[indexTwo].val && playBoxes[i].val === playBoxes[indexTwo].val) {
        return {
          index: indexTwo,
          val: playBoxes[i].val * 2
        }
      }
      if (playBoxes[indexTwo].val === null && playBoxes[indexTwo][`${direction}Ind`]) {
        return {
          index: indexTwo,
          val: playBoxes[i].val
        }
      }
    }
    if (iRange >= 2) {
      let indexThree = playBoxes[indexTwo][`${direction}Ind`];
      if (playBoxes[indexThree].val && playBoxes[i].val !== playBoxes[indexThree].val) {
        return {
          index: indexTwo,
          val: playBoxes[i].val
        }
      }
      if (playBoxes[indexThree].val && playBoxes[i].val === playBoxes[indexThree].val) {
        return {
          index: indexThree,
          val: playBoxes[i].val * 2
        }
      }
      if (playBoxes[indexThree].val === null && playBoxes[indexThree][`${direction}Ind`]) {
        return {
          index: indexThree,
          val: playBoxes[i].val
        }
      }
    }
  }






  const moveBoxRows = (i, direction, iRange) => {
    let destinationPackage = destinationInfo(i, direction, iRange)
    let updatedBoxes = [...playBoxes]
    updatedBoxes[destinationPackage.index] = { ...updatedBoxes[destinationPackage.index], val: destinationPackage.val }
    updatedBoxes[i] = { ...updatedBoxes[i], val: null }
    setPlayBoxes(updatedBoxes)

  }

  const fillRandomBox = () => {
    const emptyBoxes = playBoxes.filter(box => (
      !box.val
    ))
    const random = Math.floor(Math.random() * emptyBoxes.length);
    const randomEmptyBoxInd = emptyBoxes[random].index;
    fillSpecificBox(randomEmptyBoxInd, newBoxValue())
  }



  const moveBoxes = (e) => {
    let input = getKeyCode(e)
    let direction = findDirection(input)
    if (direction) {
      console.log(direction)
      let movementPackage = movementStarter(direction)
      let newPlayBoxes = [];
      movementPackage.start.forEach(i => {
        let copyBox = { ...playBoxes[i] }
        // console.log(playBoxes[findBoxIndex(i, movementPackage.moveback, 3)].index)
        let firstBoxBack = { ...playBoxes[findBoxIndex(i, movementPackage.moveback, 1)] };
        let secondBoxBack = { ...playBoxes[findBoxIndex(i, movementPackage.moveback, 2)] };
        let thirdBoxBack = { ...playBoxes[findBoxIndex(i, movementPackage.moveback, 3)] };
        if (copyBox.val) {
          if (firstBoxBack.val) {
            if (firstBoxBack.val === copyBox.val) {
              copyBox.val *= 2
              firstBoxBack.val = null
            }
          } else if (secondBoxBack.val) {
            if (secondBoxBack.val === copyBox.val) {
              copyBox.val *= 2
              secondBoxBack.val = null
            }
          } else if (thirdBoxBack.val) {
            if (thirdBoxBack.val === copyBox.val) {
              copyBox.val *= 2
              thirdBoxBack.val = null
            }
          }
        } else {
          if (firstBoxBack.val) {
            copyBox.val = firstBoxBack.val;
            firstBoxBack.val = null;
          } else if (secondBoxBack.val) {
            copyBox.val = secondBoxBack.val;
            secondBoxBack.val = null;
          } else if (thirdBoxBack.val) {
            copyBox.val = thirdBoxBack.val;
            thirdBoxBack.val = null;
          }
        }

        if (firstBoxBack.val) {
          if (secondBoxBack.val) {
            if (secondBoxBack.val === firstBoxBack.val) {
              firstBoxBack.val *= 2
              secondBoxBack.val = null
            }
          } else if (thirdBoxBack.val) {
            if (thirdBoxBack.val === firstBoxBack.val) {
              firstBoxBack.val *= 2
              thirdBoxBack.val = null
            }
          }
        } else {
          if (secondBoxBack.val) {
            firstBoxBack.val = secondBoxBack.val;
            secondBoxBack.val = null;
          } else if (thirdBoxBack.val) {
            firstBoxBack.val = thirdBoxBack.val;
            thirdBoxBack.val = null;
          }
        }

        if (secondBoxBack.val) {
          if (thirdBoxBack.val) {
            if (thirdBoxBack.val === secondBoxBack.val) {
              secondBoxBack.val *= 2
              thirdBoxBack.val = null
            }
          }
        } else {
          if (thirdBoxBack.val) {
            secondBoxBack.val = thirdBoxBack.val;
            secondBoxBack.val = null;
          }
        }
        newPlayBoxes.push(copyBox, firstBoxBack, secondBoxBack, thirdBoxBack)

      })
      newPlayBoxes.sort((a, b) => (a.index > b.index) ? 1 : -1)

      const emptyBoxes = newPlayBoxes.filter(box => (
        !box.val
      ))
      const random = Math.floor(Math.random() * emptyBoxes.length);
      const randomEmptyBoxInd = emptyBoxes[random].index;
      newPlayBoxes[randomEmptyBoxInd].val = newBoxValue()

      setPlayBoxes(newPlayBoxes)

    }

  }



  const newBoxValue = () => {
    const probability = Math.random()
    if (probability < .66) {
      return 2;
    } else {
      return 4;
    }
  }


  useEffect(() => {
    fillRandomBox();
    console.log(playBoxes)



  }, [])

  return (
    <div className='game-board-container'>
      <div className='game-board'>
        {playBoxes.map(box => (
          <div className='play-square' key={box.index}>
            <p>{box.val}</p>
          </div>
        ))}

      </div>
      <input className='hide' autoFocus onBlur={(e) => e.target.focus()} type='submit' name='click' onKeyDown={moveBoxes} onClick={() => fillRandomBox()} />

    </div>
  )
}