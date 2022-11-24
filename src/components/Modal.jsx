import React, { useState,useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';



const _id = uuid().slice(0,2)
const now = new Date();


const initialState = {
id:_id,
title:'',
description:'',
status:'',
startDate: now.toDateString(),
endDate:'',
}



const ModalComponent = ({showModal, handleClose}) => {
    const [data, setData] = useState(initialState);
    const [agenda, setAgenda] = useState([]);
   
    const handleChange = (e) => {
 const {name, value } = e.target
 setData((prev) =>  {
    return {...prev, [name]:value }
 })
    }

const handleSubmit = () => {
setAgenda((prev) => {
    return [...prev, data]
})
}

  

useEffect(() => {
    console.log(agenda)
}, [agenda])

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
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control as="textarea" rows={3} placeholder="Description" name='description'  onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
           <Form.Select aria-label="Default select example" name='status' onChange={handleChange}>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 outline-light" controlId="title">
            <Form.Control
              type="text"
              placeholder="End Date"
              autoFocus
              name='endDate'
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