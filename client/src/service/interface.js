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
    'addFile':getEnvUrl() +  '/file/addFile',
    'getFiles': getEnvUrl() +  '/file/getFiles',
    'getFile': getEnvUrl() +  '/file/getFile',
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
export default {
    INTERFACE
}