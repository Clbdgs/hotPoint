import axios from 'axios'
const auth = {
  authorizeUser
}

/**
 * Displays the login with GitHub screen to the user (as a popup or new tab),
 * if everything ok, closes the login screen and retrieves an authentication token for the logged user.
 *
 * If something goes wrong in the process returns false.
 *
 * @return {string|false} : Returns the authentication token or false if something goes wrong
 */

 
async function authorizeUser (fromData) {
  const authUrl = 'http://clbdgs.xyz/v1/login'
  try {
    let resp = await axios.post(authUrl,fromData)
    return resp.data.data[0]
  } catch (e) {
    console.error(e)
    return false
  }
}

export default auth
