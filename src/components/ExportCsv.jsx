import React from 'react';
import { CSVLink } from 'react-csv'
import { useSelector } from "react-redux";

const ExportCsvComponent = () => {
  const { agendas }  = useSelector((state) => state.reducer);
  const filename = 'ReactCsv.csv'

  return (
   <button type='button' className="btn btn-secondary text-white">
     <CSVLink data={(agendas)}  filename={filename} className="text-white text-decoration-none">Export CSV</CSVLink>
 
   </button>
  )
}

export default ExportCsvComponent