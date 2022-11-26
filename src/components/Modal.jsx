import React, { useState,useEffect,useRef, createRef } from "react";
import {  Button, Modal} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAGenda, editAGenda } from "../redux/actions";
import  moment from 'moment';
import SimpleReactValidator from "simple-react-validator";

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
  const { agendas } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const [, forceUpdate] = useState();
const form = createRef()
const simpleValidator = useRef(new SimpleReactValidator());


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
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      simpleValidator.current.showMessages(true);
      forceUpdate(1)
    }else{
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
      handleClose()
    }
    }

    
  
  };

  const handleEditButton = () => {
    if (editedData && isEditing && editId) {
      setData({
        id:editId,
        title: editedData.title,
        description: editedData.description,
        status: editedData.status,
        startDate: now.toDateString(),
        deadline: editedData.deadline,
      });
     
    } 
   
     dispatch(editAGenda(editId, {...editedData
    }))

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
          <form onSubmit={handleSubmit} ref={form}>
            <div className="form-group mb-3">
              <input
                className="form-control w-100 rounded border p-1"
                type="text"
                placeholder="Title"
                name="title"
                value={data.title}
                onChange={handleChange}
                onBlur={() => {
                  simpleValidator.current.showMessageFor('title')
                  forceUpdate(1)
                }}
              />
             {simpleValidator.current.message("title", data.title, "required|title", { className: 'text-danger' })}
            </div>
            <div className="form-group mb-3">
              <textarea
                className="form-control w-100 rounded border p-1"
                rows={3}
                placeholder="Description"
                value={data.description}
                name="description"
                onChange={handleChange}
                onBlur={() => {
                  simpleValidator.current.showMessageFor('description')
                  forceUpdate(1)
                }}
              ></textarea>
             {simpleValidator.current.message("description", data.description, "required|description", { className: 'text-danger' })}
            </div>
            <div className="form-group mb-3">
              <select
                className="form-control w-100 rounded border p-1"
                value={data.status}
                name="status"
                onChange={handleChange}
                onBlur={() => {
                  simpleValidator.current.showMessageFor('status')
                  forceUpdate(1)
                }}
              >
                <option>Select Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
             {simpleValidator.current.message("status", data.status, "required|status", { className: 'text-danger' })}
            </div>
            <div className="form-group mb-3 outline-light">
              <input
                type="text"
                className="form-control w-100 rounded border p-1"
                placeholder="Deadline"
                name="deadline"
                value={data.deadline}
                onChange={handleChange}
                onBlur={() => {
                  simpleValidator.current.showMessageFor('deadline')
                  forceUpdate(1)
                }}
              />
             {simpleValidator.current.message("deadline", data.deadline, "required|deadline", { className: 'text-danger' })}
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
