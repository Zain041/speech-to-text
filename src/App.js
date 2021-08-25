import React, {useState,useEffect} from 'react';
  import Speech from 'react-speech';
  import useSpeechToText from 'react-hook-speech-to-text';
  import { setConfig } from 'react-google-translate'
  import keys from './google_key.json'
  import { useLazyTranslate } from 'react-google-translate'
  import Speach from './Speach'

 
setConfig({
  clientEmail: keys.client_email ?? '',
  privateKey: keys.private_key ?? '',
  projectId: keys.project_id?? ''
})
  

function App() {
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
 
  useEffect(() => {
    if (text) {
      translate(text, language);
    }
  }, [translate, text])

  

 
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
 console.log(language)
  return (
    <div className="App">

      <div style={{margin:'auto',width:'600px', height:'600px',backgroundColor:'aqua'}}>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)}  placeholder="your text here"/>
        <div>{loading ? 'Loading...' : data}</div>
        <select value={language} onChange={(e)=>{
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
       
      
        <Speech
        onClick={(e)=>{
          setText('')
        }}
  text={data}
  pitch="1"
  rate="1"
  volume="1"
  lang={language}
  textAsButton={true}
  displayText="play"
  voice="Google UK English Female" />

<div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
    <Speach/>
       
        
    
        {/* <Speech 
  styles={textstyle} 
  textAsButton={true}    
  displayText="play" 
  text="I have text displayed as a button" /> */}
    </div>
    
    </div>
  );
}

export default App;
