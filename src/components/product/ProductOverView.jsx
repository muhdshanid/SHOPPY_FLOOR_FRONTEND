import React, { useEffect, useState } from "react";
import {
  MdOutlineAssignmentReturned,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import service5 from "../../assets/images/service-05.png";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../store/reducers/cartReducer";
import { useGetProductQuery } from "../../store/services/productServices";
import { discount } from "../../utils/discount";
import StarRating from "./StarRating";
const ProductOverView = ({ id }) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.authReducer)
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [selectedImage, setSelectedImage] = useState("");
  const { data, isFetching, isSuccess, isLoading } = useGetProductQuery(id);

  useEffect(() => {
    if (isFetching === false && isSuccess && !isLoading) {
      setProduct(data);
      setSelectedColor(data.colors[0]);
      setSelectedSize(data.sizes[0]);
      setSelectedImage(data?.images[0]);
    }
  }, [data, isFetching, isLoading, isSuccess, product?.images]);
  const discountPrice = discount(product.price, product.discount);
  const incQty = () => {
    setQuantity((prev) => (prev < product.stock ? prev + 1 : product.stock));
  };
  const decQty = () => {
    setQuantity((prev) => (prev !== 1 ? prev - 1 : 1));
  };
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
  return (
    <div className="w-12/12 flex gap-8">
      <div className="my-2 w-full  md:grid-cols-1 lg:grid-cols-2  grid grid-cols-1 sm:grid-cols-1   gap-8">
        
          <>
            <div className="">
              <div className="bg-g-2 p-4  rl ">
                {product?.images?.length > 0 ? (
                  <div className=" rl bg-white  w-full">
                    {selectedImage !== "" && (
                      <img
                        className="w-full p-1 object-contain h-[29pc]  rl "
                        src={selectedImage?.url}
                        alt="product"
                      />
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div className="flex   py-4 gap-8 w-12/12 bg-g-2 rl">
                  {product?.images?.length > 0 &&
                    product.images.slice(0,4).map((img,i) => (
                      <div key={i} className="p-1 rl bg-white w-3/12">
                        <img
                          onClick={() => setSelectedImage(img)}
                          className="rl  cp h-[8rem] object-contain w-full"
                          src={img.url}
                          alt="product"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="">
              <div className="px-4 fc gap-4">
                <div className="flex border-b border-gray-200  pb-4 flex-col gap-4">
                  <div className="flex-ic justify-start">
                    <h2 className="font-bold cap text-3xl text-gray-900">
                      {product?.name}
                    </h2>
                  </div>
                  <div className="w-[80%]">
                    <p className="font-semibold text-base text-gray-400">
                      {product?.description}
                    </p>
                  </div>
                  <div className="flex-ic gap-2">
                    <div className="flex ">
                      <StarRating rating={product?.totalRatings} />
                    </div>
                    <div>
                      <p className=" font-semibold text-lg text-gray-400">
                        ({product?.reviews?.length})
                      </p>
                    </div>
                  </div>
                </div>
                <div className="fc gap-2 border-b border-gray-200 pb-4 pt-2">
                  <div className="flex  items-center md:w-[60%] w-[100%] justify-between">
                    <h2 className="font-bold text-2xl text-gray-900">
                      ₹{discountPrice}
                    </h2>
                    <h2 className="font-bold text-2xl   line-through text-gray-900">
                      ₹{product.price}
                    </h2>
                    <div
                      className="  px-4 py-1
                 text-white text-sm font-semibold bg-rose-600 rounded-full"
                    >
                      <p>{product?.discount}%off</p>
                    </div>
                  </div>
                  <div className="flex gap-2 py-4 items-center ">
                    <img src={service5} alt="secure-pay" />
                    <p className="font-semibold text-base text-gray-400">
                      100% Protected Payment
                    </p>
                  </div>
                </div>
                {product?.colors?.length > 0 && (
                  <div className="fc gap-4 border-b border-gray-200 pb-4 pt-2">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">
                        Choose a color
                      </h4>
                    </div>
                    <div className="flex flex-wrap pb-2 gap-4 items-center w-[80%]">
                      {product?.colors?.map((clr, i) => (
                        <>
                          <div key={i}
                            onClick={() => setSelectedColor(clr)}
                            style={{ backgroundColor: clr.color }}
                            className={`
                            ${
                              clr.id === selectedColor.id
                                ? "border-2 border-black/100  "
                                : ""
                            }
                             rounded-full w-8 h-8`}
                          ></div>
                        </>
                      ))}
                    </div>
                  </div>
                )}
                {product?.sizes?.length > 0 && (
                  <div className="fc gap-4 border-b border-gray-200 pb-4 pt-2">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">
                        Choose a size
                      </h4>
                    </div>
                    <div className="flex gap-4 items-center w-[80%]">
                      {
                        <div className="flex flex-wrap ">
                          {product?.sizes?.map((size, i) => (
                            <>
                              <div key={i}
                                onClick={() => setSelectedSize(size)}
                                className={`border-2
                                ${
                                  selectedSize.name === size.name
                                    ? "border-green-700 b "
                                    : "border-gray-900"
                                }
                                 
                                  ml-2 text-md  font-semibold px-3 py-1.5 mt-1 uppercase cp rounded
                                   text-gray-900`}
                              >
                                {size.name}
                              </div>
                            </>
                          ))}
                        </div>
                      }
                    </div>
                  </div>
                )}
                <div className="fc gap-4 border-b border-gray-200 pb-4 pt-2">
                  <div className="flex gap-8 items-center">
                    <div
                      className=" overflow-hidden flex-ic
                       justify-between rounded-full bg-g-2"
                    >
                      <div
                        onClick={decQty}
                        className="py-2 px-6  cp hover:bg-gray-300"
                      >
                        <h6 className="text-gray-900 text-3xl">-</h6>
                      </div>
                      <div className="py-3 px-6  cp hover:bg-gray-300">
                        <h6 className="text-gray-900 text-lg">{quantity}</h6>
                      </div>
                      <div
                        onClick={incQty}
                        className="py-2 px-6  cp hover:bg-gray-300"
                      >
                        <h6 className="text-gray-900 text-2xl">+</h6>
                      </div>
                    </div>
                    {product?.stock < 5 ? (
                      <div className="fc gap-1 ">
                        <p className="font-semibold text-sm text-gray-600">
                          Only{" "}
                          <span
                            className="
                          font-semibold text-sm text-orange-500"
                          >
                            {product.stock}
                          </span>{" "}
                          left!
                        </p>
                        <p className="font-semibold text-sm text-gray-600">
                          Don't miss it
                        </p>
                      </div>
                    ) : (
                      <div className="fc gap-1 ">
                        <p className="font-semibold text-sm text-gray-600">
                          {" "}
                          <span
                            className="
                          font-semibold text-sm text-orange-500"
                          >
                            {product.stock}
                          </span>{" "}
                          items available
                        </p>
                        <p className="font-semibold text-sm text-gray-600">
                          order now!
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 items-center px-1 py-4">
                    <Link 
                      to={user === null ? "/login" : {
                        pathname: `/checkout/${product._id}`,
                        hash: "#hash",
                        search: `?color=${
                          selectedColor?.color.split("#")[1]
                        }&size=${selectedSize?.name}&qty=${quantity}`,
                      }}
                      className="button-green"
                    >
                      Buy Now
                    </Link>
                    <button onClick={addToCartFn} className="  button-gray ">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="fc w-[90%] gap- border-b border-gray-200 pb-4 pt-2">
                  <div className="border fc py-4 px-8 border-gray-200">
                    <div className="flex-ic gap-2">
                      <MdOutlineLocalShipping size={20} color="green" />
                      <p className=" cap font-semibold text-lg text-gray-900">
                        Free Delivery
                      </p>
                    </div>
                    <div className="text-gray-900  font-normal underline  ">
                      <p>Enter your postal code to check available or not</p>
                    </div>
                  </div>
                  <div className="border fc py-4 px-8 border-gray-200">
                    <div className="flex-ic gap-2">
                      <MdOutlineAssignmentReturned size={20} color="green" />
                      <p className=" cap font-semibold text-lg text-gray-900">
                        Return Policy
                      </p>
                    </div>
                    <div className="text-gray-900 underline font-normal ">
                      <p>Enter your postal code to check availabel or not</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
      
      </div>
    </div>
  );
};

export default ProductOverView;
