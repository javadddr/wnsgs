import React from 'react';
import "./FinishPopup.css"


function FinishPopup({ names,postFinalState,finalState, namesi,setMetalNames,setNamesi,setNames, rows, files, setRows,preview,setPreview, totalPrice, totalKg, setShowPopup,newState,setNewState,dateselected}) {
  // Create a list of selected names
  const selectedNames = names.filter((name) => name.selected).map((name) => name.name);
  // Create a list of selected namesi
  const selectedNamesi = namesi.filter((name) => name.selected).map((name) => name.name);
  // Create a list of non-empty rows
  const nonEmptyRows = rows.filter((row) => row.metalType || row.kg || row.pricePerKg || row.totalPrice);
  const dati=dateselected
  const dati1=totalKg
  const dati2=totalPrice

  function handleSubmit() {
    const selectedNames = names.filter(name => name.selected);
    const selectedNamesi = namesi.filter(name => name.selected);
    const nonEmptyRows = rows.filter(row => row.metalType !== '' || row.kg !== '' || row.pricePerKg !== '' || row.totalPrice !== '');
    setNewState( [
     
      {
        selectedNames,
        selectedNamesi,
        nonEmptyRows,
       
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
    // setFiles()
    setMetalNames([
      {id: 2, name: 'Aluminium', selected: false },
      {id: 3, name: 'Aluminium geschirr', selected: false },
      {id: 1, name: 'Mischschrott', selected: false },
      { id: 4,name: 'Schreddervormatarial', selected: false },
      { id: 9,name: 'Guss', selected: false },
      {id: 8, name: 'Blechschrott', selected: false },
      {id: 15, name: 'Elektromotoren', selected: false },
      {id: 7, name: 'Kupfer', selected: false },
      {id: 16, name: 'Kupfer verhaftet', selected: false },
      { id: 5,name: 'Kabel O', selected: false },
      {id: 6, name: 'Kabel M', selected: false },
      {id: 11, name: 'Messing', selected: false },
      { id: 10,name: 'Messing verhaftet', selected: false },
      {id: 12, name: 'V2A', selected: false },
      {id: 13, name: 'V4A', selected: false },
      { id: 14,name: 'Blei', selected: false },
      { id: 17,name: 'Zink', selected: false },
      { id: 18,name: 'Cu-Al-Kabel', selected: false },
      { id: 19,name: 'Alu-Felgen', selected: false },
    ]);
    setNamesi([
      { id: 1, name: 'Skiny' ,selected: false},
      { id: 2, name: 'Henry' ,selected: false},
      { id: 3, name: 'Lesley',selected: false },
      { id: 4, name: 'Morton',selected: false },
      { id: 5, name: 'Reynolds',selected: false },
      { id: 6, name: 'Hugeney' ,selected: false},
      { id: 7, name: 'Patrick' ,selected: false},
      { id: 8, name: 'Kenny',selected: false },
      { id: 9, name: 'Kelly',selected: false },
      { id: 10, name: 'Jeffrey',selected: false },
      { id: 11, name: 'Brittany' ,selected: false},
      { id: 12, name: 'Mathilda' ,selected: false},
      { id: 13, name: 'Jelena',selected: false },
      { id: 14, name: 'Alfred',selected: false },
      { id: 15, name: 'Hitfield',selected: false },
      { id: 16, name: 'Titus' ,selected: false},
      { id: 17, name: 'Lys' ,selected: false},
      { id: 18, name: 'Cotta',selected: false },
      { id: 19, name: 'Blackbeard',selected: false },
      { id: 21, name: 'Rubbish George',selected: false },
      { id: 20, name: 'Office',selected: false },
    ]);
    
    
    setNames([
      { id: 1, name: 'Ossenbühl' ,selected: false},
      { id: 2, name: 'Diestelmann' ,selected: false},
      { id: 3, name: 'Bötzel(Witten)',selected: false },
      { id: 4, name: 'Bötzel(Hagen)',selected: false },
      { id: 5, name: 'Bötzel(Herne)',selected: false },
      { id: 6, name: 'Mösta' ,selected: false},
      { id: 7, name: 'RUDOLF MORITZ KG' ,selected: false},
      { id: 8, name: 'GWekos' ,selected: false},
      { id: 9, name: 'Steinrath' ,selected: false},
      { id: 10, name: 'Jungheim' ,selected: false},
      { id: 11, name: 'Motikat' ,selected: false},
      { id: 12, name: 'BSG' ,selected: false},
      { id: 13, name: 'MKR',selected: false },
      { id: 14, name: 'Eberhard',selected: false },
      { id: 15, name: 'Rehbach',selected: false },
      { id: 16, name: 'Carl Herholz' ,selected: false},
      { id: 17, name: 'Tepel' ,selected: false},
      { id: 18, name: 'TSR Düsseldorf' ,selected: false},
      { id: 19, name: 'TSR Duisburg' ,selected: false},
      { id: 20, name: 'TSR Mannheim' ,selected: false},
      { id: 21, name: 'TSR Darmstadt' ,selected: false},
      { id: 22, name: 'ProMetall(Fellbach)' ,selected: false},
      { id: 23, name: 'ISR' ,selected: false},
      { id: 24, name: 'Böhner' ,selected: false},
      { id: 25, name: 'Schrott-Bosch',selected: false },
      { id: 26, name: 'TSR Frankfurt',selected: false },
      { id: 27, name: 'Baer & Albrecht',selected: false },
      { id: 28, name: 'Bender' ,selected: false},
      { id: 29, name: 'Braun' ,selected: false},
      { id: 30, name: 'Viersener' ,selected: false},
      { id: 31, name: 'Ewald' ,selected: false},
      { id: 32, name: 'Scholz Grevenbroich' ,selected: false},
      
      
    ]);
   
    setShowPopup();
   
  }
  
  function handleButtonClick() {
   
    handleSubmit();
    postFinalState();
    
  }



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
      {/* <div className="uploaded-files">
        <h3>Uploaded Files:</h3>
        <div className='lastsee'>
        {fileItems}
        </div>
      </div> */}
      <div className="popup-buttons">
        <button className="cancel-button" onClick={() => setShowPopup(false)}>
          Cancel
        </button>
        <button className="submit-button" onClick={handleButtonClick}>
          Submit
        </button>
      </div>
    </div>
    </div>
  );
  
}

export default FinishPopup;
