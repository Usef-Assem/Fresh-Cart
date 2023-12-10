import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Helmet } from "react-helmet";
import axios from "axios";
import {Link} from 'react-router-dom'

export default function Cart () {
    const [TotalCartPrice, setTotalCartPrice] = useState(0)
    const [CartDetails, setCartDetails] = useState([])
    let {getLoggedUserCart , RemoveSpecificItem , UpdateCartProductQuantity } = useContext(CartContext)

 async function clearCart(){
    let res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
            token: localStorage.getItem('userToken')
        }
    }).then((res)=>res).catch((err)=>{console.log(err);})
    setCartDetails([])
    setTotalCartPrice(0)
 }

   async function getCartItems(){
       let {data} = await getLoggedUserCart()
       console.log(data);
       setCartDetails(data)
       setTotalCartPrice(data?.data.totalCartPrice)
       console.log(CartDetails);
    }
    

    useEffect(()=>{
        getCartItems()
       } , [])

       async function removeItem(id){
        let {data} = await RemoveSpecificItem(id)
        setCartDetails(data)
       }

       async function UpdateProductQuantity(id , count){
        let {data} = await UpdateCartProductQuantity(id , count)
        setCartDetails(data)
       }
       

    return <>

                <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                </Helmet>

    {CartDetails?<div className="w-100 mx-auto bg-main-light p-3">
        <div className="d-flex justify-content-between align-items-center">
        <div className="col-md-8 col-sm-8 D-width ">
        <h2 className="text-main ">Shop Cart</h2>
        <h2 className=" h5 text-main price-width">Total Cart Price : {TotalCartPrice} EGP</h2>
        </div>
        <div className="col-md-4 col-sm-4 w-25 ">
        <button className="btn bg-main text-white" onClick={clearCart}>Clear cart</button>
        </div>
        </div>
        {CartDetails?.data?.products.map((product)=>{
            return <div key={product.product._id} className="row">
                <div className=" col-md-2 py-2">
                    <img className="w-100" src={product.product.imageCover} alt="" />
                </div>
                <div className="col-md-10 col-sm-10 border-bottom">
                    <div className="d-flex justify-content-between align-items-center ">
                    <div className=" mt-2 w-75 py-3 col-md-9 col-sm-2">   
                    <h2 className="h6 w-75 "> {product.product.title} </h2>
                    <h2 className="h6 text-main">Price : {product.price} EGP</h2>
                    <button onClick={()=>removeItem(product.product._id)} className="btn p-0 text-danger"> <i className=" text-danger fas fa-trash-can"></i> Remove </button>
                    </div>
                    <div className="d-flex align-items-center">
                    <button onClick={()=>UpdateProductQuantity(product.product._id , product.count++ )} className="btn border-main p-1">+</button>
                    <span className="mx-2">{product.count}</span>
                    <button onClick={()=>UpdateProductQuantity(product.product._id , product.count--)} className="btn border-main p-1">-</button>
                    </div>
                    </div>
                </div>
            </div>
        })}
        <div className="col-md-4 col-sm-12">
        <Link className='bg-main btn-width mx-2 btn mt-3 text-white' to={'/Address/' + CartDetails?.data?._id } >Check Out</Link>
        <Link className='bg-main btn-width mx-2 btn mt-3 text-white' to={'/Delivery/' + CartDetails?.data?._id } >Cash on Delivery</Link>
        </div>
    </div> : <div className="d-flex justify-content-center mt-4 align-items-center">
<h2>Your cart is empty</h2>
    </div> }
        
    </>;
}
