import React from 'react'
import { Button, Card } from 'reactstrap'

function BourseCard({ _id, titre, description, imgUrl, status, onDragStart }) {
  return (
    <Card className="draggable shadow-sm" id={_id} draggable="true" onDragStart={onDragStart}>
    <CardBody className="p-2">
      <div className="card-title d-flex justify-content-between">
        <a href="#" className="lead font-weight-light">{titre}</a>
        {status === 'attente' && 
      (<span class="bg-warning badge bg-secondary"> En attente </span>)}
      {status === 'acceptee' &&
      (<span class="bg-success badge bg-secondary"> Acceptée </span>)}
      {status === 'refusee' &&
      (<span class="bg-danger badge bg-secondary"> Refusee </span>)}
      </div>
      <p>{description}</p>
      <Button color="primary" size="sm">View</Button>
    </CardBody>
  </Card>
  )
}

export default BourseCard