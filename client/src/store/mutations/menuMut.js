import types from '@/store/types'

const internalMenuMutations = {
  [types.toggleSideOpen]: function (state, open) {
    state.isSideOpen = open
  },
  [types.changeSubIndex]: function (state, subIndex) {
    state.subIndex = subIndex
  }

}

const menuMutations = {
  ...internalMenuMutations
}

export default menuMutations
