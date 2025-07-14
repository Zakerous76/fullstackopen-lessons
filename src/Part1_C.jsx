import { useEffect, useState } from "react";

const Hello = (props) => {
  const bornYear = () => {
    const now = new Date().getFullYear();
    console.log(now);
    return now - props.age;
  };

  return (
    <div>
      <p>
        Hello {props.name}! You are {props.age} years old.
      </p>
      <p>So you were probably born in {bornYear()}.</p>
    </div>
  );
};

const CounterComp = () => {
  const [counter, setCounter] = useState(0);

  //   Sets off a new interval at each re-render of Counter_Comp
  //   setInterval(() => setCounter(counter + 1), 1000);
  //   console.log("Rendering... ", counter);

  //   Do this instead
  useEffect(() => {
    // create one interval when the component mounts
    const id = setInterval(() => {
      // fetches the latest "counter" value
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => {
      // clean up after finishing
      clearInterval(id);
    };
  }, []); // empty dependecy array => run only once

  return <div>{counter}</div>;
};

const CounterOnClick = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <button onClick={() => setCounter(counter + 1)}>Click Me</button>
        <p>{counter}</p>
        <button onClick={() => setCounter(0)}>Reset</button>
      </div>
    </>
  );
};

const AllInOne = () => {
  const [counter, setCounter] = useState(0);
  const increaseByOne = () => setCounter((prev) => prev + 1);
  const decreaseByOne = () => setCounter((prev) => prev - 1);
  const reset = () => setCounter(0);

  return (
    <>
      <Display displayText={counter} />
      <Button onClick={increaseByOne} text="Increment by one" />
      <Button onClick={decreaseByOne} text="Decrement by one" />
      <Button onClick={reset} text="Reset Counter" />
    </>
  );
};

const Display = ({ displayText }) => {
  return (
    <>
      <div>
        <p>{displayText}</p>
      </div>
    </>
  );
};

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

const Part1_C = ({ name, age }) => {
  return (
    <>
      <div>
        {/* <Hello name={name} age={age}></Hello> */}
        {/* <CounterComp></CounterComp> */}
        {/* <CounterOnClick></CounterOnClick> */}
        <AllInOne></AllInOne>
      </div>
    </>
  );
};

export default Part1_C;
