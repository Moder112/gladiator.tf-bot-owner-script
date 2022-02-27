
/**
 * @typedef {Object<string, Function|Function[]>} MatchExec
 */

/**
 * 
 * @param {MatchExec} matchAndExec 
 * @param {string} test 
 * @param {any[]|any[][]} [payload]
 */
export default function execOnRegexMatch(matchAndExec, test, payload = []){
    Object.entries(matchAndExec).forEach((entry)=>{
        const [regex, toExecute] = entry;

        const regexObj = new RegExp(regex);

        if(regexObj.test(test)){
            if(typeof toExecute === 'function')
                toExecute(...payload);
            if(Array.isArray(toExecute)){
                for(let i = 0; i < toExecute.length; i++){
                    if(typeof toExecute[i] === 'function'){
                        let localPayload = [];
                        if(Array.isArray(payload[i]))
                            localPayload = payload[i];

                        toExecute[i](...localPayload);
                    }
                }
            }
        }
    })
}