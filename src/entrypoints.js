
import backpack from "./backpack/index";
import gladiator from "./gladiator/index";
/**
 * async function gladiator(){
    let itemsBulk = /gladiator\.tf(:\d+)?\/manage\/\w*\/items\/bulk/;
    if(itemsBulk.test(window.location.href)){
       let storage =  await GM.getValue("items", "[]");
       if(storage.length > 2){
           $("#tm-input").val(storage).trigger("input");
       }
    }
}
 */


const entrypoints = {
    "https://gladiator.tf": gladiator,
    "https://127.0.0.1": gladiator,
    "https://backpack.tf": backpack
}

export default entrypoints;