import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyGroups } from "../../features/groups/groupSlice";
import { useSelector, useDispatch } from "react-redux";
const UserGroups = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [myGroups, setMyGroups] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const awaitGroups = async () => {
      const groups = await dispatch(getMyGroups());

      console.log("Groups:", groups.payload);
      console.log(user._id);
      setMyGroups(groups.payload);
    };
    awaitGroups();
  }, []);
  return (
    <div className="container">
      <div className="col justify-content-center">
        <h1 className="text-center">My Groups</h1>
        <div>
          {myGroups.map((elem) => {
            const {name, _id: id } = elem;
            return (
              <div key={id} className="row justify-content-between align-items-center p-3 border border-dark">
                <h3>{name}</h3>
                <Link
                  className="p-4 bg-movie-red text-white rounded"
                  to={`/groups/${name}`}
                >
                  View Group
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserGroups;
