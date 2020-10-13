import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPersons = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const createPerson = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const updatePerson = (newObject) => {
    const req = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return req.then(res => res.data)
}

const deletePerson = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

export default { getAllPersons, createPerson, updatePerson, deletePerson }