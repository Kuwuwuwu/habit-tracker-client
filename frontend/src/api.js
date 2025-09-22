import axios from 'axios';

const API_URL = 'http://localhost:5000/api/habits';

export const getHabits = () => axios.get(API_URL);

export const addHabit = (habit) => axios.post(API_URL, habit);

export const toggleHabit = (id) => axios.put(`${API_URL}/${id}`);

export const deleteHabit = (id) => axios.delete(`${API_URL}/${id}`);