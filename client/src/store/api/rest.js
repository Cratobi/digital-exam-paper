import Axios from './instance'

// CODE: Fetch

const fetch = async ({ url, params = [], query }) => {
  try {
    const { data } = await Axios({
      method : 'GET',
      url    : `/${url}/${params.join('/')}`,
      params : {
        ...query,
      },
    })

    return data
  } catch (error) {
    throw error
  }
}

// CODE: Verify

const verify = async ({ url, body }) => {
  try {
    const { data } = await Axios({
      method : 'POST',
      url    : `/${url}`,
      data   : {
        ...body,
      },
    })

    return data
  } catch (error) {
    throw error
  }
}

// CODE: Create

const create = async ({ url, body }) => {
  try {
    const { data } = await Axios({
      method : 'POST',
      url    : `/${url}`,
      data   : {
        ...body,
      },
    })

    return data
  } catch (error) {
    throw error
  }
}

// CODE: Modify

const modify = async ({ url, params = [], body }) => {
  try {
    const { data } = await Axios({
      method : 'PATCH',
      url    : `/${url}/${params.join('/')}`,
      data   : {
        ...body,
      },
    })

    return data
  } catch (error) {
    throw error
  }
}

// CODE: Replace

const replace = async ({ url, params = [], body }) => {
  try {
    const { data } = await Axios({
      method : 'PUT',
      url    : `/${url}/${params.join('/')}`,
      data   : {
        ...body,
      },
    })

    return data
  } catch (error) {
    throw error
  }
}

// CODE: Remove

const remove = async ({ url, params = [] }) => {
  try {
    const { data } = await Axios({
      method : 'DELETE',
      url    : `/${url}/${params.join('/')}`,
    })

    return data
  } catch (error) {
    throw error
  }
}
export default { fetch, verify, create, modify, replace, remove }
