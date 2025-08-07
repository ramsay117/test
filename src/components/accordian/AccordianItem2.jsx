function AccordianItem2({ isOpen, onToggle }) {
  function handleToggle() {
    const newIsOpen = { ...isOpen };
    for (const key in isOpen) {
      if (key == 'item2') {
        newIsOpen.item2 = !newIsOpen.item2;
      } else {
        newIsOpen[key] = false;
      }
    }
    onToggle(newIsOpen);
  }
  return (
    <>
      <h3>Accordian2</h3>
      <button onClick={handleToggle}>Click me</button>
      {isOpen.item2 && <p>ok</p>}
    </>
  );
}

export default AccordianItem2;
