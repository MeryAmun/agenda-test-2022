import React from 'react';
import { CSVLink } from 'react-csv'

const ExportCsvComponent = ({csvData, fileName}) => {
  
  return (
   <button type='button' className="btn btn-secondary text-white">
     <CSVLink data={csvData} filename={fileName}  className="text-white text-decoration-none">Export CSV</CSVLink>
 
   </button>
  )
}

export default ExportCsvComponent