import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BreadCrumbs from "../../components/BreadCrumbs";
import ProductCard from "../../components/home/ProductCard";
import ProductDetailsSkeleton from "../../components/loading/ProductDetailsSkeleton";
import ProductOverviewSkeleton from "../../components/loading/ProductOverviewSkeleton";
import ReviewSkeleton from "../../components/loading/ReviewSkeleton";
import ProductOverView from "../../components/product/ProductOverView";
import ProductSpecifications from "../../components/product/ProductSpecifications";
import Reviews from "../../components/product/Reviews";
import { useGetCatProductsQuery, useGetProductQuery } from "../../store/services/productServices";

const ProductDetails = () => {
  const {id} = useParams()
  const [product, setProduct] = useState({})
  const [catProducts, setCatProducts] = useState([])
  const [slicedArray, setSlicedArray] = useState([])
  const {data,isFetching} = useGetProductQuery(id)
  const {data:result,isFetching:gettingData,isLoading} = useGetCatProductsQuery(product.category)
  useEffect(() => {
    if (isFetching === false) {
      setProduct(data);
    }
  }, [data, isFetching]);
  useEffect(() => {
    if (gettingData === false) {
      setCatProducts(result);
      const filter = catProducts.filter(pro => pro._id !== product._id)
      setSlicedArray(filter.slice(0,4))
    }
  }, [result, gettingData, catProducts, product._id]);
  return (
   isFetching === false && isLoading === false ? <div>
      <BreadCrumbs title={product?.name} />
      <div className="w-12/12 py-4 flex flex-col px-4
     lg:px-16 md:px-14 sm:px-8  min-h-screen bg-gray-100">
        <ProductOverView id={id}/>
        <ProductSpecifications id={id}/>
        <Reviews id={id}/>
        <ProductCard products={slicedArray} page={"category"}  caption={"Products You May Like"}/>
      </div>
    </div>
    :
      <div className="w-12/12 py-4  flex-col px-4
      lg:px-16 md:px-14 sm:px-8  grid grid-cols-1 gap-6 md:grid-cols-2 gri min-h-screen bg-gray-100">
        <ProductOverviewSkeleton />
        <ProductDetailsSkeleton />
        <ReviewSkeleton/>
        <ReviewSkeleton/>
        <ReviewSkeleton/>
        <ReviewSkeleton/>
      </div>

  );
};

export default ProductDetails;
