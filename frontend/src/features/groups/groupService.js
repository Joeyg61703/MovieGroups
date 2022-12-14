import axios from "axios";

const API_URL = "/api/groups/";

//create group with current user as owner
const createGroup = async (groupData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, groupData, config);

    return response.data;
}

//join group as member
const joinGroup = async (groupData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "join/", groupData, config);

    return response.data;
}

//get user groups
const getMyGroups = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

//get all groups
const getAllGroups = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "all", config);

    return response.data;
}


//leave group
const leaveGroup = async (groupName, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + groupName, config);

    return response.data;
}

const makeOwner = async ({groupName, userName}, token) => {

    

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    console.log(config)
    
    const response = await axios.put(`${API_URL}${groupName}/${userName}`, config);
    return response.data;

}

const kickUser = async ({groupName, userName}, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + groupName + "/" + userName, config);
    return response.data;

}


const getGroupData = async (groupName, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + groupName, config);

    return response.data;
}


const getGroupMovies = async (groupName, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + groupName + "/movies", config);

    return response.data;
}




const groupService = {
    createGroup,
    getMyGroups,
    leaveGroup,
    getGroupData,
    getAllGroups,
    joinGroup,
    kickUser,
    makeOwner,
    getGroupMovies
}

export default groupService;