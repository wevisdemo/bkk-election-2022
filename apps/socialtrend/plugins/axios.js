import _ from "lodash"

export default function ({ $logger, $axios, $cookies, store }, inject) {
  const ohoApi = $axios.create({
    baseURL: `${process.env.oho_api_url}/latest`,
    withCredentials: true,
  })
  const ohoMemberApi = $axios.create({
    baseURL: `${process.env.oho_api_url}/latest`,
    withCredentials: true,
  })

  const validateRequest = (error, oho_key) => {
    if (!process.client) return

    // let message = _.get(error, "message", "").split("code ")[0]
    const response = _.get(error, "response")
    const code = _.get(response, "data.code") || 0
    const message = _.get(response, "data.message") || ""

    // if (code === 401 || message[1] === "401") {
    //   message = `[${oho_key}] error 401, ${message}`
    // }

    const metadata = {
      location: process.client ? window.location.href : undefined,
      payload: JSON.parse(_.get(response, "config.data", "{}")),
      params: _.get(response, "config.params", ""),
    }

    metadata.location = window.location.href

    $logger.send({
      level: "error",
      message: message,
      metadata: metadata,
      status: _.get(response, "status", ""),
      method: _.chain(response).get("config.method", "").upperCase().value(),
      url: _.get(response, "request.responseURL", ""),
    })

    const path_name = window.location.pathname.split("/")[1]

    if (code === 401 && !store.public_pages.includes(path_name)) {
      return (window.location = "/login?action=token_expired")
    }
  }

  ohoApi.onResponseError((error) => validateRequest(error, "oho_user"))

  ohoApi.onRequest((config) => {
    config.headers.common["Authorization"] = ""
    const access_token = $cookies.get("oho_user_token")
    if (!access_token) return
    config.headers.common["Authorization"] = access_token
  })

  ohoMemberApi.onResponseError((error) => validateRequest(error, "oho_member"))

  ohoMemberApi.onRequest((config) => {
    const access_token = _.get(store, `state.oho_member.accessToken`)
    if (!access_token) return
    config.headers.common["Authorization"] = access_token
  })

  inject("ohoApi", ohoApi)
  inject("ohoMemberApi", ohoMemberApi)
}
