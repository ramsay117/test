import { useReducer } from 'react';
import reducer from '../reducer';
import Accordian from '../components/accordian/Accordian';
import Countries from '../components/autocomplete/Countries';

function Home() {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      Home
      <p>{state}</p>
      <button onClick={() => dispatch({ type: 'ADD' })}>Add</button>
      <button onClick={() => dispatch({ type: 'SUB' })}>Sub</button>
      {/* <Accordian /> */}
      {/* <Countries /> */}
    </div>
  );
}

export default Home;
