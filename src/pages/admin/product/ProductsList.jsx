import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/admin/Spinner';
import Modal from '../../../components/modal/Modal';
import { useDeleteProductMutation, useGetProductsQuery } from '../../../store/services/productServices';
import Wrapper from '../Wrapper';

const ProductList = () => {
    const {data,isFetching} = useGetProductsQuery()
    const [products, setProducts] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteProId, setdeleteProId] = useState("")
    const [deleteProd,res] = useDeleteProductMutation()
    useEffect(()=>{
      if(isFetching === false){
        setProducts(data)
      }
    },[data, isFetching])
    const deleteProduct = id => {
      deleteProd(id)
    }
    const deleteClick = id => {
      setDeleteModal(true)
      setdeleteProId(id)
    }
  return (
    <Wrapper>
       <div className=' flex flex-col gap-8'>
        <div className=' my-2'>
        <Link to={"/admin/create-product"} className='bg-white
          items-center flex w-[18%] gap-2 px-2 py-2 hover:bg-orange-300 hover:text-black
           rounded-lg border border-black font-semibold text-black'>
                <p className='font-medium  text-lg text-gray-900'>Create Product</p>
                <IoMdAdd size={24}/>
                </Link>
        </div>
      {
        isFetching === false ? 
        <table className="rounded-lg overflow-hidden w-[100%] my-4 mr-4">
        <thead className="w-full rounded-full bg-gray-800">
          <tr>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
            name
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              price
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              stock
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              image
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              edit
            </th>
            <th className="py-4 px-14  uppercase text-xs font-bold text-white text-left">
              delete
            </th>
          </tr>
        </thead>
        <tbody>
        { products?.map(product => (
           <tr className="bg-gray-900  even:bg-gray-800">
            <td className="p-4 text-sm text-gray-700">
             <div className="flex items-center justify-center">
               <h6 className="font-semibold text-lg text-white">{product.name}</h6>
             </div>
           </td>
           <td className="p-4 text-sm text-gray-700">
             <div className='flex   items-center  justify-center'>
               <h6 className="font-semibold text-lg text-white">{product.price}</h6>
             </div>
           </td>
           <td className="p-4 text-sm text-gray-700">
           <div className='flex   items-center  justify-center'>
               <h6 className="font-semibold text-lg text-white">{product.stock}</h6>
             </div>
           </td>
           <td className="p-4  text-sm text-gray-700">
           <div className="flex items-center justify-center">
           <img
               className="w-16  h-16 object-cover rounded-lg"
               src={product.images[0]?.url}
               alt="item"
             />
           </div>
           </td>
           <td>
             <Link to={`/admin/update-product/${product._id}`} className="flex items-center justify-center">
               <BiEdit size={20} color="white"/>
             </Link>
           </td>
           <td>
             <div className="flex items-center justify-center">
               <AiFillDelete className=' cursor-pointer' onClick={()=>deleteClick(product._id)} size={20} color="red"/>
             </div>
           </td>
           </tr>
        )) }
        </tbody>
          </table> : 
          <div className="w-full  h-[50vh] flex items-center justify-center">
          <Spinner />
        </div>
      }
       </div>
       {deleteModal && <Modal name={"Product"} setState={setDeleteModal} id={deleteProId} actionFunction={deleteProduct} state={deleteModal} />}
    </Wrapper>
  )
}

export default ProductList