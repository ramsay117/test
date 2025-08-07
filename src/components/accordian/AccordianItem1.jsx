function AccordianItem1({ isOpen, onToggle }) {
  function handleToggle() {
    const newIsOpen = { ...isOpen };
    for (const key in isOpen) {
      if (key == 'item1') {
        newIsOpen.item1 = !newIsOpen.item1;
      } else {
        newIsOpen[key] = false;
      }
    }
    onToggle(newIsOpen);
  }
  return (
    <>
      <h3>Accordian1</h3>
      <button onClick={handleToggle}>Click me</button>
      {isOpen.item1 && <p>Hello</p>}
    </>
  );
}

export default AccordianItem1;
