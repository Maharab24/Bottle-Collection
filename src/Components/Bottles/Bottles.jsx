import React, { useState, useEffect } from 'react';
import Bottle from './Bottle';

function Bottles() {
  const [bottles, setBottles] = useState([]);

  useEffect(() => {
    fetch('../../../public/bottles.json')
      .then(res => res.json())
      .then(data => setBottles(data));
  }, []);

  return (
    <div>
      {bottles.map((bottle) => (
        <Bottle key={bottle.id} product={bottle} />
      ))}
    </div>
  );
}

export default Bottles;