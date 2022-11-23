import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'


const now = new Date()
const initialState = {
title:'',
description:'',
status:'',
date: now.getDate()/now.getMonth()/now.getFullYear(),
time:now.toLocaleTimeString()
}
console.log(now.getDate(),now.getMonth() + 1,now.getFullYear(), now.toLocaleTimeString());


const ModalComponent = ({showModal, handleClose}) => {
    const [data, setData] = useState(initialState)
   
    


  return (
    <>
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ModalComponent