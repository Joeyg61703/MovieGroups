import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getGroupData } from '../../features/groups/groupSlice';
import { useSelector } from 'react-redux';
const GroupUsers = () => {

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const url = window.location.href.split("/");
    const movieName = url[url.length - 1];
    const data = await dispatch(getGroupData(movieName));
    const {group, userArray} = data.payload;
    setUsers(userArray);
    console.log(movieName, group, userArray);
  }

  useEffect(()=>{
    
    const awaitData = async () => {
      await getData();
    }
    awaitData();
  }, []);

  return (
    <div>
      <div className="">
          {users.map((user) => {
            const {
              name,
              id
            } = user;

            return (
              <div
                className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two animate__animated animate__fadeInUp border border-dark" data-wow-delay=".4s" data-wow-duration="1.8s"
                key={id}
              >
                <h1>{name}</h1>
                {user.id === id ? "You" : ""}
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default GroupUsers