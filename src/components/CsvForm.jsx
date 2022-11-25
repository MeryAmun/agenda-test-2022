import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'

const CsvForm = () => {
  const [file, setFile] = useState();
  const [csvArray, setCsvArray] = useState();
  const fileReader = new FileReader();
  const { agendas } = useSelector((state) => state.reducer);
  const dispatch = useDispatch()


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

console.log(agendas)
console.log(csvArray)
console.log(headerKeys)
  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-3">
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
      <table>
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
      </table>
    </div>
  );
};

export default CsvForm;
