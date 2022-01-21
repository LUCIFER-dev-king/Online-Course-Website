export const checkObjIsEmptyOrNot = (object) => {
  if (
    Object === null ||
    Object.keys(object).length === 0 ||
    Object.getPrototypeOf(object) === {}
  )
    return true;
  else return false;
};

export const ShortButton = ({ buttonName }) => {
  return (
    <span
      style={{ cursor: "pointer" }}
      className="bg-dark text-light px-4 py-2 fw-bold"
    >
      {buttonName}
    </span>
  );
};

export const LargeButton = ({ buttonName }) => {
  return (
    <span
      style={{ cursor: "pointer" }}
      className="bg-dark mt-3 text-center w-100 text-light px-4 py-2 fw-bold"
    >
      {buttonName}
    </span>
  );
};

export const levelFinder = (level) => {
  switch (level) {
    case 1:
      return "Newbie";
    case 2:
      return "Intermediate";
    case 3:
      return "Advanced";
    default:
      return "None";
  }
};
