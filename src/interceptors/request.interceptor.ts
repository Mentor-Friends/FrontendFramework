export function requestIntercept(){
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      let [resource, config] = args;    
      const response = await originalFetch(resource, config);
    
      // response interceptor here
      return response;
    };
}
