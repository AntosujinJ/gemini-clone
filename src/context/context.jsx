import { createContext, useRef, useState, useEffect } from "react";
import run from "../config/gemini";
import { debounce } from 'lodash';


export const Context = createContext()

const ContextProvider = (props) => {

  const [input, setinput] = useState("")
  const [recentprompt, setrecentprompt] = useState("")
  const [prevprompt, setprevprompt] = useState([])
  const [showresult, setshowresult] = useState(false)
  const [loading, setloading] = useState(false)
  const [resultdata, setresultdata] = useState("")
  const isMounted = useRef(true)

  // const onsent=async(prompt)=>{
  //     setresultdata("")
  //     setloading(true)
  //     setshowresult(true)
  //    const response= await run(prompt)
  //      setresultdata(response)
  //      setloading(false)
  //      setinput("")
  // }

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const delaypara = (index, next) => {
    setTimeout(function () {
      setresultdata(prev => prev + next)
    }, 75 * index)
  }
  const newchat = () => {
    setloading(false)
    setshowresult(false)
  }
  const debouncedOnsent = debounce(async (prompt) => {

    let finalPrompt = prompt !== undefined ? prompt : input;

    setresultdata("");
    setloading(true);
    setshowresult(true);
    //  setrecentprompt(prompt);
    //  setprevprompt(prevprompt=>[...prevprompt,finalPrompt])
    try {
      const response = await run(finalPrompt);
      setrecentprompt(prompt);
      if (!prevprompt.includes(finalPrompt)) {
        setprevprompt(prev => [...prev.slice(-10), finalPrompt])
      }
      //  setprevprompt(prevprompt=>[...prevprompt,finalPrompt])

      let responsearr = response.split("**")
      let newresponse = "";
      for (let i = 0; i < responsearr.length; i++) {
        if (i == 0 || i % 2 !== 1) {
          newresponse += responsearr[i]
        } else {
          newresponse += "<b>" + responsearr[i] + "</b>"
        }
      }
      let newresponse2 = newresponse.split("*").join("</br>")


      if (isMounted.current) {
        // setresultdata(newresponse2);
        let newresponsearr = newresponse2.split(" ");
        for (let i = 0; i < newresponsearr.length; i++) {
          const word = newresponsearr[i];
          delaypara(i, word + " ")
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      if (isMounted.current) {
        //handle error
      }
    } finally {
      if (isMounted.current) {
        setloading(false);
        setinput("");
      }
    }
  }, 500);




  const ContextValue = {
    prevprompt,
    setprevprompt,

    setrecentprompt,
    recentprompt,
    showresult,
    loading,
    resultdata,
    input,
    setinput,
    onsent: debouncedOnsent,
    newchat,


  }
  return (
    <Context.Provider value={ContextValue}>
      {props.children}

    </Context.Provider>
  )
}

export default ContextProvider