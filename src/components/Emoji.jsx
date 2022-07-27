import React, { useState } from 'react';


function Emoji(id) {
    const heart = () => {
    document.querySelector(`#${id.id}`).value += `🧡`
    document.querySelector(`#${id.id}`).focus()
    }
    const clap = () => {
    document.querySelector(`#${id.id}`).value += `👏`
    document.querySelector(`#${id.id}`).focus()
    }
    
    const fire = () => {
    document.querySelector(`#${id.id}`).value += `🔥`
    document.querySelector(`#${id.id}`).focus()
    }
    
    const embrassed = () => {
    document.querySelector(`#${id.id}`).value += `😅`
    document.querySelector(`#${id.id}`).focus()
    }
    
    const smile = () => {
    document.querySelector(`#${id.id}`).value += `😃`
    document.querySelector(`#${id.id}`).focus()
    }
    
    const crying = () => {
    document.querySelector(`#${id.id}`).value += `😭`
    document.querySelector(`#${id.id}`).focus()
    }
    const like = () => {
    document.querySelector(`#${id.id}`).value += `😍`
    document.querySelector(`#${id.id}`).focus()
    }
    const thumbup = () => {
    document.querySelector(`#${id.id}`).value += `👍`
    document.querySelector(`#${id.id}`).focus()
    }
    

    return(
        <div className="flex p-2 justify-around">
        <input type='button' onClick={()=> heart()} value={`\u{1F9E1}`} />
        <input type='button' onClick={()=>clap()} value={`\u{1F44F}`} />
        <input type='button' onClick={()=>fire()} value={`\u{1F525}`} />
        <input type='button' onClick={()=>embrassed()} value={`\u{1F605}`} />
        <input type='button' onClick={()=>smile()} value={`\u{1F603}`} />
        <input type='button' onClick={()=>crying()} value={`\u{1F62D}`} />
        <input type='button' onClick={()=>like()} value={`\u{1F60D}`} /> 
        <input type='button' onClick={()=>thumbup()} value={`\u{1F44D}`} /> 

        </div>
    )
}

export default Emoji;

