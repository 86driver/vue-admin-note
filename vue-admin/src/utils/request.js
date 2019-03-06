import axios from 'axios'

axios.defaults.baseURL = '//note-server.hunger-valley.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    // 配置参数对象
    let option = {
      url,
      method: type,
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    // 对get和post请求传递的数据进行区分
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    axios(option).then(res => {
      // 如果不添加promise再次分装， 这里将无法再次做判断 ，  比如 res.status有等于400的时候也是正常的情况
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}
