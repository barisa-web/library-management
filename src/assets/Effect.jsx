
import { useState, useEffect } from "react";

function Effect() {
  const [count, setCount] = useState(0);

  useEffect(function () {
    console.log("The component mounted!");
    document.title = " you have counted:${count}";
  });

  return (
    <div>
      <h1>Count: {count}</h1>

      <button onClick={function () {
        setCount(count + 1);
      }}>
        Increase
      </button>
    </div>
  );
}

export default Effect;
