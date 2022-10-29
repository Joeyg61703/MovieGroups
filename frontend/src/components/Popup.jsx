import React from 'react'
import { useSelector } from 'react-redux';
const Popup = ({type, secondButtonFunction, groupUsers, groupData}) => {

    const {user} = useSelector(
        (state) => state.auth
      )


    let title = "";
    let desc = "";
    let secondButton = "";
    if(type == "group"){

        secondButton = "Leave Group";

        if(groupUsers.length > 1){
            if(user._id == groupData.owner){
                title = "Cannot Leave as Owner";
                desc = "You must make someone else the owner before leaving the group";
                secondButton = "";
            }else{
                title = "Are you Sure?";
                desc = "";
            }
        }else{
            title = "Are You Sure?";
            desc = "Leaving this group will delete it. You cannot undo this action.";
        }
    }

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
                <p className="ml-3">{desc}</p>
            </div>
            <div className="popup-button-bar">
                {secondButton && <button className="btn" onClick={secondButtonFunction}>{secondButton}</button>}
                <button className="btn" onClick={hideMenu}>cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Popup