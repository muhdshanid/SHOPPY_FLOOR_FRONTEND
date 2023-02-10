import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/reducers/cartReducer";
import StarRating from "./StarRating";
import { IoClose } from "react-icons/io5";
import { discount } from "../../utils/discount";
import { useRemoveFromWishlistMutation } from "../../store/services/userServices";
import { Link } from "react-router-dom";
const SingleProductDetails = ({
  product,
  descriptionForSmallScreen,
  descriptionForLargeScreen,
}) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.url);
  const [remove, res] = useRemoveFromWishlistMutation();
  const finalPrice = discount(product?.price, product?.discount);
  const addToCartFn = () => {
    const {
      colors,
      sizes,
      createdAt,
      updatedAt,
      tags,
      specifications,
      questions,
      ratings,
      description,
      ...newProduct
    } = product;
    newProduct["size"] = selectedSize;
    newProduct["color"] = selectedColor;
    newProduct["quantity"] = quantity;
    const cart = localStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];
    const checkItem = cartItems.find((item) => item._id === newProduct._id);
    if (!checkItem) {
      console.log(newProduct);
      dispatch(addToCart(newProduct));
      cartItems.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("add to localstorage");
    } else {
      alert("already in cart");
      return;
    }
  };
  const removeFromWishlist = () => {
    remove({ proId: product._id });
  };
  return (
    <div className="fc gap-2 my-4  relative ">
      <Link
        className="w-full 
     bg-white rl"
        to={`/product/${product?._id}`}
      >
        <img
          src={product.images[0].url}
          alt="product"
          className="bg-white
        animation
         duration-500
         object-contain h-[15rem] md:h-[20rem] w-full rl"
        />
      </Link>
      <div
        onClick={removeFromWishlist}
        className={`absolute
        ${res?.isLoading ? "animate-bounce" : ""}
        animation
         duration-300 
         hover:bg-gray-200 cp p-2 top-2 right-2 rf
          bg-gray-100`}
      >
        <IoClose color="red" size={16} />
      </div>
      <div className="fc gap-2">
        <div className="fc ">
          <div className="lg:flex  lg:flex-row lg:items-center lg:justify-between flex flex-col">
            <h6 className="font-bold cap text-lg text-gray-900">
              {product?.name}
            </h6>
            <h6 className="font-bold text-lg text-gray-900">₹{finalPrice}</h6>
          </div>
          <div>
            <p className=" font-semibold hidden lg:flex text-sm text-gray-400">
              {descriptionForLargeScreen}
            </p>
            <p className=" font-semibold lg:hidden text-sm text-gray-400">
              {descriptionForSmallScreen}
            </p>
          </div>
          <div className="flex-ic gap-2">
            <div className="flex">
              <StarRating rating={product?.totalRatings} />
            </div>
            <div>
              <p className=" font-semibold text-lg text-gray-400">
                ({product?.reviews.length})
              </p>
            </div>
          </div>
        </div>
        <div
          className="lg:flex lg:flex-row lg:items-center gap-4 
        lg:justify-between flex flex-col"
        >
          <button
            onClick={addToCartFn}
            className="
        button-green  !w-full"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
