import { useReducer } from 'react';
import reducer from '../reducer';
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
    </div>
  );
}

export default Home;
