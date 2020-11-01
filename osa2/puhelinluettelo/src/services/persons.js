import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = personObject => {
    return axios
    .post(baseUrl, personObject)
}

const remove = filteredPerson => {
    return axios
    .delete(baseUrl + `/${filteredPerson.id}`)
}

const replace = (personToBeRemoved, personObject) => {
    return axios
    .put(baseUrl + `/${personToBeRemoved.id}`, personObject)
}

export default { getAll, create, remove, replace }