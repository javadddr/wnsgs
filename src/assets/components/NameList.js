import React, { useState } from 'react';
import "./NameList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
 
import logo1 from "./delivery.png";
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
    <div>
      
      <div className='nameandaddingname'>
  <div className='handlog'>
  <img src={logo1} alt="Beevan" className='logo1'></img>
  <h className="nameofbeevan">Beevans</h>
  
  </div>
       
       <div className="add-name">
        <input
          type="text"
          placeholder="Enter a new Beevan"
          value={newName}
          onChange={handleNewNameChange}
          onKeyPress={handleNewNameKeyPress}
        />
        <FontAwesomeIcon icon={faPlus} className="nameofbeevanadd" onClick={handleAddName}/>
      </div>
      </div>
      
     
      <div className='names-list1'>
  {namesi.map((name) => (
    <div className='namebig1' key={name.id}>
      <div className={`namebig ${name.selected ? 'selected' : ''}`} onClick={() => handleNameClick(name.id)}>
        {name.name}
      </div>

      <button className="delete" onClick={() => handleDeleteName(name.id)}>
        <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
      </button>
    </div>
  ))}
</div>

    </div>
  );
}

export default NamesList;


