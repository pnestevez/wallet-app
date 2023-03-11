import { RefObject } from 'react';

export const handleVerticalScroll = (
  ref: RefObject<HTMLDivElement> | null,
  columnId: string | null,
  draggingDown: boolean
): void => {
  if (!columnId || !ref?.current) return;

  const column = document.getElementById(columnId) as Element;

  const OFFSET_SCROLL = 10;

  const { scrollHeight, scrollTop, clientHeight } = column;
  const { clientHeight: refHeight } = ref.current;

  const scrollTopLimit = scrollHeight - clientHeight;

  const scrollDown =
    scrollTop + refHeight - OFFSET_SCROLL <= scrollTopLimit
      ? scrollTop + refHeight - OFFSET_SCROLL
      : scrollTopLimit;

  const scrollUp =
    scrollTop - refHeight + OFFSET_SCROLL > OFFSET_SCROLL
      ? scrollTop - refHeight + OFFSET_SCROLL
      : 0;

  column.scrollTo({
    top: draggingDown ? scrollDown : scrollUp,
    behavior: 'smooth',
  });
};
