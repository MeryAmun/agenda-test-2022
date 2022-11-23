import React, { useState } from 'react';
import { Table,Container } from 'react-bootstrap';
 

const now = new Date()
const initialState = {
title:'',
description:'',
status:'',
date: now.getDate()/now.getMonth()/now.getFullYear(),
time:now.toLocaleTimeString()
}
console.log(now.getDate(),now.getMonth() + 1,now.getFullYear(), now.toLocaleTimeString())

const HomeScreen = () => {
    const [agenda, setAgenda] = useState(initialState);



  return (
    <Container className='p-2 d-flex  flex-column justify-content-center align-items-center'>
<div className="header m-4">
    <h4>Agenda Application</h4>
</div>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>Completion Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>agenda Title</td>
          <td>Agenda Description</td>
          <td>done/pending</td>
          <td>started on</td>
          <td>completed on</td>
          <td>
            <button type='button' className='btn btn-primary m-1 border border-0'>Add</button>
            <button type='button' className='btn btn-primary m-1 bg-danger border border-0'>Remove</button>
            <button type='button' className='btn btn-primary m-1 bg-success border border-0'>Edit</button>
          </td>
        </tr>
       
          {/* <td colSpan={2}>Larry the Bird</td>
          <td colSpan={2}>Larry the Bird</td> */}
      </tbody>
    </Table>
    </Container>
  )
}

export default HomeScreen