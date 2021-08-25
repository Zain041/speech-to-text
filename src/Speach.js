import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useLazyTranslate } from 'react-google-translate'
import { setConfig } from 'react-google-translate'
import keys from './google_key.json'
setConfig({
    clientEmail: keys.client_email ?? '',
    privateKey: keys.private_key ?? '',
    projectId: keys.project_id?? ''
  })

const Speach = () => {
    const lang_const=[
        {
          value:"en",
          title:"English",
    
        },
        {
          value:"zh-TW",
          title:"Chineese",
          
        },
        {
          value:"es",
          title:"Spanish",
          
        }
      ]
    
      const [text,setText]= useState('')
      const [language,setLanguage] = useState('');
      const [translate, { data, loading }] = useLazyTranslate({
        language 
      })
 const [message, setMessage] = useState('');
 const commands = [
   {
     command: 'reset',
     callback: () => resetTranscript()
   },
   {
     command: 'shut up',
     callback: () => setMessage('I wasn\'t talking.')
   },
   {
     command: 'Hello',
     callback: () => setMessage('Hi there!')
   },
 ]
 const {
   transcript,
   interimTranscript,
   finalTranscript,
   resetTranscript,
   listening,
 } = useSpeechRecognition({ commands });
 useEffect(() => {
    if (text) {
      translate(text, language);
    }
  }, [translate, text])

 useEffect(() => {
   if (finalTranscript !== '') {
    translate(transcript, language);
    
   }
 }, [interimTranscript, finalTranscript]);
 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   return null;
 }

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
 }
 const listenContinuously = () => {
   SpeechRecognition.startListening({
     continuous: true,
     language: 'en-GB',
   });
 };
 return (
   <div>
     <div>
       <span>
         listening:
         {' '}
         {listening ? 'on' : 'off'}
       </span>
       <div>
         <button type="button" onClick={()=>{
             
             resetTranscript()}}>Reset</button>
         <button type="button" onClick={listenContinuously}>Listen</button>
         <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
       </div>
       <select value={language} onChange={(e)=>{
             translate(data, e.target.value);
          setLanguage(e.target.value)
         
          
          }}>
          <option value="" disabled selected>Select Language </option>
          {
            lang_const.map((items,index)=>{
              return(
                <option key={index} value={items.value} >{items.title} </option>
              )
            })
          }
        </select>
     </div>
     
     <div>
       <span>{data}</span>
     </div>
   </div>
 );
};

export default Speach;