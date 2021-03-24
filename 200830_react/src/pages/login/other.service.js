import apiAxios from '../../plugins/axios';
import { handlePromise } from '../../utils/utils';

class OtherService {
  //存储请求数组
  userInfo = {}
  token = ''
    // 登陆
    loginIn = async ({ username, password, code, mark }) => {
        const params = {
            username: username,
            password: password,
            code: code,
            mark,
            source: '2'
        };

        let res = await apiAxios.post("/login/login", params, 'String');

        if (!res) {
            return;
        }
        return handlePromise(res)
    }
    //  获取权限菜单树形结构
  getMenuTreeByUser = async () => {
    let res = await apiAxios.post("/login/getMenuTreeByUser", {}, 'String');
    if (!res) {
      return;
    }
    return handlePromise(res)
  }
}
const otherService = new OtherService();
export default otherService
