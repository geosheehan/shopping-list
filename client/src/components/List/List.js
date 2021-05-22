import { useState } from 'react';
import Item from './Item/Item.js';

function List({ id, name }) {
   return (
      <div id={id}>
         {name}
      </div>
   );
}

export default List
