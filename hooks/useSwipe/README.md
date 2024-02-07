# useSwipe Hook

This is a custom React hook called `useSwipe` that enables swipe functionality for a container element in a React application. It allows users to swipe horizontally within the container to scroll its content.

![useSwipe example](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnp3MjJ1NWNoajFpbHVuNnExODF3MDlrZjhrMnN6amw1eTQya3JubSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pO24pNXBgbN8mDxvPw/giphy.gif)

## How to use

```javascript
import { useSwipe } from "./useSwipe";

const MyComponent = () => {
  const containerRef = useSwipe();

  return <div ref={containerRef}>{/* Content to be scrolled */}</div>;
};
```

## How it works

The `useSwipe` hook listens for mouse events (`mousedown`, `mousemove`, `mouseup`, `mouseleave`, and `click`) on the container element to determine swipe actions. Here's a breakdown of its functionality:

- **Tracking Dragging State**: It tracks whether the mouse is being dragged within the container.

- **Calculating Swipe Distance**: It calculates the distance moved during a drag action to determine if it qualifies as a swipe.

- **Preventing Default Click Behavior**: If a drag action occurs, it prevents the default click behavior to ensure that swiping doesn't trigger unwanted click actions.

- **Returning a Ref**: Finally, it returns a reference to the container element, which should be attached to the element where you want to enable swipe functionality.

## Dependencies

This hook uses React's `useState`, `useRef`, and `useEffect` hooks to manage state and side effects.

## Notes

- This hook assumes horizontal scrolling within the container. You can modify it to support vertical scrolling if needed.
- It's important to attach the returned `containerRef` to the appropriate container element in your React component.
