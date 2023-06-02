import React, { useState } from 'react';
import "./NameList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import logo2 from "./scraping.png";


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
    <div>
      <div className='nameandaddingname'>
      <div className='handlog'>
      <img src={logo2} alt="Beevan" className='logo1'></img>
  <h className="nameofbeevan">Scrapyard</h>
  
  </div>
      <div className="add-name">
        <input
          type="text"
          placeholder="Enter a new Scrapyard"
          value={newName}
          onChange={handleNewNameChange}
          onKeyPress={handleNewNameKeyPress}
        />
      
        <FontAwesomeIcon icon={faPlus} className="nameofbeevanadd" onClick={handleAddName}/>
      </div>

      </div>
    <div className="names-list1">
     
     
       
        
        {names.map((name) => (
          <div className='namebig1' key={name.id}>
          <div  className={`namebig ${name.selected ? 'selected' : ''}`} onClick={() => handleNameClick(name.id)}>
            {name.name}
            </div>
           
            <button className="delete" onClick={() => handleDeleteName(name.id)}><FontAwesomeIcon icon={faTrashCan} className="trash-icon" /></button>
          
          </div>
        ))}
     
    
      
    </div>
    </div>
  );
}

export default Scrap;


