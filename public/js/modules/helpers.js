export default function createEl(el, text, output, cssclass = '') {
  const newEl = document.createElement(el);
  newEl.textContent = text;
  if (cssclass) newEl.classList.add(cssclass);
  output.append(newEl);
  return newEl;
}
