import { useReducer } from 'react';
import reducer from '../reducer';
import Accordian from '../components/accordian/Accordian';
import Countries from '../components/autocomplete/Countries';
import { Button } from '@/components/ui/button';

function Home() {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      Home
      <p>{state}</p>
      <Button variant='outline' onClick={() => dispatch({ type: 'ADD' })}>
        Add
      </Button>
      <Button variant='outline' onClick={() => dispatch({ type: 'SUB' })}>
        Sub
      </Button>
      {/* <Accordian /> */}
      {/* <Countries /> */}
    </div>
  );
}

export default Home;
