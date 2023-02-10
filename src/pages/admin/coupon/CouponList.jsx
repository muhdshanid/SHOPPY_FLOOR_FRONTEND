import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "../../../store/services/couponServices";
import moment from "moment";
import Spinner from "../../../components/admin/Spinner";
import Modal from "../../../components/modal/Modal";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const { data, isFetching } = useGetCouponsQuery();
  const [dltCoupon, res] = useDeleteCouponMutation();
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteBrandId, setdeleteBrandId] = useState("")
  useEffect(() => {
    if (isFetching === false) {
      setCoupons(data);
    }
  }, [data, isFetching]);
  const deleteCoupon = (id) => {
    dltCoupon(id);
  };
  const deleteClick = id => {
    setDeleteModal(true)
    setdeleteBrandId(id)
  }
  return (
    <Wrapper>
      <div className=" flex  flex-col gap-8">
        <div className=" my-2">
          <Link
            to={"/admin/create-coupon"}
            className="bg-white
          items-center flex w-[18%] gap-2 px-2 py-2 hover:bg-orange-300 hover:text-black
           rounded-lg border border-black font-semibold text-black"
          >
            <p className="font-medium  text-lg text-gray-900">Create Coupon</p>
            <IoMdAdd size={24} />
          </Link>
        </div>
        {isFetching === false ? (
          <table className="rounded-lg overflow-hidden w-[100%] my-4 mr-4">
            <thead className="w-full rounded-full bg-gray-800">
              <tr>
                <th className="py-4 px-20  uppercase text-xs font-bold text-white text-left">
                  name
                </th>
                <th className="py-4 px-8  uppercase text-xs font-bold text-white text-left">
                  expiry date
                </th>
                <th className="py-4 px-8  uppercase text-xs font-bold text-white text-left">
                  discount
                </th>
                <th className="py-4 px-8  uppercase text-xs font-bold text-white text-left">
                  edit
                </th>
                <th className="py-4 px-8  uppercase text-xs font-bold text-white text-left">
                  delete
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons?.length > 0 &&
                coupons?.map((coupon) => (
                  <tr className="bg-gray-900  even:bg-gray-800">
                    <td className="p-8 text-sm text-gray-700">
                      <div className="flex -ml-8 items-center justify-center">
                        <h6 className="font-semibold text-lg text-white">
                          {coupon.name}
                        </h6>
                      </div>
                    </td>
                    <td className="p-8  text-sm text-gray-700">
                      <div className="flex  -ml-14 items-center justify-center">
                        <h6 className="font-semibold text-lg text-white">
                          {moment(coupon.expiry).format("L")}
                        </h6>
                      </div>
                    </td>
                    <td className="p-8  text-sm text-gray-700">
                      <div className="flex  -ml-16 items-center justify-center">
                        <h6 className="font-semibold text-lg text-white">
                          {coupon.discount}
                        </h6>
                      </div>
                    </td>
                    <td>
                      <Link
                        to={`/admin/update-coupon/${coupon._id}`}
                        className="flex -ml-10 items-center justify-center"
                      >
                        <BiEdit size={20} color="white" />
                      </Link>
                    </td>
                    <td>
                      <div className="flex -ml-10 items-center justify-center">
                        <AiFillDelete
                          className=" cursor-pointer"
                          onClick={() => deleteClick(coupon._id)}
                          size={20}
                          color="red"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full  h-[50vh] flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
      {deleteModal && <Modal name={"Coupon"} 
      setState={setDeleteModal} id={deleteBrandId} actionFunction={deleteCoupon} state={deleteModal} />}
    </Wrapper>
  );
};

export default CouponList;
