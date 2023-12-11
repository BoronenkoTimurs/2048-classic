const Block = ({ num }) => {
  return (
    <div
      style={{
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
      className="square"
    >
      {num}
    </div>
  );
};

export default Block;
