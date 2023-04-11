import React, { useState } from 'react';
import { format} from 'date-fns';






import "./App.css"
import Calendar from './assets/components/Calender';
import NameList from './assets/components/NameList';
import Scrap from './assets/components/Scrap';
import Table from './assets/components/Table';
import Upload from './assets/components/Upload';
import FinishPopup from './assets/components/FinishPopup';
import Footer from './assets/components/Footer';
import Navbar from './assets/components/Navbar';
function App() {

  // final state
     // send the newState object to server or database
 
  const [newState, setNewState] = useState([ ])
  const [totalKg, setTotalKg] = useState([ ])
  const [totalPrice, setTotalPrice] = useState([ ])

  console.log(totalKg)
  console.log(totalPrice)
  console.log(newState)


  //scrapyards states
  const [names, setNames] = useState([
    { id: 1, name: 'MTM Zinn' ,selected: false},
    { id: 2, name: 'TSR Düsseldorf' ,selected: false},
    { id: 3, name: 'Ossenbul',selected: false },
    
  ]);
  
  //name of the cars
  const [namesi, setNamesi] = useState([
    { id: 1, name: 'Skiny' ,selected: false},
    { id: 2, name: 'Henry' ,selected: false},
    { id: 3, name: 'Patrik',selected: false },
    { id: 4, name: 'Kenny',selected: false },
    { id: 5, name: 'Alfred',selected: false },
  ]);
// foe calender and date


const [selectedDate, setSelectedDate] = useState(new Date());
const dateselected = format(new Date(selectedDate), 'MMMM d, yyyy')




// for the table

const [rows, setRows] = useState([
  { metalType: '', kg: '', pricePerKg: '', totalPrice: '' },
  { metalType: '', kg: '', pricePerKg: '', totalPrice: '' },
  { metalType: '', kg: '', pricePerKg: '', totalPrice: '' },
  { metalType: '', kg: '', pricePerKg: '', totalPrice: '' },
  
  
]);


const [metalNames, setMetalNames] = useState([
  {id: 1, name: 'Iron', selected: false },
  {id: 2, name: 'Aluminum', selected: false },
  {id: 3, name: 'Steel', selected: false },
  { id: 4,name: 'Brass', selected: false },
  { id: 5,name: 'Bronze', selected: false },
]);

//upload file 
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [urlInput, setUrlInput] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  


  return (
    <div className='wholeapp'>
      <Navbar/>
      <div className='calnamescrap'>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <NameList namesi={namesi} setNamesi={setNamesi}/>
      <Scrap names={names} setNames={setNames}/>
      </div>
      <div className='tableupload'>
      <Table rows={rows} setRows={setRows} metalNames={metalNames} setMetalNames={setMetalNames} totalKg={totalKg}  setTotalKg={setTotalKg} totalPrice={totalPrice}  setTotalPrice={setTotalPrice}    />
      <Upload files={files} setFiles={setFiles} preview={preview} setPreview={setPreview} urlInput={urlInput} setUrlInput={setUrlInput} />
      </div>
      <div className='finishbtn'>
      <button className="finishi" onClick={() => setShowPopup(true)}>Finish It !</button>
      </div>
      <div className='popupend'>
      {showPopup && (
        <FinishPopup
          names={names}
          namesi={namesi}
          rows={rows}
          files={files}
          preview={preview}
          urlInput={urlInput}
          setShowPopup={setShowPopup}
          newState={newState}
          setNewState={setNewState}
          dateselected={dateselected}
          setPreview={setPreview}
          setFiles={setFiles}
          totalKg={totalKg}
          totalPrice={totalPrice}
          setRows={setRows}
          setMetalNames={setMetalNames}
          setNamesi={setNamesi}
          setNames={setNames}

          
         

          
        />
      )}
    </div>
    <Footer/>
    
      </div>
  );
}

export default App;