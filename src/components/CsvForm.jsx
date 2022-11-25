import React, { useState } from "react";

import { Table } from "react-bootstrap";
import { CSVLink } from "react-csv";


const CsvForm = () => {
  const [file, setFile] = useState();
  const [csvArray, setCsvArray] = useState();
  const fileReader = new FileReader();
 
  


  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setCsvArray(array);
  };
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
};


const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
        fileReader.onload = function (event) {
            const text = event.target.result;
        csvFileToArray(text);
            console.log(text)
        };

        fileReader.readAsText(file);
    }
};
let headerKeys;
if(csvArray?.length > 0 ) {
   headerKeys = Object.keys(Object.assign({}, ...csvArray));
}


  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-3">
      <div className="container d-flex justify-content-center align-items-center">
      <div className="form-group m-4">
      <input
        type={"file"}
        id="csvFileInput"
        accept={".csv"}
        onChange={handleOnChange}
        
      />
      <button variant="contained" className="btn btn-info"  onClick={(e) => {
                        handleOnSubmit(e);
                    }}>
          Import CSV
        </button>
      </div> 
      <div className="form-group">
      <button className="btn btn-success">
     {
        csvArray?.length ? 
        <CSVLink data={csvArray} className='text-white text-decoration-none'>Download CSV</CSVLink> : 
        <CSVLink data={[]} className='text-white text-decoration-none'>Nothing to Download</CSVLink>
     }
      </button>
      </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr key={"header"}>
            {headerKeys?.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {csvArray?.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CsvForm;
