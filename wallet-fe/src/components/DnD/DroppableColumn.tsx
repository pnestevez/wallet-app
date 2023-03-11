import { useDrop } from "react-dnd";

type DroppableColumnProps = {
  children: JSX.Element;
};

const DroppableColumn = ({ children }: DroppableColumnProps) => {
  const [, drop] = useDrop(() => ({ accept: "card" }));

  return (
    <div style={{ height: "calc(100% - 40px)" }} ref={drop}>
      {children}
    </div>
  );
};

export default DroppableColumn;
