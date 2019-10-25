const json2Form = json => {
  var str = []
  for (var p in json) {
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
  }
  return str.join('&')
}

export const AccountLoginService = (vm, data) => {
  return vm.$axios({
    method: 'post',
    url: 'accesstoken',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: json2Form(data)
  })
}
