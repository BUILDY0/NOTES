// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

var arr1 = []
for (let i = 0; i < 40; i++) {
    var person = {
        id: Random.id(),
        name: Random.name(),
        age: Random.integer(20, 50),
        email: Random.email("qq.com"),
        birth: Random.datetime("yyyy-MM-dd HH:mm:ss")
    }
    arr1.push(person)
}
Mock.mock('http://www.mocktest.com', 'get', arr1)
