import { useState } from "react";

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  return (
    <div className="bg-gameBackground w-max m-auto p-2 rounded-md mt-3">
      {data.map((row, oneIndex) => {
        return (
          <div className="flex" key={oneIndex}>
            {row.map((digit, index) => (
              <Block num={digit} key={index} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
const Block = ({ num }) => {
  return <div>{num}</div>;
};

export default App;
