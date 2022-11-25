import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { ModalComponent} from "./index";
import { FaTimes} from 'react-icons/fa';
import { TiPlus } from 'react-icons/ti';
import { AiTwotoneEdit }from 'react-icons/ai'
import { useSelector, useDispatch } from "react-redux";
import { reducer } from "../redux/reducer";
import { deleteAGenda, editAGenda } from "../redux/actions";

const HomeScreen = () => {
  const [show, setShow] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const { agendas }  = useSelector((state) => state.reducer);
  const dispatch = useDispatch()
  const [data, setData] = useState(JSON.parse(localStorage.getItem('agendas')))

  console.log(data,'local')


  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
};
  return (
    <Container className="p-2 d-flex  flex-column justify-content-center align-items-center">
         <ModalComponent  
         showModal={show} 
         handleClose={handleClose} 
         currentId={currentId}
         setCurrentId={setCurrentId}
         />
      <div className="header m-4">
        <h4>Agenda Application</h4>
        <button
                type="button"
                className="btn btn-primary m-1 border border-0"
                onClick={handleShow}
              >
               <TiPlus title="Add"/>
              </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        {
          agendas.map((agenda, index) => (
            <tbody  key={index}>
          <tr>
            <td>{agenda.title}</td>
            <td>{agenda.description}</td>
            <td>{agenda.status}</td>
            <td>{agenda.startDate}</td>
            <td>{agenda.deadline}</td>
            <td>
             
              <button
                type="button"
                className="btn btn-primary m-1 bg-danger border border-0"
                onClick={() => dispatch(deleteAGenda(index))}
              >
               <FaTimes title="Delete"/>
              </button>
              <button
                type="button"
                className="btn btn-primary m-1 bg-success border border-0"
                onClick={() => dispatch(editAGenda(index))}
              >
               <AiTwotoneEdit title="Edit"/>
              </button>
            </td>
          </tr>

          {/* <td colSpan={2}>Larry the Bird</td>
          <td colSpan={2}>Larry the Bird</td> */}
        </tbody>
          ) )
        }
      </Table>
    </Container>
  );
};

export default HomeScreen;
