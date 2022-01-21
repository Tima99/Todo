import React from 'react';

function List(props) {
    function HandleClick(e){
        props.remove(props.id)
        e.target.style.backgroundColor = 'indianred'
        e.target.style.borderColor = 'red'
    }
    
  return (
    <div className='list' id={props.id}>
        <h4>{props.item}</h4>
        <button onClick={HandleClick} type='button'>Done</button>
    </div>
  );
}

export default List;
