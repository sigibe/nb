// similar to cards.js - which we might extend instead of copying
export default function decorate(block, blockName) {
  /* apply classes to elements */
  const applyClasses = (elements, classNames) => {
    elements.forEach((cell, i) => {
      cell.className = classNames[i] ? `${blockName}-${classNames[i]}` : '';
    });
  };

  const addCheckbox = (checkbox, html) => {
    const checkboxURL = 'https://personal.nedbank.co.za/etc.clientlibs/nedbank/clientlibs/clientlib-base/resources/img/tick_icon.svg';
    if(checkbox) {
      return `<img style='width:2em' src=${checkboxURL}/></img>${html}` ;
    } else {
      return html;
    }
  }

  const checkbox = block.attributes.getNamedItem('class')?.value.indexOf('checkbox') >= 0;

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = addCheckbox(checkbox, row.innerHTML);
    applyClasses([...li.children], ['image', 'body']);
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
