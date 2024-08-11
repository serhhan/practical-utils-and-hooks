`useFlipAnimation` Hook

![useFlipAnimation example](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJvbWg2cGttMjg4em94ZWdnaXVkNTBjdzF3OWxxNTVxcWp4Znd1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tZ0AUsJTA18EzKO6Oc/giphy.gif)


A React hook to manage reordering of items in a flex container with smooth animations using the FLIP technique (First, Last, Invert, Play). This hook is useful for implementing dynamic item reordering where an item needs to move to a specific position, such as the middle of a list, while animating the transition.

## Features

- **FLIP Animation**: Smoothly animates items to their new positions based on changes in order.
- **Reordering**: Reorder items within a flex container and automatically trigger the corresponding animation.
- **Reusable**: Designed to be flexible and reusable in different components that require item reordering.

## Installation

1. **Create the Hook:**

   Create a new file `useFlipAnimation.js` in your `hooks` or `utils` directory and add the following code:

   ```javascript
   import { useRef, useState } from "react";

   export const useFlipAnimation = (initialItems) => {
     const containerRef = useRef(null);
     const [items, setItems] = useState(initialItems);

     const reorderItems = (itemId, middleIndex) => {
       const container = containerRef.current;
       const elements = [...container.children];

       // Capture old positions
       const oldState = elements.map((elem) => elem.getBoundingClientRect());

       // Reorder the items to place the clicked one in the middle
       const itemIndex = items.findIndex((item) => item.id === itemId);
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
   ```

### Usage in a Component

````markdown
2. **Usage in a Component:**

   Here’s how to use the `useFlipAnimation` hook within a component, such as for selecting planets in a list:

   ```javascript
   import Image from "next/image";
   import { useFlipAnimation } from "./useFlipAnimation"; // Adjust the path accordingly

   export default function PlanetSelection() {
     const initialPlanets = [
       { id: "planet-1", src: "/assets/planet-1.png" },
       { id: "planet-2", src: "/assets/planet-2.png" },
       { id: "planet-3", src: "/assets/planet-3.png" },
     ];

     const {
       containerRef,
       items: planets,
       reorderItems,
     } = useFlipAnimation(initialPlanets);

     const handlePlanetClick = (planetId) => {
       reorderItems(planetId, 1); // Middle index is 1 (0-based) since there are three planets
     };

     return (
       <div ref={containerRef} className="flex justify-around w-full">
         {planets.map((planet, index) => (
           <div
             key={planet.id}
             className="flex flex-col items-center w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 xl:w-64 delay-2 xl:h-64 z-50 cursor-pointer"
             style={{ order: index }}
             onClick={() => handlePlanetClick(planet.id)}
           >
             <Image
               src={planet.src}
               alt="planet"
               layout="responsive"
               width={256}
               height={256}
               className="hover:scale-105 transition-all"
             />
           </div>
         ))}
       </div>
     );
   }
   ```
````

### How It Works

```markdown
3. **How It Works:**

   - **`containerRef`**: A reference to the container element that holds the items. This allows the hook to access and animate the DOM elements directly.
   - **`items`**: The state that holds the current order of the items. This state is updated whenever items are reordered.
   - **`reorderItems`**: A function that triggers the reordering of items. It takes two arguments:

     - `itemId`: The ID of the item that was clicked or selected.
     - `middleIndex`: The index position where the selected item should be placed (e.g., the middle of the list).

   - **FLIP Animation**: The animation is done in four steps:
     1. **First**: Capture the current (old) positions of the items.
     2. **Last**: Apply the reordering and immediately capture the new positions.
     3. **Invert**: Calculate the difference between the old and new positions.
     4. **Play**: Apply a smooth animation that transitions items from their old positions to the new ones.
```

4. **Benefits:**

   - **Encapsulation**: The hook encapsulates all the complex logic of reordering and animating items, making it easy to reuse across different components.
   - **Flexibility**: You can use this hook for any list of items that you need to reorder, not just planets.

5. **Customization:**

   - The duration and easing of the animation can be adjusted in the `elem.animate` method within the hook to match your design needs.
