
import { useState } from 'react';

import List from '../List/List.js';

function Lists() {
   const [nextId, setNextId] = useState(4);
   const [lists, setLists] = useState([
      {
         id: 1,
         name: 'Wednesday Groceries',
      },
      {
         id: 2,
         name: 'Friday Groceries',
      },
      {
         id: 3,
         name: 'Sunday Groceries',
      },
   ]);

   return (
      <>
         {lists.map((list) => (
            // <div key={list.id}>{list.name}</div>
            <List id={list.id} name={list.name} />
         ))}
         <button>New List</button>
      </>
   );
}

export default Lists;
