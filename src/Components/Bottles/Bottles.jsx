import React, { useState, useEffect } from 'react';
import Bottle from './Bottle';

function Bottles() {
  const [bottles, setBottles] = useState([]);

useEffect(() => {
  const fetchBottles = async () => {
    try {
      const res = await fetch('/bottles.json');
      const data = await res.json();
      setBottles(data);
    } catch (error) {
      console.error('Error fetching bottles:', error);
    }
  };

  fetchBottles();
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