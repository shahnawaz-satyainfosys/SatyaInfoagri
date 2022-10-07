import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incNumber, decNumber } from './actions/index';

export const Counter = () => {
  const myState = useSelector(state => state.changeTheNumber);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <h1>Increament/Decrement counter</h1>
        <h4>React and Redux</h4>

        <div>
          <button>
            <a title="Decrement" onClick={() => dispatch(decNumber())}>
              <span>-</span>
            </a>
          </button>
          <input name="quantity" type="text" value={myState} />
          <button>
            <a title="Increment" onClick={() => dispatch(incNumber())}>
              <span>+</span>
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Counter;
