import React from 'react';

export default (props) => {
  return (
    <div className={`play-square  color${props.box.val}`}>
      <p>{props.box.val}</p>
    </div>
  )
}