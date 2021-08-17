import types from '@/store/types'

const internalMenuMutations = {
  [types.toggleSideOpen]: function (state, open) {
    state.isSideOpen = open
  }
}

const menuMutations = {
  ...internalMenuMutations
}

export default menuMutations
