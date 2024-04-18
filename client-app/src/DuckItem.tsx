import { Duck } from "./demo";

interface DuckItemProps {
  duck: Duck;
}

const DuckItem = (props: DuckItemProps) => {
  const { duck } = props;

  return (
    <div>
      <span>{duck.name}</span>
      <button onClick={() => duck.makeSound(duck.name + " quack")}>
        Make Sound
      </button>
    </div>
  );
};

DuckItem.propTypes = {};

export default DuckItem;
