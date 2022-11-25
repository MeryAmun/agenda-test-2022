import React, { useState} from "react";
import { Table, Container } from "react-bootstrap";
import { ModalComponent, CsvForm} from "./index";
import { FaTimes} from 'react-icons/fa';
import { AiTwotoneEdit }from 'react-icons/ai'
import { useSelector, useDispatch } from "react-redux";
import { reducer } from "../redux/reducer";
import { deleteAGenda} from "../redux/actions";

const HomeScreen = () => {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const { agendas }  = useSelector((state) => state.reducer);
  const dispatch = useDispatch()
  const [data, setData] = useState()



  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
};

// const editHandler = (itemIndex) => {
//   const specificItem = agendas.find((item, index) => {
//     if(index === itemIndex){
//   }  return item})
//   setIsEditing(true);
//   setEditId(index)
//  dispatch(editAGenda(index))
//   setData(specificItem);
//   handleShow()
// };

console.log(agendas)
console.log(editId)
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
      <div className="header m-4">
        <h4>Agenda Application</h4>
        <CsvForm handleShow={handleShow}/>
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
          agendas.sort((a, b) => b - a)
          .map((agenda) => (
            <tbody  key={agenda.id}>
          <tr>
            <td>{agenda.title}</td>
            <td  className="word-wrap">{agenda.description}</td>
            <td>{agenda.status}</td>
            <td>{agenda.startDate}</td>
            <td>{agenda.deadline}</td>
            <td>
             
              <button
                type="button"
                className="btn btn-primary m-1 bg-danger border border-0"
                onClick={() => dispatch(deleteAGenda(agenda.id))}
              >
               <FaTimes title="Delete"/>
              </button>
              <button
                type="button"
                className="btn btn-primary m-1 bg-success border border-0"
                onClick={() => {
                  setIsEditing(true);
                  // dispatch(editAGenda(agenda,agenda.id))
                  setEditId(agenda.id)
                  setData(agenda)
                handleShow() 
                }}
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
