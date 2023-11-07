import axios from 'axios';

const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }

export async function getComments(episodeId) {
    const { data } = await axios.get(`/api/comments/${episodeId}`)
    return data
}

export async function postComment(comment) {
    const { data } = await axios.post('/api/comments', comment, authHeader)
    return data
}

export async function updateComment(comment, id) {
    // console.log(`Update comment is ${comment.content}`)
    // console.log(`Comment id is ${id}`)
    const { data } = await axios.put(`/api/comments/${id}`, comment, authHeader)
    return data
}

export async function deleteComment(id) {
    const { data } = await axios.delete(`/api/comments/${id}`, authHeader)
    return data
}

export async function signUp(user) {
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    return data
}

