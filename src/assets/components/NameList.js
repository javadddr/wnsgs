import React, { useState } from 'react';
import "./NameList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


function NamesList(props) {
  const { namesi, setNamesi } = props;
  const [newName, setNewName] = useState('');

  const handleNameClick = (id) => {
    const updatedNames = namesi.map((name) => {
      if (name.id === id) {
        return { ...name, selected: !name.selected };
      } else {
        return { ...name, selected: false };
      }
    });
    setNamesi(updatedNames);
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
      const newId = namesi.length + 1;
      const newNames = [...namesi, { id: newId, name: newName, selected: false }];
      setNamesi(newNames);
      setNewName('');
    }
  };

  const handleDeleteName = (id) => {
    const updatedNames = namesi.filter((name) => name.id !== id);
    setNamesi(updatedNames);
    
  };

  return (
    <div className="names-list">
       <div class="step1">
      <button  class="step1b"> 2 </button>
      </div>
        <h className="titlebv">Beevans</h>
        <div className="names">
        
        {namesi.map((name) => (
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
          placeholder="Enter a new Beevan"
          value={newName}
          onChange={handleNewNameChange}
          onKeyPress={handleNewNameKeyPress}
        />
        <button onClick={handleAddName}>Add Beevan</button>
      </div>
      
    </div>
  );
}

export default NamesList;


