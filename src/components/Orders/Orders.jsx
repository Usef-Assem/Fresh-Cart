import axios from 'axios';
import jwtDecode from 'jwt-decode'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function Orders() {
  const [allOrders, setallOrders] = useState([])
  let token = localStorage.getItem('userToken');
  let {id} = jwtDecode(token);


  async function getUserOrder(){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    console.log(data);
    setallOrders(data)

  }
  useEffect(() => {
    getUserOrder()
  }, [])
  
  return <>

      <Helmet>
      <meta charSet="utf-8" />
      <title>All Orders</title>
      </Helmet>
      {<div className='w-75 mx-auto bg-main-light p-5'>
      <div className='d-flex align-items-center'>
      <h2>Your orders :</h2>
      </div>
        {allOrders?.map((item)=>{
          return <div key={item?.cartItems[0]._id} className="row border-bottom py-4">
            <div className="col-md-2">
              <img className='w-100' src={item?.cartItems[0].product.imageCover} alt="" />
            </div>
            <div className="col-md-10 py-4">
              <h2 className='text-main h3'>{item?.cartItems[0].product.title}</h2>
              {/* <h2 className='fw-bolder h6'> Brand: {item?.cartItems[0]?.product.brand.name}</h2> */}
              <h2 className='fw-bolder h6'>  isDelivered : {(item[0]?.isDelivered)? 'Delivered': 'Not Delivered'}</h2>
              <h2 className='fw-bolder h6'>Price: {item?.cartItems[0].price} EGP</h2>
            </div>
            
          </div>
        })}
      </div> }
  
  </>
}
