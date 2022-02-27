
import entrypoints from "./entrypoints";
import execOnRegexMatch from "./util/regexExec";
import Settings from "./util/settings";





let buttons = {};
(function() {
    'use strict';
    Settings.load().then(()=>{
        execOnRegexMatch(entrypoints, window.location.origin, [window.location.pathname]);
    });
})();

/**
 * Add items in bulk
 * @param {string | Array} input CSS selector of items to add or array of pre-made items to add 
 * @param {boolean} redirect True if extension is to redirect after adding the items 
 */
function addItems(input, redirect = true){
    let items = [];
    if($(input).length > 0){
        console.log("input");
        $(input).each(function(){
            items.push(parseItemListItem($(this)));
        });
        mergeAndAdd(items);
    }else if(Array.isArray(input)){
        
    }else{
        console.log("none");
    }
}

async function appendCheck(selector){
    $(selector).append(buttons.check);
    if(new Boolean(await GM.getValue("check", false))){
        buttons.check.click();
    }
    buttons.check.on("click", function(){
        GM.setValue("check", $(this).val());
    })
}

async function mergeAndAdd(newItems){
    GM.getValue("items", "[]").then((val)=>{
        GM.setValue("items", [...val, ...newItems]);
        console.log([...val, ...newItems]);
    });
}

function parseItemListItem($item){
    let quality = $item.data("q_name");
    let effect_id = $item.data("effect_id");
    let craftable = $item.data("craftable");
    let name = $item.prop("title") || $item.data("original-title");
    let pathToImg = "";
    
    if($item.find(".item-icon").length){
        let background_image = /(?<=url\().*?(?=\))/.exec($item.find(".item-icon").css("background-image"));
        pathToImg = background_image.shift();
    }

    return {
        quality,
        effect_id,
        craftable,
        name,
        pathToImg
    }
}
