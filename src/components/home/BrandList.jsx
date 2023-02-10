import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useGetBrandsQuery } from "../../store/services/brandServices";
import BrandSkeleton from "../loading/BrandSkeleton";
const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const { data, isFetching ,isLoading} = useGetBrandsQuery();
  useEffect(() => {
    if (isFetching === false) {
      setBrands(data);
    }
  }, [data, isFetching]);
  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="flex   items-center justify-between">
        <div className="flex">
          <h6 className="font-semibold text-2xl text-gray-900">
            Popular Brands
          </h6>
        </div>
      </div>
      <div className="my-2 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {isFetching || isLoading ? (
          <>
            <BrandSkeleton />
            <BrandSkeleton />
            <BrandSkeleton />
            <BrandSkeleton />
          </>
        ) : (
          brands?.length > 0 &&
          brands?.filter(brnd => brnd.name !== "hp").map((brand) => (
            <div key={brand._id}
              className="relative border border-gray-200
            cp hover:bg-g-9 flex gap-8 rl bg-g-2"
            >
              <img
                src={brand.image.url}
                className=" 
                   object-cover w-full rl h-[10rem] "
                alt="brand"
              />
              <div className="right-2 bottom-2 absolute">
                <Link
                  to={`/brand-products/${brand.name}`}
                  className="text-white flex-ic hover:underline   font-semibold   gap-2"
                >
                  Explore
                  <span className="hidden lg:flex">Products</span>
                  <span>
                    <FaArrowRight />
                  </span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrandList;
