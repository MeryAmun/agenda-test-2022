import React, { useState,useEffect } from "react";
import {  Button, Modal} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAGenda, editAGenda } from "../redux/actions";
import  moment from 'moment'

const now = new Date();
const initialState = {
  title: "",
  description: "",
  status: "",
  startDate: moment().format("MMM Do YY"),
  deadline: "",
};

const ModalComponent = ({
  showModal,
  handleClose,
  editedData,
  isEditing,
  setIsEditing,
  editId,
  setEditId,
}) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");
  const { agendas } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    agendas?.filter((agenda) => agenda.title )
  }, [agendas])
  



  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.title === "") setError("please fill in Title");
    if (data.description === "") setError("please fill in Description");
    if (data.status === "") setError("please fill in Status");
    if (data.deadline === "") setError("please fill in deadline");

    const id = (Math.random() * 100).toFixed(6);
     
      if(data.title && data.deadline && data.description && data.status){
      dispatch(addAGenda({...data,id}));
      setData({
        title: "",
        description: "",
        status: "",
        startDate:"",
        deadline: "",
      });
      clear();
    }
    handleClose()
  };

  const handleEditButton = () => {
    if(!editedData && !isEditing && !editId) return null
    if (editedData && isEditing && editId) {
      setData({
        id:editId,
        title: editedData.title,
        description: editedData.description,
        status: editedData.status,
        startDate: now.toDateString(),
        deadline: editedData.deadline,
      });
      setEditId(null);
      setIsEditing(false);
     dispatch(editAGenda(editId, {...editedData,
      id:editId,
      title: editedData.title,
      description: editedData.description,
      status: editedData.status,
      startDate:editedData.startDate,
      deadline: editedData.deadline,
    }))
      
     
    } 

  }

  const clear = () => {
    setEditId(null);
    setData({
      title: "",
      description: "",
      status: "",
      startDate: "",
      deadline: "",
    });
  };



  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Agenda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                className="w-100 rounded border p-1"
                required={true}
                type="text"
                placeholder="Title"
                name="title"
                value={data.title}
                onChange={handleChange}
              />
              {/* <span className="text-danger">{error}</span> */}
            </div>
            <div className="form-group mb-3">
              <textarea
                className="w-100 rounded border p-1"
                rows={3}
                placeholder="Description"
                value={data.description}
                name="description"
                onChange={handleChange}
                required={true}
              ></textarea>
              {/* <span className="text-danger">{error}</span> */}
            </div>
            <div className="form-group mb-3">
              <select
                className="w-100 rounded border p-1"
                value={data.status}
                name="status"
                onChange={handleChange}
                required={true}
              >
                <option>Select Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              {/* <span className="text-danger">{error}</span> */}
            </div>
            <div className="form-group mb-3 outline-light">
              <input
                type="text"
                className="w-100 rounded border p-1"
                placeholder="Deadline"
                name="deadline"
                value={data.deadline}
                onChange={handleChange}
                required={true}
              />
              {/* <span className="text-danger">{error}</span> */}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditButton}>
            Edit Agenda
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save Agenda
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
