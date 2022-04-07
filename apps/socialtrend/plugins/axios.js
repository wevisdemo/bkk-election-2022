const apiUrl = 'https://bkk-election.wisesight.dev' || process.env.api_url

export default function ({ $axios }, inject) {
  const api = $axios.create({
    baseURL: apiUrl,
  })

  inject('api', api)
}
