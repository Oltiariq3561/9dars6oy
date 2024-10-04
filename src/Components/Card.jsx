import React from 'react'

function Card(props) {
    const {name,price,description , id} = props.product;
    const {delFunc} = props;
  return (
    <div className='w-1/4 p-3 border rounded-md'>
    <div>{name}</div>
    <div>{price}</div>
    <div>{description}</div>

    <button onClick={()=>{delFunc(id)}} className='bg-red-600 py-2 px-3 text-white cursor-pointer rounded-md'>delete</button>
    </div>
  )
}

export default Card