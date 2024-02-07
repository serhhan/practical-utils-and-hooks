# exportPdf Function

The `exportPdf` function is designed to export the content of an HTML element as a PDF file. For those who want to export exact HTML/CSS without any library dependencies. It accepts two parameters:

1. `elementId`: The ID of the HTML element whose content is to be exported.
2. `fileName`: The desired name of the PDF file.

The function performs the following steps:

1. **Save Current Document Title**: It saves the current document title to restore it later.

2. **Change Document Title**: It changes the document title to the custom filename provided.

3. **Create Invisible Iframe**: It creates an invisible `<iframe>` element and appends it to the document body.

4. **Clone HTML Element**: It clones the HTML element specified by the `elementId` parameter.

5. **Set Cloned Element Size**: It sets the cloned element's width to fit an A4 page width.

6. **Append Styles to Iframe's Head**: It appends all `<style>` and `<link>` elements from the main document to the `<iframe>`'s head.

7. **Print the Iframe's Document**: It prints the `<iframe>`'s document, ensuring that styles are applied.

8. **Cleanup**: It removes the `<iframe>` from the document body and restores the original document title.

![exportPdf Example](path/to/your/export-pdf-example.gif)

## How to use

```javascript
<div id="print-area" />;

exportPdf("print-area", "filename");
```
