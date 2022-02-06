
import entrypoints from "./entrypoints";

const keyEx = /(\d*(?= keys?))/;
const refEx = /\d*(.\d*)?(?= ref)/;


function parseListingPrice(price){
    return {
        keys:  parseFloat(keyEx.exec(price) ? keyEx.exec(price).shift() : 0),
        metal: parseFloat(refEx.exec(price) ? refEx.exec(price).shift() : 0)
    };
}

function hasBlacklistedProperties(info){
    if( 
        info.data('paint_name')     !== undefined || 
        info.data('spell_1')        !== undefined || 
        info.data('part_price_1')   !== undefined || 
        info.data('killstreaker')   !== undefined ||
        info.data('sheen')          !== undefined 
    ){
        return true;
    }
       
    else 
        return false;
}

function spawnButton(element){
    element = $(element);
    const info = element.find('.item');
    const price = parseListingPrice(info.data('listing_price') || "");
    const match = `<a  href="https://gladiator.tf/manage/my/item/${encodeURIComponent((info.prop('title') || info.data('original-title')).trim())}?keys=${price.keys}&metal=${price.metal}&intent=${info.data('listing_intent')}" title="Match this user's price" target="_blank" class="btn btn-bottom btn-xs btn-success">
            <i class="fa fa-sw fa-tags"></i>
        </a>`;
    
    if(!hasBlacklistedProperties(info) || info.data('listing_intent') === "sell" )
        element.find(".listing-buttons").prepend(match);
}




let buttons = {};

(function() {
    'use strict';
    entrypoints[window.origin]();
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
