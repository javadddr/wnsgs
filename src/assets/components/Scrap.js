import React, { useState } from 'react';
import "./NameList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'



function Scrap(props) {
  const { names, setNames } = props;
  const [newName, setNewName] = useState('');

  const handleNameClick = (id) => {
    const updatedNames = names.map((name) => {
      if (name.id === id) {
        return { ...name, selected: !name.selected };
      } else {
        return { ...name, selected: false };
      }
    });
    setNames(updatedNames);
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddName();
    }
  };

  const handleAddName = () => {
    if (newName !== '') {
      const newId = names.length + 1;
      const newNames = [...names, { id: newId, name: newName, selected: false }];
      setNames(newNames);
      setNewName('');
    }
  };

  const handleDeleteName = (id) => {
    const updatedNames = names.filter((name) => name.id !== id);
    setNames(updatedNames);
    console.log(updatedNames)
  };

  return (
    <div className="names-list">
       <div class="step1">
      <button  class="step1b"> 3 </button>
      </div>
        <h className="titlebv">Scrapyard</h>
        <div className="names">
        
        {names.map((name) => (
          <div className='namesindivi' key={name.id}>
          <div  className={`name ${name.selected ? 'selected' : ''}`} onClick={() => handleNameClick(name.id)}>
            {name.name}
            </div>
           
            <button className="delete" onClick={() => handleDeleteName(name.id)}><FontAwesomeIcon icon={faTrash} /></button>
          
          </div>
        ))}
      </div>
      <div className="add-name">
        <input
          type="text"
          placeholder="Enter a new Scrapyard"
          value={newName}
          onChange={handleNewNameChange}
          onKeyPress={handleNewNameKeyPress}
        />
        <button onClick={handleAddName}>Add Scrapyard</button>
      </div>
      
    </div>
  );
}

export default Scrap;


