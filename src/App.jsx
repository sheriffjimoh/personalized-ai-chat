import { useState, useEffect} from 'react'
import './App.css'

import  * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';
import SendSvg from  './assets/send.svg';




function App() {



  const [getResult, setResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [model, setModel] = useState(null)


  console.time('loadModel');


  

// End measuring the time
 // 4. Load Tensorflow Model
 const loadModel = async () => {
  console.log("Loading model.")
  const loadedModel = await qna.load();
  setModel(loadedModel);
  console.log("Model loaded.");
};




console.timeEnd('loadModel');


  // async function getAnswer() {
       
  //       setLoading(true)
  //       const passage = "Sheriff is a passionate full stack developer with extensive knowledge of software developement and build and adding value value to product. he has worked in several startup till date."
  //       const question = "What does Sheriff  have extensive knowledge of?"
  //       const model = await qna.load();
  //       const answers = await model.findAnswers(question, passage);
        
  //       if(answers){

  //         console.log("answers:", answers)
  //         setResult(answers);
  //         setLoading(false)
  //       }
       
  // }


 async  function  handleSubmit(event){
    event.preventDefault();

    if(!model)  return alert("Model is still loading");

    if(question.length > 0 ){
        const passage = "Sheriff is a passionate full stack developer with extensive knowledge of software developement and build and adding value value to product. he has worked in several startup till date.";
        setLoading(true)
        setIsLoadingAnswer(true)
        const answers = await model.findAnswers(question, passage);

        if(answers){

          console.log("answers:", answers)
          setResult(answers);
          setLoading(false)
        }
        
        // console.log("question:", question)
    }

    // console.log("event:", event)

  }

  useEffect(() => {
    loadModel()
 },[])
  

  return (
       <div className='w-full  flex items-center  justify-center   content-center h-screen'>
            
            
            {
              model  === null ? (
                <div className='flex items-center justify-center'>
                   <span className='text-2xl'>Loading model.....</span>
                </div>
              ):

              (
                    

                <div className='shadow-form w-full mx-auto max-w-2xl flex  flex-col justify-between   py-4 h-full'>
                {/* result */}

               
                   <div className='flex flex-col px-5  space-y-5 relative'>
                    {/* questions */}
                         <div className='rounded-tr-[20px] p-4 w-auto  flex flex-col  space-y-1 text-left bg-gray-300'>
                                <span className='text-xs  font-thin  italic'>Question:</span>
                                <span className='font-bold  font-mono  break-words'>{question}</span>
                         </div>

                     {/* answer */}
                     {
                      isLoadingAnswer ? 
                      (
                        <div  className='rounded-tr-[20px] p-4 bg-gray-100 text-right  mt-10 flex flex-col '>
                          <span className='text-xs  font-thin  italic'>Answer:</span>
                            {
                               isLoading ? ( <span>...</span>) 
                               : 

                                
                                  getResult?.length > 0 && getResult?.map((answer, index) =>
                                   (
                                     <div key={index}>
                                        <span>{ index + 1}: {answer.text}</span>
                                      </div>
                                  ))
                                
                                
                               
                            } 
                        </div>
                      )
                      :
                      null
                     }
                        
                   </div>

                  <form onSubmit={handleSubmit} className='flex shadow-md  w-full    pb-8'>
                          <div className="p-3   w-full">
                              <input type="text"  name='questions' value={question} onChange={((val) => setQuestion(val.target.value))}  className="rounded-full p-5 border  w-full focus:border-gray-400"  />
                          </div>

                          <div className='flex items-center relative justify-center pr-4'>
                              <button  type='submit'  disabled={isLoading}>  
                              {
                                isLoading ?
                                (  <span className='text-4xl  font-bold '>...</span>)
                                :
                                ( <img src={SendSvg}  className="w-10 h-10" /> )
                              }
                              
                               
                              </button>

                            
                          </div>
                  </form>
             </div> 
              )
            }
            
                 
       </div>
  )
}

export default App
