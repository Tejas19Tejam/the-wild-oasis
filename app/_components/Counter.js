"use client";

import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prevCount) => prevCount + 1);
  }
  console.log(users);
  return (
    <div>
      <button onClick={handleClick}>+</button>
      <h3>{count}</h3>
    </div>
  );
}

export default Counter;
