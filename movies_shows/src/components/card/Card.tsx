import { Link } from '@mui/material'
import React from 'react'
import './Card.css'

function Card(props: any) {
  return (
    <div className='card'>
      <img src={props.image} className="image"/>
      <h1 className='title'>{props.title}</h1>
      <Link onClick={props.link}>See details...</Link>
    </div>
  )
}

export default Card