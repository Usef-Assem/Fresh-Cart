import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import { wishlistContext } from "../../context/WishlistContext";
import { useState } from "react";
import { useEffect } from "react";






export default function Products () {
const [WishedItems, setWishedItems] = useState(null)
let {addTOCart} = useContext(CartContext)
let {addProductToWishlist , getLoggedUserWishlist} = useContext(wishlistContext)
    
    async function AddToWishlist(id){
       let res = await addProductToWishlist(id);
       if(res.data.status === 'success' , {
        duration: 2000,
    }){
        toast.success('Product added succesfully to your Wishlist')
    }
    else{
        toast.error('Error Adding Product')
    }
    }

    async function getAllWishItems(){
        let {data} = await getLoggedUserWishlist()
        setWishedItems(data?.data)
       
    }

    useEffect(() => {
        getAllWishItems()
    }, [WishedItems])
    


    async function addProduct(ProductId){
        let Response = await addTOCart(ProductId);
        if(Response.data.status === 'success' , {
            duration: 2000,
        }){
            toast.success('Product added succesfully')
        }
        else{
            toast.error('Error Adding Product')
        }
    }

   function getAllProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
   }

   let {isError , isFetching , isLoading , data , refetch} = useQuery('productRequest' , getAllProducts , {
    // cacheTime:7000 ,
    // refetchOnMount: false ,
    // staleTime:5000,
    // refetchInterval: 4000
    // enabled : false
    })
    
    
    return <>
    {isLoading?    <div className="w-100 d-flex justify-content-center py-5">
    <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
    </div> : <div className="container">
    <div className="row">
        {data?.data.data.map((product)=>{
            return  <div key={product._id} className=" col-sm-6 col-md-3 col-lg-2 col-6">
                <div className="product py-5 overflow-hidden cursor-pointer position-relative ">
                <Link to={`/ProductDetails/${product._id}`}>
                    <img className="w-100 cursor-pointer" src={product.imageCover} alt="" />
                    <h3>{product.title.split(' ').slice(0,3).join(' ')}</h3>
                    <h5 className="font-sm text-main">{product.category.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">price: {product.price} EGP</span> 
                    <span> <i className="fa-solid fa-star"  style={{ color: "#adea2a" }}></i> {product.ratingsAverage}</span>
                    </div>
                </Link>
                   <button onClick={()=> addProduct(product._id)} className="btn bg-main text-white mt-3 w-100">Add To Cart</button> 
                    <div className="icon-cstm ms-auto position-absolute">
                    <i onClick={()=>AddToWishlist(product._id)} className={`cursor-pointer fa-solid fa-heart fa-xl ${WishedItems && WishedItems.find((item) => item._id === product._id)? 'icon-color1' : '' } `}></i>
                    </div>
                </div>

            </div>
        })}
    </div>
    </div>}

    </>;
}
