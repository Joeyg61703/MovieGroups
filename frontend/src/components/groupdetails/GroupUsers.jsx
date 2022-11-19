import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { makeOwner, kickUser } from '../../features/groups/groupSlice';
import {BiDownArrow} from "react-icons/bi";

const GroupUsers = ({users, groupData}) => {

  const {user} = useSelector(
    (state) => state.auth
  )
  const isOwner = user._id == groupData.owner;
  const dispatch = useDispatch();
  
  const url = window.location.href.split("/");
  const groupName = url[url.length - 1];
  
  const makeOwnerCall = async (userName) => {
    await dispatch(makeOwner({groupName, userName}));
    location.reload();
  }

  const kickUserCall = async (userName) => {
    await dispatch(kickUser({groupName, userName}));
    location.reload();
  }

   return (
    <div>
      <div className="d-flex flex-row flex-wrap">
          {users?.map((currentUser) => {
            const {
              name,
              _id: id
            } = currentUser;
            

            return (
              <div
                className="col-xl-4 p-3 col-lg-6 col-sm-12 d-flex flex-column justify-content-between align-items-center grid-item grid-sizer cat-two animate__animated animate__fadeInUp border border-dark" data-wow-delay=".4s" data-wow-duration="1.8s"
                key={id}
              >
                <h3>{name}</h3>
                <div className="current">
                  {user._id == id ? "You" : <a href={`../../user/${name}`} className="btn mr-2">Profile</a>}
                  {isOwner && id != user._id && <BiDownArrow size={18} color="#c31313" onClick={()=> {
                      const ownerButtons = document.getElementById(`${name}-owner-buttons`);
                      if(ownerButtons.classList.contains("d-flex")){
                        ownerButtons.classList.remove("d-flex")
                        ownerButtons.classList.add("hidden");
                      }else{
                        ownerButtons.classList.remove("hidden")
                        ownerButtons.classList.add("d-flex");
                      }
                    }
                  }/>}
                </div>
                <div id={`${name}-owner-buttons`} className="hidden owner-buttons  flex-column flex-lg-row w-75 align-items-center justify-content-between mt-2">
                  {isOwner && id != user._id && <button className="mw-100 btn hover-click" onClick={()=>{makeOwnerCall(name)}}>Make Owner</button>}
                  {isOwner && id != user._id && <button className="mw-100 btn hover-click" onClick={()=>{kickUserCall(name)}}>Kick User</button>}
                </div>
              </div>
              
            );
          })}
        </div>
    </div>
  )
}

export default GroupUsers