import React from 'react'

const Popup = ({title, text, buttonFunction}) => {

    function hideMenu(){
        const popup = document.getElementById("popup");
        popup.classList.add("hidden");
    }

  return (
    <div id="popup" className="hidden popup-background">
        <div className="popup-window">
            <div className="popup-title-bar">
                <h1 className="ml-3">{title}</h1>
            </div>
            <div className="popup-message">
                <p className="ml-3">{text}</p>
            </div>
            <div className="popup-button-bar">
                <button className="btn" onClick={buttonFunction}>leave group</button>
                <button className="btn" onClick={hideMenu}>cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Popup