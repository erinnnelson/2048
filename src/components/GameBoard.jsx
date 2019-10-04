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
          down: box.down,
          left: box.left,
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
    console.log(playBoxes)

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

  const checkNeighbor = (box, direction) => {
    if (!box.val) {
      console.log(box.val)
      return
    }
    if (box.val === box[`${direction}Val`]) {
      return 'equal';
    } else if (box[`${direction}Ind`]) {
      return 'open';
    } else {
      return 'closed';
    }
  }

  const mapAndUpdate = (direction) => {
    if (direction) {
      console.log(playBoxes)
      // playBoxes.forEach(box => {
        // let neightborIs = checkNeighbor(box, direction);
        // console.log(neightborIs)
      // })
    }
  }

  const moveBoxes = (e, box) => {
    let input = getKeyCode(e)
    let direction = findDirection(input)
    mapAndUpdate(direction)
    // if (direction && box.val) {
    //   console.log(direction)
    //   let neighbor = checkNeighbor(box, direction);
    //   if (neighbor === 'open') {
    //     fillSpecificBox(box[`${direction}Ind`], box.val)

    //   }



    // }


  }



  const newBoxValue = () => {
    const probability = Math.random()
    if (probability < .66) {
      return 2;
    } else {
      return 4;
    }
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
    document.body.addEventListener('keydown', moveBoxes);
    updateBoxBoundaries();
    fillRandomBox();



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
      <button onClick={() => fillRandomBox()}>Click</button>

    </div>
  )
}