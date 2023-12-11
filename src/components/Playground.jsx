const Playground = () => {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  return (
    <div className="gameBody">
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
};
const Block = ({ num }) => {
  return <div className="square">{num}</div>;
};

export default Playground;
