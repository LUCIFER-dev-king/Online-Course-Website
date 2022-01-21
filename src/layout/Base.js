import Header from "./Header";

const Base = ({ children }) => {
  return (
    <div className="container-fluid">
      <Header></Header>
      <div>{children}</div>
    </div>
  );
};

export default Base;
