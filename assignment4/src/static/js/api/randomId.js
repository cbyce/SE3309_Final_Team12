const idChars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function getRandID() {
    let id = '';
    let idLen = 8; // Length of id

    // Creates id out of given chars of length idLen
    for(var i = 0; i < idLen; i++) {
        id += idChars.charAt(Math.floor(Math.random() * idChars.length));
    }

    return id;

    //return Math.random().toString(36).substr(2, 8); //Same as above just only returns lowercase

}
module.exports = getRandID;