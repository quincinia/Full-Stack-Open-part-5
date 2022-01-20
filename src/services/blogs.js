import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token }
    }
    
    const res = await axios.post(baseUrl, newBlog, config)
    console.log(res)
    return res.data
}

const update = async (blog, id) => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.put(baseUrl + `/${id}`, blog, config)
    return res.data
}

export default { setToken, getAll, create, update }