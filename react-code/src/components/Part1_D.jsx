import { useState } from "react";

const StateGroups = () => {
  const [counters, setCounters] = useState({
    top: 0,
    bottom: 0,
  });

  const [countersHistory, setCountersHistory] = useState([]);

  const [totalClicks, setTotalClicks] = useState(0);

  const handleTopCounter = () => {
    setCountersHistory(countersHistory.concat("T"));
    setCounters({
      ...counters,
      top: counters.top + 1,
    });
    const updatedTop = counters.top + 1;
    setTotalClicks(updatedTop + counters.bottom);
  };

  const handleBottomCounter = () => {
    setCountersHistory(countersHistory.concat("B"));
    setCounters({
      ...counters,
      bottom: counters.bottom + 1,
    });
    const updatedBottom = counters.bottom + 1;
    setTotalClicks(counters.top + updatedBottom);
  };

  return (
    <div>
      <div>
        <p>Counter Top: {counters.top}</p>
        <button onClick={handleTopCounter}>Increase</button>
      </div>
      <div>
        <p>Counter Bottom: {counters.bottom}</p>
        <button onClick={handleBottomCounter}>Increase Bottom</button>
      </div>
      <DisplayTotalClicks
        totalClicks={totalClicks}
        clicksHistory={countersHistory}
      />
    </div>
  );
};

const DisplayTotalClicks = ({ totalClicks, clicksHistory }) => {
  if (totalClicks > 0) {
    return (
      <div>
        <p>Total Clicks: {totalClicks}</p>
        <p>{clicksHistory}</p>
      </div>
    );
  }
  return (
    <div>
      <p>Start Clicking Away!!</p>
    </div>
  );
};

const PassingEventHandlersAsProps = () => {
  return (
    <>
      <div>
        <Button
          onClick={DisplayLog("Hello from the outside")}
          text="Kill me"
        ></Button>
      </div>
    </>
  );
};

const DisplayLog = (text) => {
  return () => console.log(text);
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  );
};

const Part1_D = () => {
  return (
    <div>
      <StateGroups />
      <PassingEventHandlersAsProps />
    </div>
  );
};

export default Part1_D;
