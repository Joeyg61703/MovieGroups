import axios from "axios";

const API_URL = "http://localhost:5000/api/groups/";

//Add movie to array within user document
const createGroup = async (groupData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, groupData, config);

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

//leave group
const leaveGroup = async (groupId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + groupId, config);

    return response.data;
}





const groupService = {
    createGroup,
    getMyGroups,
    leaveGroup,
}

export default groupService;