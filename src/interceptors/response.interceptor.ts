import * as API from "../api_functions";

const isRefreshing: boolean = false;
let newAccessToken: any;

export function responseIntercept() {
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, config] = args;

    let response = await originalFetch(resource, config);

    // // response interceptor
    // const json = () =>
    //   response
    //     .clone()
    //     .json()
    //     .then((data) => ({ ...data, title: `Intercepted: ${data.title}` }));

    // response.json = json;

    if (!response.ok && response.status === 401) {
      return handle401Error(resource, config, originalFetch, response);
    }

    return response;
  };
}

async function handle401Error(
  resource: any,
  config: any,
  originalFetch: any,
  response: any
) {
  let res = await API.refreshToken();
  if (!res?.success) {
    
  }
  if (res?.data?.accessToken) {
    // After token is refreshed, lets save new access token and refresh token to storage...

    chrome.runtime.sendMessage({
      action: "update_tokens",
      update_data: res?.data,
    });

    let newConfig = {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${res?.data?.accessToken}`,
      },
    };
    response = await originalFetch(resource, newConfig);
    return response;
  }

  // return response;
}
