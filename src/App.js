import React, { useEffect, useState } from 'react';

import Axios from 'axios';

function App() {

  const [entries, setEntries] = useState([]);

  function getEntries() {
    Axios.get('/api/entries')
        .then(function (response) {
          setEntries(response.data);
        })
  }

  useEffect(getEntries, []);

  const entryList = [];
  for (let entry of entries) {
    entryList.push(<div>
      <a href={'/entry/' + entry._id}><h1>{entry.title}</h1></a>
      <span> Director: {entry.director}</span>
      <span> Release Year: {entry.releaseYear}</span>
    </div>)

  }

  return (<div> {entryList} </div>)

}

export default App;
