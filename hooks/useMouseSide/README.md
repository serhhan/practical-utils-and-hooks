# useMouseSide Hook

The `useMouseSide` hook is a custom React hook designed to detect the side (left or right) of an element that the mouse is currently hovering over. This hook can be particularly useful for UI/UX enhancements, such as dynamic styling changes or triggering specific animations based on the mouse position.

## Usage

To use the `useMouseSide` hook in your React component, follow these steps:

1. Import the hook into your component file:

```typescript
import useMouseSide from "path/to/useMouseSide";
```

2. Create a ref for the element you want to monitor and pass it to the `useMouseSide` hook:

```tsx
import React, { useRef } from "react";
import useMouseSide from "./useMouseSide"; // Adjust the path as necessary

const MyComponent = () => {
  const myRef = useRef<HTMLElement>(null);
  const side = useMouseSide(myRef);

  return <div ref={myRef}>Hover over me! Mouse is on the: {side}</div>;
};

export default MyComponent;
```

3. The hook returns a string indicating the mouse position relative to the element ('left', 'right', or an empty string if no position is detected).

## Parameters

The hook accepts one parameter:

- `ref`: A React ref object pointing to the HTMLElement you want to detect the mouse position on.

## Return Value

The hook returns a string indicating the side of the element the mouse is on. Possible values are 'left', 'right', or an empty string if the mouse is not over the element.
