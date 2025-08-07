import { useState } from 'react';
import AccordianItem1 from './AccordianItem1';
import AccordianItem2 from './AccordianItem2';

function Accordian() {
  const [isOpen, setIsOpen] = useState({ item1: false, item2: false });
  return (
    <>
      <AccordianItem1 isOpen={isOpen} onToggle={setIsOpen} />
      <AccordianItem2 isOpen={isOpen} onToggle={setIsOpen} />
    </>
  );
}

export default Accordian;
