import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function BourseList() {
    const { category } = useParams();
    useEffect(() =>{
        console.log(category);
        
    })
  return (
    <div>BourseList</div>
  )
}

export default BourseList