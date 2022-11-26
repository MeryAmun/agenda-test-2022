import React, { useState } from "react";
import { Table, Container } from "react-bootstrap";
import { ModalComponent, ImportCsv, ExportCsvComponent } from "./index";
import { FaTimes } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { deleteAGenda } from "../redux/actions";

const HomeScreen = () => {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const { agendas } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container className="p-2 d-flex  flex-column justify-content-center align-items-center">
      <ModalComponent
        showModal={show}
        handleClose={handleClose}
        editedData={data}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editId={editId}
        setEditId={setEditId}
      />
      <div className="header m-4 text-center">
        <h4>Agenda Application</h4>
        <div className="d-flex justify-content-center align-items-center m-4">
          <button
            type="button"
            className="btn btn-primary m-1 border border-0 mx-4"
            onClick={handleShow}
          >
            Add Agenda
          </button>
          <ExportCsvComponent />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>IDs</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        {agendas?.map((agenda) => (
          <tbody key={agenda.id}>
            <tr>
              <td>{agenda.id}</td>
              <td>{agenda.title}</td>
              <td className="word-wrap">{agenda.description}</td>
              <td>{agenda.status}</td>
              <td>{agenda.startDate}</td>
              <td>{agenda.deadline}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary m-1 bg-danger border border-0"
                  onClick={() => dispatch(deleteAGenda(agenda.id))}
                >
                  <FaTimes title="Delete" />
                </button>
                <button
                  type="button"
                  className="btn btn-primary m-1 bg-success border border-0"
                  onClick={() => {
                    setIsEditing(true);
                    setEditId(agenda.id);
                    setData(agenda);
                    handleShow();
                  }}
                >
                  <AiTwotoneEdit title="Edit" />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      <div className="container m-4 d-flex flex-column justify-content-center text-center">
        <div className="header m-4">
          <h4>Import Files Here</h4>
        </div>
        <ImportCsv />
      </div>
    </Container>
  );
};

export default HomeScreen;
