import _ from 'lodash'

export default function ({ $axios }, inject) {
  const api = $axios.create({
    baseURL: `${process.env.api_url}`,
  })

  inject('api', api)
}
