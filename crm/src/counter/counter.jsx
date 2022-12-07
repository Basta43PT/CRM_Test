import React, { useState } from "react";

export function Counter(props) {
  const [count, setCount] = useState(0);

  const updateAmountAdd = () => {
    setCount(count + 1);
    props.amount = count;
  };

  const updateAmountSub = () => {
    if (count > 0) {
      setCount(count - 1);
      props.amount = count;
    }
  };

  return (
    <div>
      <button onClick={updateAmountAdd}>+</button>
      {count}
      <button onClick={updateAmountSub}>-</button>
    </div>
  );
}
