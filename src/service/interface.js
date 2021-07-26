const PRODUCTURL = 'http://clbdgs.xyz/v1'
const DEVURL = 'http://localhost:3000/v1'

const getEnvUrl = function () {
    let url = PRODUCTURL;
    let hostname = window.location.hostname
    switch(hostname){
        case 'localhost':
            url = DEVURL
            break;
    }
    return url
}

const  INTERFACE = {
    'catalogueList':getEnvUrl() +  '/catalogue/add',
    'getCatalogueList':getEnvUrl() +  '/catalogue/get',
    'deleteCatalogue':getEnvUrl() +  '/catalogue/delete',
    'uploadFile':getEnvUrl() +  '/file/uploadFile',
    'getFiles': getEnvUrl() +  '/file/getFiles',
    'updateFile':getEnvUrl() +  '/file/updateFile',
    'uploadImg':getEnvUrl() +  '/file/addImg',
    'deleteFile': getEnvUrl() +  '/file/deleteFile',
    'getMaterial': getEnvUrl() +  '/file/getMaterial',
    'addSubject': getEnvUrl() +  '/subject/addSubject',
    'getSubject': getEnvUrl() +  '/subject/getSubject',
    'deleteSubject': getEnvUrl() +  '/subject/deleteSubject',
    'createAnimation': getEnvUrl() +  '/animation/createAnimation',
    'getAnimations': getEnvUrl() +  '/animation/getAnimations',
    'login': getEnvUrl() +  '/login'
}
// const  INTERFACE = {
//     'uploadFile': '/file/uploadFile',
//     'getFiles':  '/file/getFiles',
//     'updateFile': '/file/updateFile',
//     'deleteFile':  '/file/deleteFile',
//     'getMaterial':  '/file/getMaterial',
//     'addSubject':  '/subject/addSubject',
//     'getSubject':  '/subject/getSubject',
//     'deleteSubject':  '/subject/deleteSubject',
//     'createAnimation':  '/animation/createAnimation',
//     'getAnimations':  '/animation/getAnimations',
//     'login':  '/login'
// }
export default {
    INTERFACE
}