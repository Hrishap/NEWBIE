import React from 'react'
import CustomButton from './CustomButton';

const AIPicker = ({ prompt, setPrompt,generatingImg,handleSubmit }) => {
  return (
    <div className='aipicker-container text-cyan-50'>
      <textarea
      
      placeholder='Ask AI...'
      rows={5}
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
       className='aipicker-textarea  text-cyan-50'/>
       <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton
          type="fixed"
          title="Asking AI..."
          customStyles="text-xs"
          />
        ):(
          <><CustomButton
          type="fixed"
          title="AI LOGO"
          handleClick={() => handleSubmit('logo')}
          customStyles="text-xs"
          />
          <CustomButton
          type="fixed"
          title="AI FULL"
          handleClick={() => handleSubmit('full')}
          customStyles="text-xs"
          />
          </>

          
        
        )}
       </div>
    </div>
  )
}

export default AIPicker
