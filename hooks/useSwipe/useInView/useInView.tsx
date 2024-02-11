import { useState, useRef, useEffect, RefObject } from "react";

interface UseInViewOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

function useInView<T extends Element>(
  options?: UseInViewOptions
): [boolean, RefObject<T>] {
  const [isInView, setIsInView] = useState<boolean>(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsInView(entry.isIntersecting);
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [isInView, elementRef];
}

export default useInView;
