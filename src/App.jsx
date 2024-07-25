import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);


  const passwordGenerator= useCallback(
    () => {
      let pass = "";
      let str = '';
  
      if (uppercase) {str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'}
      if (lowercase) {str += 'abcdefghijklmnopqrstuvwxyz'}
      if (number) { str += '0123456789' }
      if (character) { str += '!@#$%^&*()_+' }
       
      for (let i = 1; i <= length; i++) {
        const chara = Math.floor(Math.random() * str.length);
        pass += str.charAt(chara);
      }
      
      setPassword(pass);
    },
    [length,uppercase,lowercase,number,character,setPassword],
  )


  useEffect(() => {
    passwordGenerator();
  }, [length, character, number,uppercase, lowercase ]);

  
  const copyToClipboard = () => {

    if (passwordRef.current) {
      window.navigator.clipboard.writeText(passwordRef.current.value)
        .then(() => {
          passwordRef.current?.select()
        })
        .catch(err => {
          console.error('Failed to copy:', err);
        });
    } else {
      console.log("Error: passwordRef.current is null");
    }
  };


 
  return (
    <>
      <div className='flex '>

          {/* Start a Section of Password Generator  */}
        <div className='w-full max-w-md mx-auto my-20 bg-white flex flex-col px-16 py-11 border-2 border-slate-400 rounded-xl'>
          <img className='w-24 mx-20' src='https://easystem.co.id/passwordgenerator/key.png' alt="key"/>
          <h1 className='text-2xl text-slate-800 mt-2 mx-6 font-bold italic'>Password Generator</h1>

          {/* Text Input To Dispaly password  */}
          <div className="flex shadow shadow-slate-700 rounded-md overflow-hidden mb-2 mt-3 ">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              ref={passwordRef}
              readOnly
            />
          <button className='text-2xl text-slate-800 hover:text-xl'
           onClick={passwordGenerator}>&#8634;</button>
          </div>

             <button className='mx-28 py-1 rounded-md bg-cyan-600  text-white font-semibold hover:bg-cyan-700 mb-6'
          // onClick={() => navigator.clipboard.writeText(password)}
             onClick={copyToClipboard}> Copy</button>  

            {/* Sart Range Input for Lenght */}
         <h5 className='text-slate-600'>Password Length: {length}</h5>
          <input 
            type='range'
            min={8}
            max={32}
            className='cursor-pointer accent-cyan-600'
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />

          {/* Start Checkboxes for Numbers, Special Characters, Uppercase, Lowercase  */} 
           <div className='flex justify-start mt-2'>
           <label className='text-slate-500 mr-2'>Uppercase</label>
         <input
         type='checkbox'
         defaultChecked={uppercase}
         className='mt-1 accent-cyan-600 cursor-pointer'
         onChange={()=>setUppercase((prev)=>!prev)}
         /> 
          </div>
          <div className='flex justify-start mt-2'>
           <label className='text-slate-500 mr-2'>Numbers</label>
         <input
         type='checkbox'
         defaultChecked={number}
         className='mt-1 accent-cyan-600 cursor-pointer'
         onChange={()=>setNumber((prev)=>!prev)}
         /> 
          </div>
          <div className='flex justify-start mt-2'>
           <label className='text-slate-500 mr-2'>Special Character</label>
         <input
         type='checkbox'
         defaultChecked={character}
         className='mt-1 accent-cyan-600 cursor-pointer'
         onChange={()=>setCharacter((prev)=>!prev)}
         /> 
          </div>
          <div className='flex justify-start mt-2'>
           <label className='text-slate-500 mr-2'>Lowercase</label>
         <input
         type='checkbox'
         defaultChecked={lowercase}
         className='mt-1 accent-cyan-600 cursor-pointer'
         onChange={()=>setLowercase((prev)=>!prev)}
         /> 
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App

