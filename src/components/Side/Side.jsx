import React, { useContext, useState } from 'react'
import "./Side.css"
import { assets } from "../../assets/assets"
import { Context } from '../../context/context'

const Side = () => {

    const [extend, setextend] = useState(false)
    const { onsent, prevprompt, setrecentprompt, newchat } = useContext(Context)

    const loadprompt = async (prompt) => {
        setrecentprompt(prompt)
        await onsent(prompt)
    }

    return (
        <div className='sidebar'>
            <div className='top'>
                <img onClick={() => setextend(val => !val)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={() => newchat()} className='new-chat'>
                    <img src={assets.plus_icon} alt="" />
                    {extend ? <p>new chat</p> : null}
                </div>
                {extend ?
                    <div className='recent'>
                        <p className='recent-title'>recent</p>
                        {prevprompt.map((item, index) => {
                            return (
                                <div onClick={() => loadprompt(item)} className='recent-entry' key={index}>
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0)}...</p>
                                </div>
                            )
                        })}
                        {/* <div className='recent-entry'>
                            <img src={assets.message_icon} alt="" />
                            <p>what is react...</p>
                        </div> */}
                    </div> : null}

            </div>

            <div className='bottom'>
                <div className='bottom-item recent-entry'>
                    <img src={assets.question_icon} alt="" />
                    {extend ? <p>help</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.history_icon} alt="" />
                    {extend ? <p>activity</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.setting_icon} alt="" />
                    {extend ? <p>setting</p> : null}
                </div>

            </div>
        </div>
    )
}

export default Side