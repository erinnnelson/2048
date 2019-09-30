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

  const randomSixteen = () => {
    return Math.floor(Math.random() * 16);
  }
  // const [firstRandom, setFirstRandom] = useState(0)
  // const [secondRandom, setSecondRandom] = useState(0)

  // const createBoardBoxes = () => {
  //   for (let i = 0; i < 16; i += 1) {
  //     setPlayBoxes(oldBoxes => [...oldBoxes, {
  //       index: i,
  //       upInd: findUp(i),
  //       rightInd: findRight(i),
  //       downInd: findDown(i),
  //       leftInd: findLeft(i),
  //       val: null,
  //       upVal: null,
  //       rightVal: null,
  //       downVal: null,
  //       leftVal: null
  //     }])
  //   }
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

  // const updateBoxBoundaries = () => {
  //   setPlayBoxes(oldBoxes => [{
  //     index: oldBoxes[0].index,
  //     upInd: oldBoxes[0].upInd,
  //     rightInd: oldBoxes[0].rightInd,
  //     downInd: oldBoxes[0].downInd,
  //     leftInd: oldBoxes[0].leftInd,
  //     val: oldBoxes[0].val,
  //     upVal: null,
  //     rightVal: oldBoxes[1].val,
  //     downVal: oldBoxes[4].val,
  //     leftVal: null
  //   },
  //   {
  //     index: oldBoxes[1].index,
  //     upInd: oldBoxes[1].upInd,
  //     rightInd: oldBoxes[1].rightInd,
  //     downInd: oldBoxes[1].downInd,
  //     leftInd: oldBoxes[1].leftInd,
  //     val: oldBoxes[1].val,
  //     upVal: null,
  //     rightVal: oldBoxes[2].val,
  //     downVal: oldBoxes[5].val,
  //     leftVal: oldBoxes[0].val
  //   },
  //   {
  //     index: oldBoxes[2].index,
  //     upInd: oldBoxes[2].upInd,
  //     rightInd: oldBoxes[2].rightInd,
  //     downInd: oldBoxes[2].downInd,
  //     leftInd: oldBoxes[2].leftInd,
  //     val: oldBoxes[2].val,
  //     upVal: null,
  //     rightVal: oldBoxes[3].val,
  //     downVal: oldBoxes[6].val,
  //     leftVal: oldBoxes[1].val
  //   },
  //   {
  //     index: oldBoxes[3].index,
  //     upInd: oldBoxes[3].upInd,
  //     rightInd: oldBoxes[3].rightInd,
  //     downInd: oldBoxes[3].downInd,
  //     leftInd: oldBoxes[3].leftInd,
  //     val: oldBoxes[3].val,
  //     upVal: null,
  //     rightVal: null,
  //     downVal: oldBoxes[7].val,
  //     leftVal: oldBoxes[2].val
  //   },
  //   {
  //     index: oldBoxes[4].index,
  //     upInd: oldBoxes[4].upInd,
  //     rightInd: oldBoxes[4].rightInd,
  //     downInd: oldBoxes[4].downInd,
  //     leftInd: oldBoxes[4].leftInd,
  //     val: oldBoxes[4].val,
  //     upVal: oldBoxes[0].val,
  //     rightVal: oldBoxes[5].val,
  //     downVal: oldBoxes[8].val,
  //     leftVal: null
  //   },
  //   {
  //     index: oldBoxes[5].index,
  //     upInd: oldBoxes[5].upInd,
  //     rightInd: oldBoxes[5].rightInd,
  //     downInd: oldBoxes[5].downInd,
  //     leftInd: oldBoxes[5].leftInd,
  //     val: oldBoxes[5].val,
  //     upVal: oldBoxes[1].val,
  //     rightVal: oldBoxes[6].val,
  //     downVal: oldBoxes[9].val,
  //     leftVal: oldBoxes[4].val
  //   },
  //   {
  //     index: oldBoxes[6].index,
  //     upInd: oldBoxes[6].upInd,
  //     rightInd: oldBoxes[6].rightInd,
  //     downInd: oldBoxes[6].downInd,
  //     leftInd: oldBoxes[6].leftInd,
  //     val: oldBoxes[6].val,
  //     upVal: oldBoxes[2].val,
  //     rightVal: oldBoxes[7].val,
  //     downVal: oldBoxes[10].val,
  //     leftVal: oldBoxes[5].val
  //   },
  //   {
  //     index: oldBoxes[7].index,
  //     upInd: oldBoxes[7].upInd,
  //     rightInd: oldBoxes[7].rightInd,
  //     downInd: oldBoxes[7].downInd,
  //     leftInd: oldBoxes[7].leftInd,
  //     val: oldBoxes[7].val,
  //     upVal: oldBoxes[3].val,
  //     rightVal: null,
  //     downVal: oldBoxes[11].val,
  //     leftVal: oldBoxes[6].val
  //   },
  //   {
  //     index: oldBoxes[8].index,
  //     upInd: oldBoxes[8].upInd,
  //     rightInd: oldBoxes[8].rightInd,
  //     downInd: oldBoxes[8].downInd,
  //     leftInd: oldBoxes[8].leftInd,
  //     val: oldBoxes[8].val,
  //     upVal: oldBoxes[4].val,
  //     rightVal: oldBoxes[9].val,
  //     downVal: oldBoxes[12].val,
  //     leftVal: null
  //   },
  //   {
  //     index: oldBoxes[9].index,
  //     upInd: oldBoxes[9].upInd,
  //     rightInd: oldBoxes[9].rightInd,
  //     downInd: oldBoxes[9].downInd,
  //     leftInd: oldBoxes[9].leftInd,
  //     val: oldBoxes[9].val,
  //     upVal: oldBoxes[5].val,
  //     rightVal: oldBoxes[10].val,
  //     downVal: oldBoxes[13].val,
  //     leftVal: oldBoxes[8].val
  //   },
  //   {
  //     index: oldBoxes[10].index,
  //     upInd: oldBoxes[10].upInd,
  //     rightInd: oldBoxes[10].rightInd,
  //     downInd: oldBoxes[10].downInd,
  //     leftInd: oldBoxes[10].leftInd,
  //     val: oldBoxes[10].val,
  //     upVal: oldBoxes[6].val,
  //     rightVal: oldBoxes[11].val,
  //     downVal: oldBoxes[14].val,
  //     leftVal: oldBoxes[9].val
  //   },
  //   {
  //     index: oldBoxes[11].index,
  //     upInd: oldBoxes[11].upInd,
  //     rightInd: oldBoxes[11].rightInd,
  //     downInd: oldBoxes[11].downInd,
  //     leftInd: oldBoxes[11].leftInd,
  //     val: oldBoxes[11].val,
  //     upVal: oldBoxes[7].val,
  //     rightVal: null,
  //     downVal: oldBoxes[15].val,
  //     leftVal: oldBoxes[10].val
  //   },
  //   {
  //     index: oldBoxes[12].index,
  //     upInd: oldBoxes[12].upInd,
  //     rightInd: oldBoxes[12].rightInd,
  //     downInd: oldBoxes[12].downInd,
  //     leftInd: oldBoxes[12].leftInd,
  //     val: oldBoxes[12].val,
  //     upVal: oldBoxes[8].val,
  //     rightVal: oldBoxes[13].val,
  //     downVal: null,
  //     leftVal: null,
  //   },
  //   {
  //     index: oldBoxes[13].index,
  //     upInd: oldBoxes[13].upInd,
  //     rightInd: oldBoxes[13].rightInd,
  //     downInd: oldBoxes[13].downInd,
  //     leftInd: oldBoxes[13].leftInd,
  //     val: oldBoxes[13].val,
  //     upVal: oldBoxes[9].val,
  //     rightVal: oldBoxes[14].val,
  //     downVal: null,
  //     leftVal: oldBoxes[12].val
  //   },
  //   {
  //     index: oldBoxes[14].index,
  //     upInd: oldBoxes[14].upInd,
  //     rightInd: oldBoxes[14].rightInd,
  //     downInd: oldBoxes[14].downInd,
  //     leftInd: oldBoxes[14].leftInd,
  //     val: oldBoxes[14].val,
  //     upVal: oldBoxes[10].val,
  //     rightVal: oldBoxes[15].val,
  //     downVal: null,
  //     leftVal: oldBoxes[13].val
  //   },
  //   {
  //     index: oldBoxes[15].index,
  //     upInd: oldBoxes[15].upInd,
  //     rightInd: oldBoxes[15].rightInd,
  //     downInd: oldBoxes[15].downInd,
  //     leftInd: oldBoxes[15].leftInd,
  //     val: oldBoxes[15].val,
  //     upVal: oldBoxes[11].val,
  //     rightVal: null,
  //     downVal: null,
  //     leftVal: oldBoxes[14].val
  //   }
  //   ])
  // }

  // const setStarterBoxes = () => {
  //   let randomValOne = randomSixteen()
  //   let randomValTwo = randomSixteen()
  //   if (randomValOne === randomValTwo && randomValOne < 15) {
  //     randomValTwo += 1
  //   } else if (randomValOne === randomValTwo && randomValOne === 15) {
  //     randomValTwo -= 1
  //   }
  //   setFirstRandom(randomValOne)
  //   setSecondRandom(randomValTwo)




  // }
  const twoOrFour = () => {
    const variable = Math.random;
    console.log(variable)
  }

  const fillRandomBox = () => {
    let randomInd = randomSixteen()
    if (playBoxes[randomInd].val) {
      fillRandomBox()
      return
    }
    setPlayBoxes(prevBoxes => {
      const updatedBoxes = prevBoxes;
      updatedBoxes[randomInd].val = 4
      return updatedBoxes
    })
    console.log(randomInd)
    console.log(playBoxes[randomInd.val])

  }

  useEffect(() => {
    // createBoardBoxes();
    updateBoxBoundaries();
    // fillRandomBox();
    twoOrFour();



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
      <button onClick={fillRandomBox}>Click</button>

    </div>
  )
}