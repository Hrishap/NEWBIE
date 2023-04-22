import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
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
            <button className='download-btn' onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt='download_image'
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