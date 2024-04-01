export const addPagebreaks = (pageHeight: number) => {
  const printArea = document.getElementById('print-area');
  if (!printArea) return;
  const sections = printArea.querySelectorAll('.section');
  const targetHeight = pageHeight;
  let cumulativeHeight = 0;
  let currentPage = 2;

  // Iterate over each section to accumulate height and check against the target height
  for (const [index, section] of sections.entries()) {
    if (!(section instanceof HTMLElement)) continue;
    cumulativeHeight += section.offsetHeight;

    if (cumulativeHeight > targetHeight) {
      // Create a new div element to act as the new page indicator container
      const newPageIndicator = document.createElement('div');
      newPageIndicator.style.display = 'flex';
      newPageIndicator.style.alignItems = 'center';
      newPageIndicator.style.justifyContent = 'center';
      newPageIndicator.style.position = 'relative';
      newPageIndicator.style.marginTop = '44px';
      newPageIndicator.style.marginBottom = '44px';

      // Create a span inside the div to hold the text
      const textSpan = document.createElement('span');
      textSpan.textContent = `page ${currentPage}`; // Set the current page number
      textSpan.style.padding = '0 10px';
      textSpan.style.color = '#575C64';
      textSpan.style.fontSize = '12px';
      newPageIndicator.appendChild(textSpan);

      // Create and style the lines as pseudo-elements would in CSS
      const lineLeft = document.createElement('div');
      const lineRight = document.createElement('div');
      [lineLeft, lineRight].forEach(line => {
        line.style.content = '';
        line.style.position = 'absolute';
        line.style.top = '50%';
        line.style.height = '1px';
        line.style.width = '45%'; // Adjust width as needed
        line.style.backgroundColor = '#8D939D'; // Line color
      });
      lineLeft.style.left = '0';
      lineRight.style.right = '0';

      // Append the lines to the page indicator
      newPageIndicator.appendChild(lineLeft);
      newPageIndicator.appendChild(lineRight);

      // Find the parent node of the current section
      const parentNode = section.parentNode;

      // Insert the new page indicator before the current section in its parent node
      if (parentNode) {
        parentNode.insertBefore(newPageIndicator, section);
      }

      // Increment the page number for the next page break
      currentPage++;

      // Reset cumulative height after finding a breakpoint
      cumulativeHeight = section.offsetHeight; // Start counting from current section's height for the next cycle
    }
  }
};
