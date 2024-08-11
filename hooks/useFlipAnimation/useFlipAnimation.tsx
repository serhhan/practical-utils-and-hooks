"use client";

import { useRef, useState, RefObject } from "react";

type Item = {
  id: string;
  src: string;
};

type UseFlipAnimationReturn = {
  containerRef: RefObject<HTMLDivElement>;
  items: Item[];
  reorderItems: (itemId: string, middleIndex: number) => void;
};

export const useFlipAnimation = (
  initialItems: Item[]
): UseFlipAnimationReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>(initialItems);

  const reorderItems = (itemId: string, middleIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(container.children) as HTMLDivElement[];

    // Capture old positions
    const oldState = elements.map((elem) => elem.getBoundingClientRect());

    // Reorder the items to place the clicked one in the middle
    const itemIndex = items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return; // Item not found

    const updatedItems = [...items];
    const [clickedItem] = updatedItems.splice(itemIndex, 1);
    updatedItems.splice(middleIndex, 0, clickedItem);

    setItems(updatedItems);

    // Animate the items to their new positions
    setTimeout(() => {
      const newState = elements.map((elem) => elem.getBoundingClientRect());

      elements.forEach((elem, idx) => {
        const deltaX = oldState[idx].left - newState[idx].left;
        const deltaY = oldState[idx].top - newState[idx].top;
        elem.animate(
          [
            {
              transformOrigin: "top left",
              transform: `translate(${deltaX}px, ${deltaY}px)`,
            },
            { transformOrigin: "top left", transform: "none" },
          ],
          { duration: 500, easing: "ease", fill: "both" }
        );
      });
    }, 0);
  };

  return { containerRef, items, reorderItems };
};
