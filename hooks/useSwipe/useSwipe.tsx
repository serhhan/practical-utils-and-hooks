export const exportPdf = (elementId: string, fileName: string) => {
  // Save the current document title
  const originalTitle = document.title;

  // Change the document title to the custom filename
  document.title = fileName;

  // Create an invisible iframe
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found`);
    document.title = originalTitle; // Reset the document title
    return;
  }

  const iframe: HTMLIFrameElement = document.createElement("iframe"); // Specify type
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  // Clone the element to print
  const clonedElement = element.cloneNode(true) as HTMLElement;

  // Set cloned element to fit A4 page width
  clonedElement.style.width = "210mm"; // A4 page width in mm

  // Append styles to iframe's head
  const headHTML =
    Array.from(document.getElementsByTagName("style"))
      .map((style) => style.outerHTML)
      .join("\n") +
    Array.from(document.getElementsByTagName("link"))
      .filter((link) => link.rel === "stylesheet")
      .map((link) => link.outerHTML)
      .join("\n");

  // Check if contentDocument is null
  if (iframe.contentDocument) {
    iframe.contentDocument.head.innerHTML = headHTML;

    // Append cloned element to the iframe's body
    iframe.contentDocument.body.appendChild(clonedElement);

    // Print the iframe's document if contentWindow is not null
    iframe.contentWindow?.setTimeout(() => {
      // Timeout to ensure styles are applied
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe); // Cleanup
        document.title = originalTitle; // Reset the document title
      }, 1000);
    }, 500);
  } else {
    console.error("no content");
    document.body.removeChild(iframe); // Cleanup
    document.title = originalTitle; // Reset the document title
  }
};
