import React, { useState, useEffect } from 'react';

export default () => {

  const findUp = (i) => {
    if (i <= 3) {
      return null;
    } else {
      return i - 4;
    }
  }

  const findRight = (i) => {
    if (i % 4 === 3) {
      return null;
    } else {
      return i + 1;
    }
  }

  const findDown = (i) => {
    if (i >= 12) {
      return null;
    } else {
      return i + 4;
    }
  }

  const findLeft = (i) => {
    if (i % 4 === 0) {
      return null;
    } else {
      return i - 1;
    }
  }

  const movementStarter = (direction) => {
    if (direction === 'up') {
      return {
        start: [4, 5, 6, 7],
        moveback: 'down'
      }
    } else if (direction === 'right') {
      return {
        start: [2, 6, 10, 14],
        moveback: 'left'
      }
    } else if (direction === 'down') {
      return {
        start: [11, 10, 9, 8],
        moveback: 'up'
      }
    } else if (direction === 'left') {
      return {
        start: [13, 9, 5, 1],
        moveback: 'right'
      }
    }

  }

  const [playBoxes, setPlayBoxes] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => ({
    index: i,
    upInd: findUp(i),
    rightInd: findRight(i),
    downInd: findDown(i),
    leftInd: findLeft(i),
    val: null,
    upVal: null,
    rightVal: null,
    downVal: null,
    leftVal: null
  }
  )))

  // const randomSixteen = () => {
  //   return Math.floor(Math.random() * 16);
  // }

  const updateBoxBoundaries = () => {
    setPlayBoxes(prevBoxes =>
      prevBoxes.map(box => (
        {
          index: box.index,
          upInd: box.upInd,
          rightInd: box.rightInd,
          downInd: box.downInd,
          leftInd: box.leftInd,
          val: box.val,
          upVal: (prevBoxes[findUp(box.index)] && prevBoxes[findUp(box.index)].val) || null,
          rightVal: (prevBoxes[findRight(box.index)] && prevBoxes[findRight(box.index)].val) || null,
          downVal: (prevBoxes[findDown(box.index)] && prevBoxes[findDown(box.index)].val) || null,
          leftVal: (prevBoxes[findLeft(box.index)] && prevBoxes[findLeft(box.index)].val) || null

        }
      ))
    )
  }

  const fillSpecificBox = (i, val) => {
    let updatedBoxes = [...playBoxes]
    updatedBoxes[i] = { ...updatedBoxes[i], val: val }
    // console.log(i)
    // console.log(updatedBoxes)
    setPlayBoxes(updatedBoxes)
    updateBoxBoundaries();
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

    // if (input === 'ArrowUp' || input === 'ArrowRight' || input === 'ArrowDown' || input === 'ArrowLeft') {
    //   let direction = input.slice(5).toLowerCase();
    //   return direction;
    // }
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

  const findMovementValue = (val, destinationIs) => {
    if (destinationIs === 'open') {
      return val
    }
    if (destinationIs === 'match') {
      return val * 2
    }
  }

  const findMovementIndex = (i, direction, destinationIs) => {

    if (destinationIs === 'match' || playBoxes[playBoxes[i][`${direction}Ind`]][`${direction}Ind`].val) {
      return playBoxes[i][`${direction}Ind`]
    } else if (!playBoxes[playBoxes[i][`${direction}Ind`]][`${direction}Ind`].val) {


    }

  }

  const moveSpecificBox = (i, direction) => {
      let updatedBoxes = [...playBoxes]
      let val = findMovementValue(updatedBoxes[i].val)
      let index = findMovementIndex(i, direction)
      updatedBoxes[index] = { ...updatedBoxes[index], val: val }
      updatedBoxes[i] = { ...updatedBoxes[i], val: null }
      setPlayBoxes(updatedBoxes)
      updateBoxBoundaries();

  }

  const mapAndMove = (direction) => {
    if (direction) {
      let movementPackage = movementStarter(direction)
      // console.log(movePackage)
      movementPackage.start.forEach(i => {
        debugger;
        if (playBoxes[i].val) {
          moveSpecificBox(i, direction);
        }
        if (playBoxes[playBoxes[i][`${movementPackage.moveback}Ind`]].val) {
          moveSpecificBox(playBoxes[i][`${movementPackage.moveback}Ind`], direction)
        }
        // if (playBoxes[playBoxes[playBoxes[i][`${direction}Ind`]][`${direction}Ind`]].val) {
        //   updateBoxes(playBoxes[playBoxes[i][`${direction}Ind`]][`${direction}Ind`], direction)
        //   updateBoxes(playBoxes[i][`${direction}Ind`], direction)
        //   updateBoxes(i, direction);
        // }
      })

    }
  }

  const moveBoxes = (e) => {
    let input = getKeyCode(e)
    let direction = findDirection(input)
    mapAndMove(direction)

  }



  const newBoxValue = () => {
    const probability = Math.random()
    if (probability < .66) {
      return 2;
    } else {
      return 4;
    }
  }

  const attachKeyListener = () => {
    // document.body.addEventListener('keydown', moveBoxes);
  }


  const fillRandomBox = () => {
    const emptyBoxes = playBoxes.filter(box => (
      !box.val
    ))
    const random = Math.floor(Math.random() * emptyBoxes.length);
    const randomEmptyBoxInd = emptyBoxes[random].index;
    fillSpecificBox(randomEmptyBoxInd, newBoxValue())
  }


  useEffect(() => {
    // document.body.addEventListener('keydown', (e) => {
    //   const key = e.keyCode || e.charCode || 0;
    // });
    updateBoxBoundaries();
    fillRandomBox();
    attachKeyListener();



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