import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import type { XYCoord } from "dnd-core";
import { handleVerticalScroll } from "./helpers/scroll";

export type DraggableCardProps = {
  cardId: string;
  cardIndex: number;
  handleMoveCard: (cardId: string, toIndex: number) => void;
  children?: JSX.Element;
};

const DraggableCard = ({
  cardId,
  cardIndex,
  handleMoveCard,
  children,
}: DraggableCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag(
    () => ({
      type: "card",
      item: {
        cardId: cardId,
        fromIndex: cardIndex,
      },
    }),
    [cardId, cardIndex]
  );

  const [, drop] = useDrop(
    {
      accept: "card",
      hover: (
        item: {
          cardId: string;
          fromIndex: number;
        },
        monitor
      ) => {
        if (!ref.current) return;

        const fromIndex = item.fromIndex;
        const toIndex = cardIndex;

        if (fromIndex === toIndex) return;

        const { top, height } = ref.current?.getBoundingClientRect();

        const hoverMiddle = height / 2;
        const clientOffset = monitor.getClientOffset() as XYCoord;
        const draggingPointerY = clientOffset.y - top;
        const isDraggingDown = fromIndex < toIndex;
        const TRIGGER_HOVER = 22;
        if (isDraggingDown && draggingPointerY < hoverMiddle - TRIGGER_HOVER)
          return;
        if (!isDraggingDown && draggingPointerY > hoverMiddle + TRIGGER_HOVER)
          return;

        handleVerticalScroll(ref, `wallets-column`, isDraggingDown);

        handleMoveCard(item.cardId, toIndex);
        item.fromIndex = toIndex;
      },
      collect: (monitor) => {
        const item = monitor.getItem();
        return {
          item,
          didDrop: item && monitor.didDrop(),
        };
      },
    },
    [cardIndex]
  );

  drag(drop(ref));

  return <div ref={ref}>{children}</div>;
};

export default DraggableCard;
