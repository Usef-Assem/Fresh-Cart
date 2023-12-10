import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { CartContext } from '../../context/cartContext'
import { wishlistContext } from '../../context/WishlistContext'




export default function Wishlist() {
    const [Wishlist, setWishlist] = useState([])
    let {getLoggedUserWishlist , removeProductFromWishlist} = useContext(wishlistContext)
    let {addTOCart} = useContext(CartContext)

    async function addProduct(ProductId){
        let Response = await addTOCart(ProductId);
        console.log(Response);
        if(Response.data.status === 'success' , {
            duration: 2000,
        }){
            toast.success('Product added succesfully')
        }
        else{
            toast.error('Error Adding Product')
        }
    }


    async function getWishlistItems(){
        let{data} = await getLoggedUserWishlist()
        setWishlist(data)
        // console.log(Wishlist?.data);
    }
    useEffect(()=>{
        getWishlistItems()
    },[])

    async function removeWishlistItem(id){
           let res = await removeProductFromWishlist(id)
            if(res?.data.status === 'success' , {
                duration: 2000,
            }){
                toast.success('Product deleted succesfully')
            }
            else{
                toast.error('Error deleting Product')
            }
            getWishlistItems()
        }
    

  return <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist</title>
        </Helmet>
        <div className='w-75 mx-auto bg-main-light p-3'>
            <h2>My Wishlist</h2>
            {Wishlist?.data?.map((product)=>{
                return <div key={product._id} className="row">
                    <div className="col-md-2 py-2">
                        <img className='w-100' src={product.imageCover} alt="" />
                    </div>

                    <div className="col-md-10 col-sm-10 border-bottom">
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className="mt-2 w-75 py-3 col-md-9 col-sm-2">
                            <h2 className="h6 w-75 "> {product.title} </h2>
                            <h2 className="h6 text-main">Price : {product.price} EGP</h2>
                            <button onClick={()=>removeWishlistItem(product._id)} className="btn p-0 text-danger"> <i className=" text-danger fas fa-trash-can"></i> Remove </button>
                            </div>
                            <div className='col-md-3 col-sm-7'>
                                <button onClick={()=>addProduct(product._id)} className='btn btn-outline-success'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            })}

        </div>
    </>
}

