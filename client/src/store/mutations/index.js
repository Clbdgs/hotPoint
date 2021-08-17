import authMutations from './authMut'
import menuMutations from './menuMut'
/**
 * Vuex Store Mutations
 *
 * @constant
 * @type {object}
 * @see {@link https://vuex.vuejs.org/en/mutations.html|Vuex Mutations}
 */
const mutations = {
  ...authMutations,
  ...menuMutations
}

export default mutations
