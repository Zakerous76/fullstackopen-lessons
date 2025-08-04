import CounterContext, { useCounterDispatch } from "../CounterContext";

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch;
  return (
    <button
      onClick={() => {
        return dispatch({ type });
      }}
    >
      {label}
    </button>
  );
};

export default Button;
