import React from 'react';
import "./Table.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import logo3 from "./metal.png";
function Table(props) {
  const { rows, setRows,setMetalNames  ,metalNames, totalKg,setTotalKg, totalPrice, setTotalPrice } = props;



  const addRow = () => {
    setRows([...rows, { metalType: '', kg: '', pricePerKg: '', totalPrice: '' }]);
  };

  const handleInputChange = (event, rowIndex, key) => {
    const newRows = [...rows];
    newRows[rowIndex][key] = event.target.value;
    if (key === 'kg' || key === 'pricePerKg') {
      newRows[rowIndex].totalPrice = (newRows[rowIndex].kg * newRows[rowIndex].pricePerKg).toFixed(2)
    }
    setRows(newRows);
  };

  const handleNameClick = (event, name) => {
    const newMetalNames = [...metalNames];
    const selectedName = newMetalNames.find((n) => n.name === name);
    selectedName.selected = !selectedName.selected;
    setMetalNames(newMetalNames);

    const newRows = [...rows];
    const RepidRow = newRows.find((row) => row.metalType === name);
    const vojod= RepidRow? true:false
    
    if (vojod && selectedName.selected===false){
      RepidRow.metalType = "";
     setRows(newRows);
      //const newRows2=newRows.filter((row)=>row.metalType !== name)
      //setRows(newRows2);
      console.log("javad")
    }else if(vojod  ){
      console.log("javad")

    }

    else{
      const emptyRow = newRows.find((row) => row.metalType === '');
   if (emptyRow) {
     emptyRow.metalType = name;
     setRows(newRows);
   }else{
   setRows([...rows, { metalType: name, kg: '', pricePerKg: '', totalPrice: '' }]);
  }


   }
   
  };

  const handleNewNameSubmit = (event) => {
    event.preventDefault();
    const newId = metalNames.length + 1;
    const nameInput = event.target.elements.name;
    const name = nameInput.value;
    if (name !== '') {
      setMetalNames([...metalNames, {id: newId, name: name, selected: false }]);
      nameInput.value = '';
    }
  };

  setTotalKg( rows.reduce((total, row) => total + Number(row.kg), 0))
  setTotalPrice(rows.reduce((total, row) => total + Number(row.totalPrice), 0).toFixed(2))
  const handleDeleteName = (id) => {
    const updatedNames = metalNames.filter((name) => name.id !== id);
    setMetalNames(updatedNames);
    console.log(updatedNames)
  };
  return (
    <div>
        <div className='handlog1'>
      <img src={logo3} alt="Beevan" className='logo1'></img>
  <h className="nameofbeevan">Metals</h>
  
  </div>
    
    <div className="tabledivcoli">
        
      <div className="metal-names">
        <div className='metallist'>
         
        </div>
        <div className='metaladd'>
        <ul className='metaladdul'>
  {metalNames.map((metalName, index) => (
    <div className='nameanddelete' key={index}>
      <li
        className={metalName.selected ? 'selected' : ''}
        onClick={(event) => handleNameClick(event, metalName.name)}
      >
        {metalName.name}
      </li>
      <FontAwesomeIcon
        icon={faTrashCan}
        onClick={() => handleDeleteName(metalName.id)}
        className="trash-icon"
        id="delete"
      />
    </div>
  ))}
</ul>

        <form className='metaladdul1' onSubmit={handleNewNameSubmit}>
          <label className="metal-namesr">
            New Metal:
            
          </label>
          <div className='tableaddb'>
          <input type="text" name="name"  placeholder="Enter a new Metal"/>
          <button type="submit" className="metal-nameb">Add</button>
          </div>
        </form>
        </div>
      </div >
      <div className="wholetable">
      <table className="metal-namta">
        <thead>
          <tr>
            <th>Metal type</th>
            <th>KG</th>
            <th>Price per kg</th>
            <th>Total price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="text"
                  value={row.metalType}
                  onChange={(event) => handleInputChange(event, rowIndex, 'metalType')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.kg}
                  onChange={(event) => handleInputChange(event, rowIndex, 'kg')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.pricePerKg}
                  onChange={(event) => handleInputChange(event, rowIndex, 'pricePerKg')}
                />
              </td>
              <td>{row.totalPrice}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="metal-totalitr">
            <td className="metal-totali">Total:</td>
            <td className="metal-totali1">{totalKg}</td>
            <td></td>
            <td className="metal-totali2">{totalPrice}</td>
          </tr>
        </tfoot>
      </table>
      </div>
      <button onClick={addRow} className="addi">Add row</button>
    </div>
    </div>
  );
}

export default Table;
