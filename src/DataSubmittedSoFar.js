import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"
import { format } from 'date-fns';
import Footer from './assets/components/Footer';
import Navbar from './assets/components/Navbar';
import XLSX from 'xlsx';
import logodown from "./x1.png"

const DataSubmittedSoFar = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState('');
  const [updatedValues, setUpdatedValues] = useState({});
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://invoice-fgq4.onrender.com/data');
      const formattedData = response.data.map(item => ({
        ...item,
        dateselected: format(new Date(item.dateselected), 'MMMM d, yyyy', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      }));
      setData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`https://invoice-fgq4.onrender.com/data/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async (id) => {
    try {
      await axios.put(`https://invoice-fgq4.onrender.com/data/${id}`, updatedValues);
      fetchData();
      setEditingRow('');
      setUpdatedValues({});
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEditing = (rowId) => {
    if (editingRow === rowId) {
      setEditingRow('');
      setUpdatedValues({});
    } else {
      const rowToUpdate = data.find((item) => item._id === rowId);
      setEditingRow(rowId);
      setUpdatedValues(rowToUpdate);
    }
  };

  const handleInputChange = (e, column) => {
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [column]: e.target.value,
    }));
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedData = data.slice().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === 'asc' ? -1 : 1;
    } else if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    return Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const downloadExcel = () => {
    if (!data || data.length === 0) {
      console.error('No data available.');
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      [
        'Visit Date',
        'Beevans',
        'Scrapyard',
        'Metal Type',
        'kg',
        'Price / Kg',
        'Total Price',
        'Total Kg',
        'Total Price',
        'Actions'
      ],
      ...filteredData.map(item => [
        item.dateselected,
        item.Name2,
        item.Name1,
        item['Metal 1'],
        item['kg 1'],
        item['pricePerKg 1'],
        item['totalPrice 1'],
        item.totalKg,
        item.totalPrice
      ])
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const excelDataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(excelDataBlob);
    downloadLink.href = url;
    downloadLink.setAttribute('download', 'tableData.xlsx');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className='datafors'>
      <Navbar />

      <div className='DataSubmittedSoFar'>
        <div className='downtitle'>
          <h2 className='dtitle'>WNs</h2>
          <button className="downt1" onClick={downloadExcel}>
            <img className="downt" src={logodown} alt="Download Icon" />
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('dateselected')}>Visit Date</th>
              <th onClick={() => handleSort('Name2')}>Beevans</th>
              <th onClick={() => handleSort('Name1')}>Scrapyard</th>
              <th onClick={() => handleSort('Metal 1')}>Metal Type</th>
              <th onClick={() => handleSort('kg 1')}>kg</th>
              <th onClick={() => handleSort('pricePerKg 1')}>Price / Kg</th>
              <th onClick={() => handleSort('totalPrice 1')}>Total Price</th>
              <th>Total Kg</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item.dateselected}</td>
                <td>
                  {editingRow === item._id ? (
                    <input
                      type="text"
                      value={updatedValues.Name2 || item.Name2}
                      onChange={(e) => handleInputChange(e, 'Name2')}
                    />
                  ) : (
                    item.Name2
                  )}
                </td>
                <td>
                  {editingRow === item._id ? (
                    <input
                      type="text"
                      value={updatedValues.Name1 || item.Name1}
                      onChange={(e) => handleInputChange(e, 'Name1')}
                    />
                  ) : (
                    item.Name1
                  )}
                </td>
                <td>
                  {editingRow === item._id ? (
                    <input
                      type="text"
                      value={updatedValues['Metal 1'] || item['Metal 1']}
                      onChange={(e) => handleInputChange(e, 'Metal 1')}
                    />
                  ) : (
                    item['Metal 1']
                  )}
                </td>
                <td>
                  {editingRow === item._id ? (
                    <input
                      type="text"
                      value={updatedValues['kg 1'] || item['kg 1']}
                      onChange={(e) => handleInputChange(e, 'kg 1')}
                    />
                  ) : (
                    item['kg 1']
                  )}
                </td>
                <td>
                  {editingRow === item._id ? (
                    <input
                      type="text"
                      value={updatedValues['pricePerKg 1'] || item['pricePerKg 1']}
                      onChange={(e) => handleInputChange(e, 'pricePerKg 1')}
                    />
                  ) : (
                    item['pricePerKg 1']
                  )}
                </td>
                <td>
                  {editingRow === item._id ? (
                    <input
                      type="text"
                      value={updatedValues['totalPrice 1'] || item['totalPrice 1']}
                      onChange={(e) => handleInputChange(e, 'totalPrice 1')}
                    />
                  ) : (
                    item['totalPrice 1']
                  )}
                </td>
                <td>{item.totalKg}</td>
                <td>{item.totalPrice}</td>
                <td>
                  {editingRow === item._id ? (
                    <button onClick={() => updateData(item._id)}>Save Changes</button>
                  ) : (
                    <button className='eddf' onClick={() => toggleEditing(item._id)}>Edit</button>
                  )}
                  <button className='deletedf' onClick={() => deleteData(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default DataSubmittedSoFar;
