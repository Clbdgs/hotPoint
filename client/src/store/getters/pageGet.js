import types from '@/store/types'

const pageGetters = {
/**
 * Finds a page's index by a given pageId
 *
 * @param {string} id : Page's id
 * @return {number} : Page's index
 */
  [types.getPageIndexById]: (state) => (id) => {
    return state.project.pages.findIndex(page => page.id === id)
  }
}

export default pageGetters
