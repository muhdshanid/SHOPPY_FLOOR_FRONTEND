import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "../../../store/services/brandServices";
import Spinner from "../../../components/admin/Spinner";
import Modal from "../../../components/modal/Modal";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const { data, isFetching } = useGetBrandsQuery();
  const [dltBrand, res] = useDeleteBrandMutation();
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteBrandId, setdeleteBrandId] = useState("")
  useEffect(() => {
    if (isFetching === false) {
      setBrands(data);
    }
  }, [data, isFetching]);
  const deleteBrand = (id) => {
    dltBrand(id);
  };
  const deleteClick = id => {
    setDeleteModal(true)
    setdeleteBrandId(id)
  }
  return (
    <Wrapper>
      <div className=" flex flex-col gap-8">
        <div className=" my-2">
          <Link
            to={"/admin/create-brand"}
            className="bg-white
          items-center flex w-[17%] gap-2 px-2 py-2 hover:bg-orange-300 hover:text-black
           rounded-lg border border-black font-semibold text-black"
          >
            <p className="font-medium  text-lg text-gray-900">Create Brand</p>
            <IoMdAdd size={24} />
          </Link>
        </div>
        {isFetching === false ? (
          <table className="rounded-lg w-full overflow-hidden  my-4 mr-4">
            <thead className="w-full rounded-full bg-gray-800">
              <tr>
                <th className="py-4 px-20  uppercase text-xs font-bold text-white text-left">
                  name
                </th>
                <th className="py-4 px-20  uppercase text-xs font-bold text-white text-left">
                  image
                </th>
                <th className="py-4 px-20  uppercase text-xs font-bold text-white text-left">
                  edit
                </th>
                <th className="py-4 px-20  uppercase text-xs font-bold text-white text-left">
                  delete
                </th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 &&
                brands.map((brand) => (
                  <tr className="bg-gray-900  even:bg-gray-800">
                    <td className="p-4 text-sm text-gray-700">
                      <div className="flex -ml-8 items-center justify-center">
                        <h6 className="font-semibold text-lg text-white">
                          {brand.name}{" "}
                        </h6>
                      </div>
                    </td>
                    <td className="p-4   text-sm text-gray-700">
                      <div className="flex   -ml-8 items-center justify-center">
                        <img
                          className="w-16  h-16 object-cover rounded-lg"
                          src={brand.image.url}
                          alt="item"
                        />
                      </div>
                    </td>
                    <td>
                      <Link
                        to={`/admin/update-brand/${brand._id}`}
                        className="flex  -ml-8 items-center justify-center"
                      >
                        <BiEdit size={20} color="white" />
                      </Link>
                    </td>
                    <td>
                      <div className="flex  -ml-8 items-center justify-center">
                        <AiFillDelete
                          className=" cursor-pointer"
                          onClick={() => deleteClick(brand._id)}
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
      {deleteModal && <Modal name={"Brand"} setState={setDeleteModal} id={deleteBrandId} actionFunction={deleteBrand} state={deleteModal} />}

    </Wrapper>
  );
};

export default BrandList;
