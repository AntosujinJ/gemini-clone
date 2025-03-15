import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

  const { onsent, recentprompt, showresult, loading, resultdata, input, setinput } = useContext(Context)





  const handleSend = () => {
    onsent(input);
  };





  return (
    <div className='main'>
      <div className='nav'>
        <p>Anto's Gemini </p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className='container'>

        {!showresult ?
          <>
            <div className='greet'>
              <p><span>Hello ,Anto.</span></p>
              <p>How can i help you today?</p>
            </div>
            <div className='cards'>
              <div className='card'>
                <p>suggest beautiful places to see on an upcoming road trips</p>
                <img src={assets.compass_icon} />
              </div>
              <div className='card'>
                <p>Briefly summarize this concept:urpan planing</p>
                <img src={assets.bulb_icon} />
              </div>
              <div className='card'>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} />
              </div>
              <div className='card'>
                <p>improve the readability of the following code</p>
                <img src={assets.code_icon} />
              </div>
            </div>
          </> :
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} />
              <p>{recentprompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.gemini_icon} />
              {loading ?
                <div className='load'>
                  <hr />
                  <hr />
                  <hr />
                </div> : <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>}

            </div>

          </div>}



        <div className='main-bottom'>
          <div className='search'>
            <input value={input}
              onChange={(e) => setinput(e.target.value)} type="text" placeholder='Enter the prompt' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={handleSend} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <div className='info'>
            Anto's Gemini may display inaccurate info,including about people,so double check it responses,your privacy and Anto's Gemini apps
          </div>
        </div>
      </div>
    </div>
  )
}


export default Main