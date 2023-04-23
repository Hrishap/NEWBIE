import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { tshirt } from "../assets";
import { sweatshirt } from "../assets";
import { upArrow } from "../assets";
import { downArrow } from "../assets";
import { leftArrow } from "../assets";
import { rightArrow } from "../assets";
import { plus } from "../assets";
import { minus } from "../assets";
import { save } from "../assets";
import { undo } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import closeImage from "../assets/close.png";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  CustomButton,
  AIPicker,
  ColorPicker,
  FilePicker,
  Tab,
} from "../components";
// import { add } from "maath/dist/declarations/src/vector3";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })
  // show tab content depending on the active tab

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return (
          <>
            <ColorPicker />
            <button className="close-btn" onClick={() => setActiveEditorTab("")}><img className="w-6 h-6 shadow-sm" src={closeImage} alt="X"/></button>
          </>
        );
      case "filepicker":
        return (
          <>
          <FilePicker
              file={file}
              setFile={setFile}
              readFile={readFile}
            />
            <button className="close-btn" onClick={() => setActiveEditorTab("")}><img className="w-6 h-6 shadow-sm" src={closeImage} alt="X" /></button>
          </>
        );
      case "aipicker":
        return (
          <>
            <AIPicker
              prompt={prompt}
              setPrompt={setPrompt}
              generatingImg={generatingImg}
              handleSubmit={handleSubmit}
            />
            <button className="close-btn" onClick={() => setActiveEditorTab("")}><img className="w-6 h-6 shadow-sm" src={closeImage} alt="X"/></button>
          </>
        );
      default:
        return null;
    }
  };
  
  const handleSubmit = async( type ) => {
    if(!prompt) return alert("please enter a prompt");
    try{
      setGeneratingImg(true);
      const response =await fetch('http://localhost:8080/api/v1/dalle',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })
      const data = await response.json();
      handleDecals(type,`data:image/png;base64,${data.photo}`)
    } catch (error) {
alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");

    }
  }
  const handleDecals =(type,result) =>{
    const decalType =DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }
  const handleActiveFilterTab = (tabName) => {
    switch (tabName){
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
        case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
          break;
        default:
         state.isFullTexture = true;
         state.isLogoTexture = false;
         break;
         
         
    }
    // after setting the state ,activeFilterTab is updated
    setActiveFilterTab((prevState) => {
   return {
    ...prevState,
    [tabName]: !prevState[tabName]
   }
    })

  }
  const readFile = (type) =>{
    reader(file)
    .then((result) => {
      handleDecals(type,result);
      setActiveEditorTab("");
    })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() =>setActiveEditorTab(tab.name)} 
                    handleClose={() => setActiveEditorTab("")} />
                ))}
                  {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="fixed"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="W-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
                 />
            ))}
            <button className='download-btn' onClick={()=>{state.sleeve=false}}>
              <img
                src={tshirt}
                alt='sleeve_changer'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
            <button className='download-btn' onClick={()=>{state.sleeve=true}}>
              <img
                src={sweatshirt}
                alt='sleeve_changer'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
            <button className='download-btn' onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
          </motion.div>

          
          <motion.div className="edittabs-container"
            {...slideAnimation('up')}
          >
            <button className='download-btn' onClick={()=>{state.yCordinate+=0.001}}>
              <img
                src={upArrow}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
            <button className='download-btn' onClick={()=>{state.yCordinate-=0.001}}>
              <img
                src={downArrow}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
            <button className='download-btn' onClick={()=>{state.xCordinate-=0.001}}>
              <img
                src={leftArrow}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
            <button className='download-btn' onClick={()=>{state.xCordinate+=0.001}}>
              <img
                src={rightArrow}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
            <button className='download-btn' onClick={()=>{state.sizeCordinate+=0.001}}>
              <img
                src={plus}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
            <button className='download-btn' onClick={()=>{state.sizeCordinate-=0.001}}>
              <img
                src={minus}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
            <button className='download-btn' onClick={()=>{
              if(state.noOfSaved===0){
                state.fixed1=true;
                state.logoDecal1=state.logoDecal;
                state.x1Cordinate=state.xCordinate;
                state.y1Cordinate=state.yCordinate;
                state.size1Cordinate=state.sizeCordinate;
                state.noOfSaved++;
              }else if(state.noOfSaved===1){
                state.fixed2=true;
                state.logoDecal2=state.logoDecal;
                state.x2Cordinate=state.xCordinate;
                state.y2Cordinate=state.yCordinate;
                state.size2Cordinate=state.sizeCordinate;
                state.noOfSaved++;
              }else if(state.noOfSaved===2){
                state.fixed3=true;
                state.logoDecal3=state.logoDecal;
                state.x3Cordinate=state.xCordinate;
                state.y3Cordinate=state.yCordinate;
                state.size3Cordinate=state.sizeCordinate;
                state.noOfSaved++;
              }else if(state.noOfSaved===3){
                state.fixed4=true;
                state.logoDecal4=state.logoDecal;
                state.x4Cordinate=state.xCordinate;
                state.y4Cordinate=state.yCordinate;
                state.size4Cordinate=state.sizeCordinate;
                state.noOfSaved++;
              }
            }}>
              <img
                src={save}
                alt='save_it'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>

            <button className='download-btn' onClick={()=>{
              if(state.noOfSaved===1){
                state.fixed1=false;
                state.logoDecal1='./eagle.png';
                state.x1Cordinate=0;
                state.y1Cordinate=0;
                state.size1Cordinate=0;
                state.noOfSaved--;
              }else if(state.noOfSaved===2){
                state.fixed2=false;
                state.logoDecal2='./eagle.png';
                state.x2Cordinate=0;
                state.y2Cordinate=0;
                state.size2Cordinate=0;
                state.noOfSaved--;
              }else if(state.noOfSaved===3){
                state.fixed3=false;
                state.logoDecal3='./eagle.png';
                state.x3Cordinate=0;
                state.y3Cordinate=0;
                state.size3Cordinate=0;
                state.noOfSaved--;
              }else if(state.noOfSaved===4){
                state.fixed4=false;
                state.logoDecal4='./eagle.png';
                state.x4Cordinate=0;
                state.y4Cordinate=0;
                state.size4Cordinate=0;
                state.noOfSaved--;
              }
            }}>
              <img
                src={undo}
                alt='save_it'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>


          </motion.div>
          
          
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
