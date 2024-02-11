import { useState, useEffect, RefObject } from "react";

/**
 * Custom React hook to detect mouse position within an element (left or right).
 *
 * @param ref - The ref of the element to detect mouse position on.
 * @returns The side of the element the mouse is on ('left', 'right', or '').
 */
export function useMouseSide(ref: RefObject<HTMLElement>): string {
  const [side, setSide] = useState<string>("");

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const divMidpoint = ref.current.offsetWidth / 2;
        const mouseXRelativeToDiv =
          event.pageX - ref.current.getBoundingClientRect().left;

        const newSide = mouseXRelativeToDiv < divMidpoint ? "left" : "right";
        setSide(newSide);
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [ref]); // Re-run the effect if the ref changes

  return side;
}

export default useMouseSide;
