export class Util{
    constructor(){}

    static isValidURL(str){
        let res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }

    static get uid(){
        return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(7).toString().replace(".", ""));
    }
    
}