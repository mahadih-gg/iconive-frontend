export default function downloadFile(fileName, fileBlob) {
  const href = window.URL.createObjectURL(fileBlob);

  const anchorElement = document.createElement("a");

  anchorElement.href = href;
  anchorElement.download = fileName;
  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
}
