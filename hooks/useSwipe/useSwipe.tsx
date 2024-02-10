"use client";

import { useState, useRef, useEffect } from "react";

export const useSwipe = () => {
  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);

  // State to track if the mouse is being dragged
  const [isDragging, setIsDragging] = useState(false);

  // Starting X and Y coordinates for the drag
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  // State to indicate if a drag action has occurred
  const [didDrag, setDidDrag] = useState(false);

  // State to indicate if the click should be prevented
  const [shouldPreventClick, setShouldPreventClick] = useState(false);

  useEffect(() => {
    // Handle mouse down event
    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true); // Set dragging to true
      setDidDrag(false); // Reset drag state
      setStartX(e.clientX); // Set the starting X coordinate
      setStartY(e.clientY); // Set the starting Y coordinate
    };

    // Handle mouse move event
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return; // Exit if not dragging

      const x = e.clientX;
      const y = e.clientY;
      const dx = startX - x;
      const dy = startY - y;

      // Calculate the distance moved
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if distance moved is above a certain threshold
      if (distance > 1) {
        setDidDrag(true);
      }

      const container = containerRef.current;
      if (container) {
        container.scrollLeft += dx;
        setStartX(x);
        setStartY(y);
      }
    };

    // Handle mouse up event
    const onMouseUp = (e: MouseEvent) => {
      setIsDragging(false); // Stop dragging

      // Prevent click if it was a drag action
      if (didDrag) {
        setShouldPreventClick(true);
        e.preventDefault();
        e.stopPropagation();
      } else {
        setShouldPreventClick(false);
      }
      setDidDrag(false); // Reset drag state
    };

    // Handle click event to prevent or allow the action
    const onClick = (e: MouseEvent) => {
      if (shouldPreventClick) {
        e.preventDefault();
        e.stopPropagation();
        setShouldPreventClick(false); // Reset for next click
      }
    };

    const element = containerRef.current;

    if (element !== null) {
      element.addEventListener("mousedown", onMouseDown);
      element.addEventListener("mousemove", onMouseMove);
      element.addEventListener("mouseup", onMouseUp);
      element.addEventListener("mouseleave", onMouseUp);
      element.addEventListener("click", onClick);

      // Cleanup event listeners
      return () => {
        element.removeEventListener("mousedown", onMouseDown);
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("mouseup", onMouseUp);
        element.removeEventListener("mouseleave", onMouseUp);
        element.removeEventListener("click", onClick);
      };
    }
  }, [isDragging, startX, startY, didDrag, shouldPreventClick]);

  return containerRef;
};
