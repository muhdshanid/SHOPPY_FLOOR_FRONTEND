import React, { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { SlEmotsmile } from "react-icons/sl";
import StarRating from "./StarRating";
import { CgSpinner } from "react-icons/cg";
import WarningModal from '../modal/WarningModal'
import Dropzone from "react-dropzone";
import {
  useAskQuestionMutation,
  useGetProductQuery,
  useLikeQuestionMutation,
  useLikeReviewMutation,
  useReviewProductMutation,
} from "../../store/services/productServices";
import { useUploadReviewImageMutation } from "../../store/services/uploadServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Reviews = ({ id }) => {
  const navigate  = useNavigate()
  const { user } = useSelector((state) => state.authReducer);
  const [star, setStar] = useState(1);
  const [comment, setComment] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [question, setQuestion] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [warningModal, setWarningModal] = useState(false)
  const [product, setProduct] = useState({});
  const { data, isFetching, isSuccess, isLoading } = useGetProductQuery(id);
  const [uploadImages, res] = useUploadReviewImageMutation();
  const [likeReviewMutation, response] = useLikeReviewMutation();
  const [likeQuestionMutation, result] = useLikeQuestionMutation();
  const [reviewProd, {error,isLoading:loading}] = useReviewProductMutation();
  const [questionPost, ress] = useAskQuestionMutation();
  useEffect(() => {
    if (isFetching === false && isSuccess && !isLoading) {
      setProduct(data);
    }
  }, [data, isFetching, isLoading, isSuccess]);
  useEffect(() => {
    if (res.isSuccess) {
      setReviewImages(res.data);
      setImageUploading(false);
    }
  }, [res?.data, res.isSuccess]);

  const uploadReviewImages = (acceptedFiles) => {
    if(user === null){
      navigate("/login")
    }
    const formData = new FormData();
    // if (acceptedFiles.length > 4) {
    //   setisFourImages(false);
    //   return;
    // }
    for (let i = 0; i < acceptedFiles.length; i++) {
      formData.append("images", acceptedFiles[i]);
    }
    uploadImages(formData);
    setImageUploading(true);
  };
  const reviewProduct = () => {
    if(user === null){
      navigate("/login")
    }
    if (comment !== "") {
      reviewProd({ proId: product._id, star, comment, images: reviewImages });
      setComment("");
    }
  };
  const askQuestion = () => {
    if(user === null){
      navigate("/login")
    }
    if (question !== "") {
      questionPost({ question, proId: product._id });
      setQuestion("");
    }
  };
  const likeReview = (id, button) => {
    if(user === null){
      navigate("/login")
    }
    likeReviewMutation({ id, button });
  };
  const likeQuestion = (qId, button) => {
    if(user === null){
      navigate("/login")
    }
    likeQuestionMutation({ qId, button, proId: product._id });
  };
  return (
    <div className="w-12/12  fc gap-8">
      <div className=" w-full md:grid-cols-1 lg:grid-cols-2  grid grid-cols-1 sm:grid-cols-1  gap-8">
        <div className="fc gap-6">
          <div className="flex">
            <h6 className="font-semibold cap text-2xl text-gray-900">
              Reviews
            </h6>
          </div>
          <div className="bg-g-2  justify-between fc h-auto gap-4 p-4 rl ">
            <div className="fc gap-4">
              <div>
                <h6 className="font-semibold cap text-lg text-gray-800">
                  Customer Reviews
                </h6>
              </div>
              <div className="flex-ic gap-2">
                <div className="flex">
                  <StarRating rating={product?.totalRatings} />
                </div>
                <div>
                  <p className=" font-semibold cap text-lg text-gray-400">
                    {product?.reviews?.length > 0
                      ? `Based on  
                        ${product?.reviews?.length} Reviews`
                      : "0 Reviews"}
                  </p>
                </div>
              </div>
                  <p className="font-semibold text-gray-900">Only ordered user can add review</p>
            </div>
            {product?.reviews?.length > 0 ? (
              product?.reviews.map((review) => (
                <div
                  className="flex 
                     overflow-hidden overflow-y-scroll p-4 grow bg-white rl flex-col my-4 gap-4"
                >
                  <div className="flex pb-2  border-b flex-col gap-4">
                    <div className="flex-ic gap-4">
                      <div>
                        <h6 className="font-semibold text-xl text-gray-800">
                          {review.postedUserName}
                        </h6>
                      </div>
                      <div className="flex">
                        <StarRating rating={review.star} />
                      </div>
                      <div className="flex ">
                        <TiTick size={20} color="green" />
                        <p className="font-semibold text-sm text-gray-400">
                          Certified Buyer
                        </p>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className=" font-semibold text-sm text-gray-400">
                        {review.comment}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4">
                      {review?.images?.length > 0
                        ? review.images.map((img) => (
                            <div className="p-4 border rl flex items-center justify-center h-[150px] w-12/12">
                              <img
                                className="rl p-1 h-full object-cover"
                                src={img.url}
                                alt="product"
                              />
                            </div>
                          ))
                        : ""}
                    </div>
                    <div className="flex gap-2 ">
                      <div
                        className="rounded-full items-center flex gap-2 
                        cp p-2 "
                      >
                        {review?.likes?.includes(user?._id) ? (
                          <AiFillLike
                            onClick={() => likeReview(review._id, "like")}
                            size={20}
                            color="green"
                          />
                        ) : (
                          <AiOutlineLike
                            onClick={() => likeReview(review._id, "like")}
                            size={20}
                            color="green"
                          />
                        )}
                        <p className="font-semibold text-md text-green-900">
                          {review?.likes?.length}
                        </p>
                      </div>
                      <div
                        className="rounded-full items-center flex gap-2 cp
                         p-2 "
                      >
                        {review?.dislikes?.includes(user?._id) ? (
                          <AiFillDislike
                            onClick={() => likeReview(review._id, "dislike")}
                            size={20}
                            color="green"
                          />
                        ) : (
                          <AiOutlineDislike
                            onClick={() => likeReview(review._id, "dislike")}
                            size={20}
                            color="green"
                          />
                        )}
                        <p className="font-semibold text-md text-green-900">
                          {review.dislikes.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h6 className="font-semibold flex-ic justify-center cap text-lg text-gray-800">
                  No Reviews
                </h6>
              </div>
            )}
            {
              <div className=" py-2 px-2 gap-2 flex-ic bg-white rl">
                <div className="">
                  <select
                    id="star"
                    name="star"
                    value={star}
                    onChange={(e) => setStar(e.target.value)}
                    className=" button-gray !px-0 
         outline-none !w-full sm:!w-full"
                  >
                    <option className="button-gray" value={1} selected>
                      1 Star
                    </option>
                    <option className="button-gray" value={2}>
                      2 Star
                    </option>
                    <option className="button-gray" value={3}>
                      3 Star
                    </option>
                    <option className="button-gray" value={4}>
                      4 Star
                    </option>
                    <option className="button-gray" value={5}>
                      5 Star
                    </option>
                  </select>
                </div>
                <div className=" overflow-hidden sm:w-[12rem] w-[5rem] grow">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="outline-none w-full border-none px-2"
                    placeholder="Write a review"
                    type="text"
                  />
                </div>
                <div className="hover:bg-g-2  rounded-full">
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      uploadReviewImages(acceptedFiles)
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="rl p-4">
                          <input {...getInputProps()} />
                          <BiImageAdd className="cp" size={20} color="green" />
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                <div>
                  <button
                    onClick={reviewProduct}
                    disabled={imageUploading }
                    className="button-green
                     sm:!w-[100%] sm:!px-4  sm:!py-2 !w-[7.5rem]"
                  >
                    {imageUploading ? (
                      <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      loading ? 
                      <div className="w-full flex items-center justify-center">
                        <CgSpinner className="h-6 w-6 animate-spin" />
                      </div>
                      :
                      "Add Review"
                    )}
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="fc gap-6">
          <div className="flex">
            <h6 className="font-semibold cap text-2xl text-gray-900">
              Questions
            </h6>
          </div>
          <div className="bg-g-2 fc gap-2 p-4 rl ">
            <div className="fc gap-4">
              <div>
                <h6 className="font-semibold text-lg text-gray-800">
                  Question and Answers
                </h6>
              </div>
            </div>
            <div
              className="flex 
                 overflow-hidden overflow-y-scroll h-[24.5rem] p-4 bg-white rl flex-col my-4 gap-4"
            >
              {product?.questions?.length > 0 ?product?.questions?.map((q) => (
                <div className="fc border-b border-gray-200 pb-4 gap-4">
                  <div className="w-full">
                    <p className=" break-words font-semibold text-sm text-gray-900">
                      <span className="font-bold text-sm text-gray-900">
                        Q:
                      </span>{" "}
                      {q.question}
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="break-words font-semibold text-sm text-gray-900">
                      <span className="font-bold text-sm text-gray-900">
                        A:
                      </span>{" "}
                      {q.answer}
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2">
                      <h6 className="font-semibold text-md text-gray-800">
                        Asked by : {q.askedUserName}
                      </h6>
                      {q.certifiedBuyer === true && (
                        <div className="flex ">
                          <TiTick size={20} color="green" />
                          <p className="font-semibold text-sm text-gray-400">
                            Certified Buyer
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ">
                      <div
                        className="rounded-full items-center flex gap-2 
                        cp p-2 "
                      >
                        {q?.likes?.includes(user?._id) ? (
                          <AiFillLike
                            onClick={() => likeQuestion(q._id, "like")}
                            size={20}
                            color="green"
                          />
                        ) : (
                          <AiOutlineLike
                            onClick={() => likeQuestion(q._id, "like")}
                            size={20}
                            color="green"
                          />
                        )}
                        <p className="font-semibold text-md text-green-900">
                          {q?.likes?.length}
                        </p>
                      </div>
                      <div
                        className="rounded-full items-center flex gap-2 cp
                         p-2 "
                      >
                        {q?.dislikes?.includes(user?._id) ? (
                          <AiFillDislike
                            onClick={() => likeQuestion(q._id, "dislike")}
                            size={20}
                            color="green"
                          />
                        ) : (
                          <AiOutlineDislike
                            onClick={() => likeQuestion(q._id, "dislike")}
                            size={20}
                            color="green"
                          />
                        )}
                        <p className="font-semibold text-md text-green-900">
                          {q.dislikes.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            :
            <div>
                <h6 className="font-semibold flex-ic justify-center cap text-lg text-gray-800">
                  No Questions yet
                </h6>
              </div>
            }
            </div>
            <div className=" py-2 px-2 gap-2 flex-ic bg-white rl">
              <div className="hover:bg-g-2 p-3 pl-0 sm:pl-3 pr-0 sm:pr-3 rounded-full">
                <SlEmotsmile size={25} color="green" />
              </div>
              <div className="grow ">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="outline-none grow w-full  border-none  px-2"
                  placeholder="Ask a question"
                  type="text"
                />
              </div>
              <div className="">
                <button onClick={askQuestion} className="button-green 
                 sm:!w-[100%] sm:!px-4  sm:!py-2 !w-[8.5rem]">
                  {
                    ress?.isLoading ? 
                    <div className="w-full  flex items-center justify-center">
                        <CgSpinner className="h-6 w-6 animate-spin" />
                      </div>
                      :
                 " Ask Question"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {warningModal && <WarningModal name={"Add Review"} setState={setWarningModal} state={warningModal}/>}
    </div>
  );
};

export default Reviews;
