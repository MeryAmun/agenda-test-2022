import React, { useState,useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import{ useDispatch, useSelector} from 'react-redux'
import { addAGenda, editAGenda } from '../redux/actions';



const _id = uuid().slice(0,2)
const now = new Date();



const initialState = {
title:'',
description:'',
status:'',
startDate: now.toDateString(),
deadline:'',
}



const ModalComponent = ({showModal, handleClose,currentId, setCurrentId}) => {
    const [data, setData] = useState(initialState);
    const {agendas}  = useSelector((state) => state.reducer);
    const dispatch = useDispatch();
    const [storeData, setStoreData] = useState(agendas)
    const agenda = useSelector((agendas) =>
    currentId ? agendas.find((a,index) => index === currentId) : null
  )
useEffect(() => { localStorage.setItem('agendas', JSON.stringify(storeData)); }, [storeData]);


  console.log(agendas,'state')
  console.log(agenda)
   
    const handleChange = (e) => {
 const {name, value } = e.target
 setData((prev) =>  {
    return {...prev, [name]:value }
 })
    }
    useEffect(() => {
      if (agenda) setData(agenda)
    }, [agenda])
   
const handleSubmit = (e) => { 
  e.preventDefault() 
  if (!currentId) {
    dispatch(addAGenda(data))
  } else {
    dispatch(editAGenda(currentId,data))
  }
  clear()

}

const clear = () => {
  setCurrentId(null)
  setData({
    title:'',
    description:'',
    status:'',
    startDate: now.toDateString(),
    deadline:'',
  })
}


// useEffect(() => {
//   localStorage.setItem('agendas', JSON.stringify())
// }, [agendas])

  return (
    <>
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3 outline-light" controlId="title" onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Title"
              autoFocus
              name='title'
              value={data.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control as="textarea" rows={3} placeholder="Description" value={data.description} name='description'  onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
           <Form.Select aria-label="Default select example" value={data.status} name='status' onChange={handleChange}>
      <option>Select Status</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 outline-light" controlId="title">
            <Form.Control
              type="text"
              placeholder="End Date"
              autoFocus
              name='deadline'
              value={data.deadline}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type='submit' onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ModalComponent