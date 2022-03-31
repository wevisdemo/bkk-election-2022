// const apiUrl = 'https://bkk-eletion.wisesight.dev' || process.env.api_url

export default function ({ $axios }, inject) {
  const api = $axios.create({
    baseURL: process.env.api_url,
  })

  inject('api', api)
}
