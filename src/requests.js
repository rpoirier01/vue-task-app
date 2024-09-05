// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getTasks = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/allTasks`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const saveNewTask = async (newTaskDesc) =>{
    try {
        const response = await axios.post(`http://localhost:5000/saveTask`, {
            description: newTaskDesc, //defines body for our post request
        });
    }
    catch (error){
        console.error('Error saving new task: ', error)
    }
}

export const deleteDBTask = async(taskDesc)=>{
    try{
        const response = await axios.delete(`http://localhost:5000/deleteTask/${taskDesc}`)
        console.log('Task deleted successfully: ', response.data);
    }
    catch (error){
        console.error('Error deleting task: ', error)
        throw error;
    }
}