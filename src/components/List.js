import "../styles/List.css";
// eslint-disable-next-line react/prop-types
export default function List({ data = [] }) {
  const listElements = data.map((item) => {
    return <div className="list-item">{item}</div>;
  });
  return <div className="list-container">{listElements}</div>;
}
