/**
 * @see (e.g. https://www.npmjs.com/package/axios)
 */
export default {
  /**
   * @description `url` is the server URL that will be used for the request
   */
  // url: undefined,

  /**
   * @description `method` is the request method to be used when making the request
   */
  // method: 'get', // default

  /**
   * @description `baseURL` will be prepended to `url` unless `url` is absolute.
   * @instance It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
   * to methods of that instance.
   */
  baseURL: 'https://some-domain.com/api/',

  /**
   * @description `transformRequest` allows changes to the request data before it is sent to the server
   * @method 只能用在 This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
   * @returns The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
   * FormData or Stream
   * @extends You may modify the headers object.
   */
  // transformRequest: [function (data) {
  //   // Do whatever you want to transform the data

  //   return data
  // }],

  /**
   * @description `transformResponse` allows changes to the response data to be made before
   * @function it is passed to then/catch
   */
  // transformResponse: [function (data) {
  //   // Do whatever you want to transform the data

  //   return data
  // }],

  /**
   * @description `headers` are custom headers to be sent
   */
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },

  /**
   * @description `params` are the URL parameters to be sent with the request
   * @argument Must be a plain object or a URLSearchParams object
   */
  // params: undefined,

  /**
   * @description `paramsSerializer` is an optional function in charge of serializing `params`
   * @see (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
   */
  // paramsSerializer: function(params) {
  //   return Qs.stringify(params, {arrayFormat: 'brackets'})
  // },

  /**
   * @description `data` is the data to be sent as the request body
   * @method Only applicable for request methods 'PUT', 'POST', and 'PATCH'
   * @classdesc When no `transformRequest` is set, must be of one of the following types:
   * - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
   * - Browser only: FormData, File, Blob
   * - Node only: Stream, Buffer
   */
  // data: undefined,

  /**
   * @description `timeout` specifies the number of milliseconds before the request times out.
   * @throws If the request takes longer than `timeout`, the request will be aborted.
   */
  timeout: 1000, // default is `0` (no timeout)

  /**
   * @description `withCredentials` indicates whether or not cross-site Access-Control requests
   * @augments should be made using credentials
   */
  // withCredentials: false, // default

  /**
   * @description `adapter` allows custom handling of requests which makes testing easier.
   * @returns Return a promise and supply a valid response (see lib/adapters/README.md).
   */
  // adapter: function (config) {
  //   /* ... */
  // },

  /**
   * @description `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
   * @extends This will set an `Authorization` header, overwriting any existing
   * @override `Authorization` custom headers you have set using `headers`.
   */
  // auth: {
  //   username: 'username',
  //   password: 'password'
  // },

  /**
   * @description `responseType` indicates the type of data that the server will respond with
   * options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
   */
  responseType: 'json', // default

  /**
   * @description `responseEncoding` indicates encoding to use for decoding responses
   * Note: Ignored for `responseType` of 'stream' or client-side requests
   */
  responseEncoding: 'utf8' // default

  /**
   * @description `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
   */
  // xsrfCookieName: 'XSRF-TOKEN', // default

  /**
   * @description `xsrfHeaderName` is the name of the http header that carries the xsrf token value
   */
  // xsrfHeaderName: 'X-XSRF-TOKEN', // default

  /**
   * @description `onUploadProgress` allows handling of progress events for uploads
   */
  // onUploadProgress: function (progressEvent) {
  //   // Do whatever you want with the native progress event
  // },

  /**
   * @description `onDownloadProgress` allows handling of progress events for downloads
   */
  // onDownloadProgress: function (progressEvent) {
  //   // Do whatever you want with the native progress event
  // },

  /**
   * @description `maxContentLength` defines the max size of the http response content in bytes allowed
   */
  // maxContentLength: 2000,

  /**
   * @description `validateStatus` defines whether to resolve or reject the promise for a given
   * HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
   * or `undefined`), the promise will be resolved; otherwise, the promise will be
   * rejected.
   */
  // validateStatus: function (status) {
  //   return status >= 200 && status < 300 // default
  // },

  /**
   * @description `maxRedirects` defines the maximum number of redirects to follow in node.js.
   * If set to 0, no redirects will be followed.
   */
  // maxRedirects: 5, // default

  /**
   * @description `socketPath` defines a UNIX Socket to be used in node.js.
   * e.g. '/var/run/docker.sock' to send requests to the docker daemon.
   * @augments Only either `socketPath` or `proxy` can be specified.
   * If both are specified, `socketPath` is used.
   */
  // socketPath: null, // default

  /**
   * @description `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
   * and https requests, respectively, in node.js. This allows options to be added like
   * @default `keepAlive` that are not enabled by default.
   */
  // httpAgent: new http.Agent({ keepAlive: true }),
  // httpsAgent: new https.Agent({ keepAlive: true }),

  /**
   * @description 'proxy' defines the hostname and port of the proxy server.
   * You can also define your proxy using the conventional `http_proxy` and
   * `https_proxy` environment variables. If you are using environment variables
   * for your proxy configuration, you can also define a `no_proxy` environment
   * variable as a comma-separated list of domains that should not be proxied.
   * Use `false` to disable proxies, ignoring environment variables.
   * `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
   * supplies credentials.
   * @extends This will set an `Proxy-Authorization` header, overwriting any existing
   * `Proxy-Authorization` custom headers you have set using `headers`.
   */
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 9000,
  //   auth: {
  //     username: 'username',
  //     password: 'password'
  //   }
  // },

  /**
   * @description `cancelToken` specifies a cancel token that can be used to cancel the request
   * @see (see Cancellation section below for details)
   */
  // cancelToken: new CancelToken(cancel => {
  // })
}
