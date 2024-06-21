# addPagebreaks Function

The `addPagebreaks` function dynamically adds visual page break indicators within a specified container on a web page. This utility is especially useful for web applications that need to visually segment content for printing or PDF generation, simulating a paginated document. It is designed to be framework-agnostic, enabling easy integration into projects using plain JavaScript, React, or other frameworks.

## Features

- Automatically calculates the cumulative height of content sections to identify where page breaks should occur.
- Inserts a customizable visual indicator to signify the start of a new page.
- Allows specifying the height at which to insert page breaks, accommodating various page sizes.
- Begins page numbering at 2, accommodating scenarios where the first page is treated differently (e.g., a title page).

## Parameters

- `pageHeight` (number): The height threshold in pixels at which a new page break is added. This should correspond to the height of your target page size minus any desired margins.

## Usage

Below is an example showing how to use the `addPagebreaks` function in a simple HTML/JavaScript setup:

### Basic HTML Structure

```html
<div id="print-area">
  <!-- Your content sections -->
  <div class="section">Section 1 content here...</div>
  <div class="section">Section 2 content here...</div>
  <!-- Additional sections -->
</div>
```

### JavaScript Integration

```javascript
import { addPagebreaks } from './path/to/addPagebreaks';

// Assuming you want to insert page breaks for an A4 page at 297mm height (approx. 1122px at 96 DPI)
addPagebreaks(1122);
```

### Integration with React

In a React application, you might integrate `addPagebreaks` like this:

```jsx
import React, { useEffect } from 'react';
import { addPagebreaks } from './path/to/addPagebreaks';

const MyDocumentComponent = () => {
  useEffect(() => {
    // Ensure the DOM elements are rendered before calling addPagebreaks
    setTimeout(() => addPagebreaks(1122), 0);
  }, []);

  return (
    <div id="print-area">
      <div className="section">Section 1 content here...</div>
      <div className="section">Section 2 content here...</div>
      {/* More sections */}
    </div>
  );
};
```

## How It Works

`addPagebreaks` iterates through elements with the class `.section` within the `#print-area` container, accumulating their heights until reaching the specified `pageHeight`. At this point, it inserts a div element styled as a page break indicator and resets the height accumulation for the next set of sections.
