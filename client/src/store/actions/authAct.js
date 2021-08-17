
import types from '@/store/types'
import auth from '@/auth'

const authActions = {
/**
 * [description]
 * @return {[type]} [description]
 */
  [types.logIn]: async function ({ commit },payload) {
    let user = await auth.authorizeUser(payload)
    if(user){
      window.localStorage.setItem('user',user.name)
      commit(types.addUser, user)
      commit(types.toggleLoginStatus, true)
    }else{
      commit(types.setIslogin, false)
    }
  },

/**
 * [description]
 * @return {[type]} [description]
 */
  [types.logOut]: async function () {
    window.localStorage.clear()
  }
}

export default authActions
