import React from 'react';
import "./FinishPopup.css"


function FinishPopup({ names, namesi,setMetalNames,setNamesi,setNames, rows, files, setRows,preview,setPreview, totalPrice, totalKg, setShowPopup,newState,setNewState,dateselected,setFiles}) {
  // Create a list of selected names
  const selectedNames = names.filter((name) => name.selected).map((name) => name.name);
  // Create a list of selected namesi
  const selectedNamesi = namesi.filter((name) => name.selected).map((name) => name.name);
  // Create a list of non-empty rows
  const nonEmptyRows = rows.filter((row) => row.metalType || row.kg || row.pricePerKg || row.totalPrice);
  const dati=dateselected
  const dati1=totalKg
  const dati2=totalPrice
  // Create a list of uploaded files with previews and remove buttons
  const fileItems = files.map((file, index) => (
    <div key={index} className="file-item">
      <div className="preview">
      {preview[index].startsWith("blob") ? (
                <object width="200" height="200" data={preview[index]} type="application/pdf">
                  <embed src={preview[index]} type="application/pdf" />
                </object>
              ) : (
                <img src={preview[index]} alt="preview" width="200" height="200" />
              )}



      
        
      </div>

      <div className="file-info">
        <div className="file-name">{file.name}</div>
        <div className="remove-button" onClick={(index) => handleRemove(index)}>Remove</div>
      </div>
    </div>
  ));
  function handleSubmit() {
    const selectedNames = names.filter(name => name.selected);
    const selectedNamesi = namesi.filter(name => name.selected);
    const nonEmptyRows = rows.filter(row => row.metalType !== '' || row.kg !== '' || row.pricePerKg !== '' || row.totalPrice !== '');
    setNewState(prevState => [
      ...prevState,
      {
        selectedNames,
        selectedNamesi,
        nonEmptyRows,
        files,
        dateselected,
        totalKg,
        totalPrice,
      }
    ])
    
   setRows([
      { metalType: '', kg: '', pricePerKg: '', totalPrice: '' },
      { metalType: '', kg: '', pricePerKg: '', totalPrice: '' },
      { metalType: '', kg: '', pricePerKg: '', totalPrice: '' },
      { metalType: '', kg: '', pricePerKg: '', totalPrice: '' },
     
      
    ]);
    setFiles()
    setMetalNames([
      {id: 1, name: 'Iron', selected: false },
      {id: 2, name: 'Aluminum', selected: false },
      {id: 3, name: 'Steel', selected: false },
      { id: 4,name: 'Brass', selected: false },
      { id: 5,name: 'Bronze', selected: false },
    ]);
    setNamesi([
      { id: 1, name: 'Skiny' ,selected: false},
      { id: 2, name: 'Henry' ,selected: false},
      { id: 3, name: 'Patrik',selected: false },
      { id: 4, name: 'Kenny',selected: false },
      { id: 5, name: 'Alfred',selected: false },
    ]);
    
    
    setNames([
      { id: 1, name: 'MTM Zinn' ,selected: false},
      { id: 2, name: 'TSR Düsseldorf' ,selected: false},
      { id: 3, name: 'Ossenbul',selected: false },
      
    ]);
   
    setShowPopup();
  }
  

  // Handle removing a file
  const handleRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newPreview = [...preview];
    newPreview.splice(index, 1);
    setPreview(newPreview);
  };

  return (
    <div className='overlay'>
    <div className="popup-menu finish-popup">
      <h2 className="popup-title">These are selected data:</h2>
     
      <div className="selected-names">
      <div>
        <h3>Date : </h3>
        <h2>{dati}</h2>
        </div>
        <div>
        <h3>Total KG : </h3>
        <h2>{dati1}</h2>
        
        </div>
        <div>
        <h3>Total (Revenue) : </h3>
        <h2> {dati2}</h2>
       
        </div>
       
      </div>
      <div className="selected-namesi">
      <h3>Beevan:</h3>
        <ul>
          {selectedNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <h3>Scrapyard:</h3>
        <ul>
          {selectedNamesi.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="non-empty-rows">
        <h3>Metal collected:</h3>
        <ul>
          {nonEmptyRows.map((row, index) => (
            <li key={index}>
              
              <span className='tableilist'>Metal type: </span>{row.metalType} <span className='tableilist'>KG:</span> {row.kg}kg,&euro; <span className='tableilist'>Price per kg: </span>{row.pricePerKg}/kg <span className='tableilist'>Total &euro; : </span>{row.totalPrice}
            </li>
          ))}
        </ul>
      </div>
      <div className="uploaded-files">
        <h3>Uploaded Files:</h3>
        <div className='lastsee'>
        {fileItems}
        </div>
      </div>
      <div className="popup-buttons">
        <button className="cancel-button" onClick={() => setShowPopup(false)}>
          Cancel
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
    </div>
  );
  
}

export default FinishPopup;
