import types from '@/store/types'

const internalAuthMutations = {
  [types.toggleLoginStatus]: function (state, isAuthorized) {
    state.auth.isLogin = isAuthorized
  },
  [types.addUser]: function (state, user) {
    state.auth.user = user
  }
}

const authMutations = {
  ...internalAuthMutations
}

export default authMutations
