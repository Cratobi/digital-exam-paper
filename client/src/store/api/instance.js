import Axios from 'axios'
// import Cookie from 'js-cookie'

const instance = Axios.create({
  baseURL : `https://jsonplaceholder.typicode.com/`,
  // timeout: 1000,
  // headers: {
  //   'x-auth': Cookie.get('x-auth'),
  // },
})

export default instance
