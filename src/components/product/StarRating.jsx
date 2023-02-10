import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const StarRating = ({rating}) => {
  return (
    
   rating == 0 ?
    <>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    </>
    : rating == 1 ? 
    <>
    <AiFillStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    </>
    : rating == 2 ? 
    <>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    </>
    : rating == 3 ? 
    <>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    </>
    : rating == 4 ? 
    <>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    <AiOutlineStar size={24} color='green'/>
    </>
    : rating == 5 ? 
    <>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    <AiFillStar size={24} color='green'/>
    </>
    : ""
  )
}

export default StarRating