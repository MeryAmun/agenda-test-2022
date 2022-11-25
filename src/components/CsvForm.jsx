import React, { useState } from "react";

const CsvForm = (props) => {
  const [file, setFile] = useState();
  const fileReader = new FileReader();


  return (
    <div className="d-flex justify-content-center align-items-center m-3">
      <div className="form-group m-2">
        <input
          type={"file"}
          accept={".csv"}
          id="fileElem"
          className="visually-hidden"
        />
        <label for="fileElem" className="btn btn-primary">
          Import CSV
        </label>
      </div>

      <form>
        <button
          type="button"
          className="btn btn-primary m-1 border border-0"
          onClick={props.handleShow}
        >
          Add Agenda
        </button>
      </form>
    </div>
  );
};

export default CsvForm;
