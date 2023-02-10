import React from "react";
import { BsLinkedin, BsYoutube, BsInstagram, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" w-12/12  bg-green-900 ">
      <div
        className="w-12/12  fc  px-4
     lg:px-16 md:px-14 sm:px-8  border-b border-gray-100"
      >
        <div className="grid  grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4">
          <div className="fc gap-6 py-4">
            <div>
              <h6 className="font-semibold text-2xl tw">Contact Us</h6>
            </div>
            <div className="flex tw font-semibold text-lg">
              Hno : 277 Near Post Office , <br />
              Wayanad, Kerela <br />
              Pincode : 670645
            </div>
            <div>
              <a href="tel:+91 7306639080" className="tw text-lg block ">
                +91 7306639080
              </a>
            </div>
            <div>
              <a
                href="mailto:shanidshani91@gmail.com"
                className="tw break-words sm:w-full w-[80%] text-lg block "
              >
                shanidshani91@gmail.com
              </a>
            </div>
            <div className="flex-ic gap-4 sm:gap-6 ">
              <a className="tw" href="https://www.linkedin.com/in/muhammed-shanid-084239250/">
                <BsLinkedin size={29} />
              </a>
              <a className="tw" href="/">
                <BsInstagram size={29} />
              </a>
              <a className="tw" href="https://github.com/muhdshanid">
                <BsGithub size={31} />
              </a>
              <a className="tw" href="/">
                <BsYoutube size={35} />
              </a>
            </div>
          </div>
          <div className="fc gap-6 p-4">
            <div>
              <h6 className="font-semibold text-2xl tw">Information </h6>
            </div>
            <div>
              <p className="fn text-lg tw">Privacy Policy</p>
            </div>
            <div>
              <p className="fn text-lg tw">Refund Policy</p>
            </div>
            <div>
              <p className="fn text-lg tw">Shipping Policy</p>
            </div>
            <div>
              <p className="fn text-lg tw">Terms & Conditions</p>
            </div>
            <div>
              <p className="fn text-lg tw">Blogs</p>
            </div>
          </div>
          <div className="fc gap-6 p-4">
            <div>
              <h6 className="font-semibold text-2xl tw">Account </h6>
            </div>
            <div>
              <p className="fn text-lg tw">About Us</p>
            </div>
            <div>
              <p className="fn text-lg tw">FAQ</p>
            </div>
            <div>
              <p className="fn text-lg tw">Contact</p>
            </div>
          </div>
          <div className="fc gap-6 p-4">
            <div>
              <h6 className="font-semibold text-2xl tw">Quick Links </h6>
            </div>
            <div>
              <Link to={"/cat-products/laptops"} className="fn cap text-lg tw">
                Laptops
              </Link>
            </div>
            <div>
              <Link
                to={"/cat-products/headphones"}
                className="fn cap text-lg tw"
              >
                Headphones
              </Link>{" "}
            </div>
            <div>
              <Link to={"/cat-products/mobiles"} className="fn cap text-lg tw">
                Mobiles
              </Link>{" "}
            </div>
            <div>
              <Link to={"/cat-products/watches"} className="fn cap text-lg tw">
                Watches
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
        <div className="w-full  flex items-center justify-center py-4">
        <p className='text-center text-white'>&copy;{new Date().getFullYear()}: Powered Mshani Dev</p>

        </div>
    </div>
  );
};

export default Footer;
