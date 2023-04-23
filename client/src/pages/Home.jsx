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
const Home = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {snap.intro===0 && (
        <motion.section className="home" {...slideAnimation("left")}>
      
          <motion.div className="'home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text ">
                IT'Z  <br className="xl:block hidden" />
                ABOUT LOOKS
              </h1>
            </motion.div>
             
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-2"
            >
              <p className="max-w-md text-xl font-normal text-orange-50 ">
              Experience the ultimate in personalization with our brand-new 3D customization tool. Take your creativity to the next level and bring your unique style to life with a one-of-a-kind shirt that reflects your personality
              </p>
              
              <CustomButton
              type="fixed"
              title="Customize It"
              handleClick={()=> {state.intro=1;}}
              customStyles=" text-orange-50 w-fit px-4 py-2.5  font-bold text-sm "
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
