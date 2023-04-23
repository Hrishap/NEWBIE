import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { CustomButton } from "../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
const Ecommerce = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro === 2 && (
        <div className="absolute w-1/2 z-50 translate-x-20 ">
          <p className="mt-8 text-4xl text-white font-bold">
            Make your design into reality..{" "}
          </p>
          <p className="mt-4 mb-2  text-xl text-white font-bold ">Like it....so....Purchase it...</p>
          <div className="mx-auto container flex items-center" id="nav">
            <div className="w-full ">
              <div className="mx-auto ">
                <div className="flex flex-wrap justify-between"></div>

                <br />

                <div className="bg-transparent w-full h-full  ">
                  <form method="/" action="#login">
                    <div className="">
                      <div className="mt-1 relative rounded-full   ">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
                        <input
                          className="placeholder-white font-bold
                          bg-transparent     border-white
                           text-xl
                          rounded-full w-full py-3
                          px-4 text-gray-700  leading-tight focus:outline-none focus:bg-white  transition duration-500 ease-in-out"
                          placeholder="ENTER YOUR NAME"
                        />
                      </div>
                    </div>
                     
                    <div className="">
                      <div className="mt-1 relative rounded-md   ">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
                        <input
                          className="placeholder-white font-bold
 bg-transparent     appearance-none   border-white
  text-xl
 rounded-full w-full py-3
 px-4 text-gray-700  leading-tight focus:outline-none focus:bg-white  transition duration-500 ease-in-out"
                          placeholder="PHONE NUMBER"
                        />
                      </div>
                    </div>
                     
                    <div className="">
                      <div className="mt-1 relative rounded-md   ">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
                        <input
                          className="placeholder-white font-bold
 bg-transparent    appearance-none   border-white
  text-xl
 rounded-full w-full py-3
 px-4 text-gray-700  leading-tight focus:outline-none focus:bg-white 
 transition duration-500 ease-in-out"
                          placeholder="EMAIL "
                        />
                      </div>
                    </div>
                     
                    <div className="">
                      <div className="mt-1 relative rounded-md   ">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
                        <input
                          className="placeholder-white font-bold
 bg-transparent pr-10    appearance-none   border-white
  text-xl
 rounded-full w-full py-3
 px-4 text-gray-700  leading-tight focus:outline-none focus:bg-white 
 transition duration-500 ease-in-out"
                          placeholder="ADDRESS"
                        />
                      </div>
                    </div>
                     
                    <div className="">
                      <div className="mt-1 relative rounded-md   ">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
                        <input
                          className="placeholder-white font-bold
 bg-transparent pr-10    appearance-none   border-white
  text-xl
 rounded-full w-full py-3
 px-4 text-gray-700  leading-tight focus:outline-none focus:bg-white 
 transition duration-500 ease-in-out"
                          placeholder="CHEST SIZE-(in inches)"
                        />
                      </div>
                    </div>
                     
                    <div className="">
                      <div className="mt-1 relative rounded-md   ">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
                        <input
                          id="username"
                          className="placeholder-white font-bold
 bg-transparent pr-10    appearance-none   border-white
  text-xl
 rounded-full w-full py-3
 px-4 text-gray-700  leading-tight focus:outline-none focus:bg-white 
 transition duration-500 ease-in-out"
                          placeholder="WAIST SIZE-(in inches)"
                        />
                      </div>
                    </div>
                    <br/>
                     

                    <div className="text-center">
                      <button
                        className=" transition duration-500 bg-green-400  hover:bg-green-700 text-white font-bold py-5
 px-4 rounded-full focus:outline-none focus:  -outline"
                        // type="submit"
                        onClick={() => state.intro = 0}
                      >
                        Comfirm Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Ecommerce;
