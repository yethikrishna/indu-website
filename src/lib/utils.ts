export function splitTextToChars(element: HTMLElement) {
  const text = element.innerText;
  element.innerHTML = "";
  const chars: HTMLSpanElement[] = [];

  text.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
}
