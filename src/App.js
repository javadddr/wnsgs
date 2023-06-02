import React, { useState, useEffect ,useCallback} from 'react';
import { format} from 'date-fns';
// import * as XLSX from 'xlsx';
import axios from 'axios';







import "./App.css"
import Calendar from './assets/components/Calender';
import NameList from './assets/components/NameList';
import Scrap from './assets/components/Scrap';
import Table from './assets/components/Table';
// import Upload from './assets/components/Upload';
import FinishPopup from './assets/components/FinishPopup';
import Footer from './assets/components/Footer';
import Navbar from './assets/components/Navbar';

function App() {

  // final state
     // send the newState object to server or database
 
  const [newState, setNewState] = useState([ ])
  const [totalKg, setTotalKg] = useState([ ])
  const [totalPrice, setTotalPrice] = useState([ ])
  // const [newState1, setNewState1] = useState([ ])
  
  // console.log(selectedNames)

  // const [finalState, setFinalState] = useState([]);

  const [finalState, setFinalState] = useState([]);


  useEffect(() => {
    if (newState.length > 0) {
     
      const { selectedNames, selectedNamesi, nonEmptyRows, dateselected, totalKg, totalPrice } = newState[0];
      const newFinalState = nonEmptyRows.map((row) => ({
        dateselected,
        Name2: selectedNamesi[0].name,
        Name1: selectedNames[0].name,
        "Metal 1": row.metalType,
        "kg 1": row.kg,
        "pricePerKg 1": row.pricePerKg,
        "totalPrice 1": row.totalPrice,
        totalKg,
        totalPrice,
      }));
     
      setFinalState(newFinalState);
      
     
  } 
     else {
      setFinalState([]);
    }
  }, [newState]);
  
  
  

console.log(finalState)
useEffect(() => {
  localStorage.setItem('finalState', JSON.stringify(finalState));
}, [finalState]);

// function convertObjectToArray(obj) {
//   const keys = ["dateselected", "totalKg", "totalPrice", "Name1", "Name2", "Metal 1", "kg 1", "pricePerKg 1", "totalPrice 1"];
//   return keys.map(key => obj[key]);
// }

// function to write finalState to Excel file
// function writeFinalStateToExcel(finalState) {
//   const wb = XLSX.utils.book_new();
//   const ws = XLSX.utils.json_to_sheet(finalState.map(convertObjectToArray));
//   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//   XLSX.writeFile(wb, 'finalState.xlsx');
// }


  //scrapyards states
  const [names, setNames] = useState([
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
  
  //name of the cars
  const [namesi, setNamesi] = useState([
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
  { id: 20,name: 'Milberry', selected: false },
  
 
 
]);

//upload file 
  // const [files, setFiles] = useState([]);
  // const [preview, setPreview] = useState([]);
  // const [urlInput, setUrlInput] = useState("");

  const [showPopup, setShowPopup] = useState(false);


  const postFinalState = useCallback(async () => {
    try {
      // Send a POST request to your backend endpoint
      await axios.post('https://invoice-fgq4.onrender.com/data', finalState);
      console.log('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [finalState]);
  
  useEffect(() => {
    postFinalState(); // Call the function initially when the component mounts
  }, [finalState, postFinalState]);

  return (
    <div className='wholeapp'>
      <Navbar/>
      <div className='calnamescrap'>

      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className='calnamescrap2'>
      <NameList namesi={namesi} setNamesi={setNamesi}/>
      </div>
      <div className='calnamescrap3'>
      <Scrap names={names} setNames={setNames}/>
      </div>
      <div className='tableupload'>
      <Table rows={rows} setRows={setRows} metalNames={metalNames} setMetalNames={setMetalNames} totalKg={totalKg}  setTotalKg={setTotalKg} totalPrice={totalPrice}  setTotalPrice={setTotalPrice}    />
      {/* <Upload files={files} setFiles={setFiles} preview={preview} setPreview={setPreview} urlInput={urlInput} setUrlInput={setUrlInput} />
      </div> */}
      <div className='finishbtn'>
      <button className="finishi" onClick={() => setShowPopup(true)}>Finish It !</button>
      </div>
      <div className='popupend'>
      {showPopup && (
        <FinishPopup
          names={names}
          namesi={namesi}
          rows={rows}
          // files={files}
          // preview={preview}
          // urlInput={urlInput}
          setShowPopup={setShowPopup}
          newState={newState}
          setNewState={setNewState}
          dateselected={dateselected}
          // setPreview={setPreview}
          // setFiles={setFiles}
          totalKg={totalKg}
          totalPrice={totalPrice}
          setRows={setRows}
          setMetalNames={setMetalNames}
          setNamesi={setNamesi}
          setNames={setNames}
          postFinalState={postFinalState}
          finalState={finalState}

          
         

          
        />
      )}
    </div>
    {/* <div>
      <button onClick={() => writeFinalStateToExcel(finalState)}>Write to Excel</button>
      

      
    </div> */}
    {/* <button onClick={postFinalState} className="submit-button">Save</button> */}

  
   
   
      </div>

      
      <Footer/>
      </div>
  );
}

export default App;