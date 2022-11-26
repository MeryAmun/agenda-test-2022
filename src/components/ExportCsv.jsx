import React from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

const ExportCsvComponent = () => {
  const { agendas } = useSelector((state) => state.reducer);
  const fileName = "agendasReactCsv";

  return (
    <button type="button" className="btn btn-secondary text-white">
      <CSVLink
        data={agendas}
        filename={fileName}
        className="text-white text-decoration-none"
      >
        Export CSV
      </CSVLink>
    </button>
  );
};

export default ExportCsvComponent;
