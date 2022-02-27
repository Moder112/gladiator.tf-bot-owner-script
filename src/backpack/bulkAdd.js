
// TODO: To be added later

export function effect(){
    return;
    let check;

    appendCheck(".panel-body > .padded");
    $(".panel-body > .padded").append(buttons.addAll);

    buttons.addAll.on("click", ()=>{
        check = buttons.check.find("input").val();
        addItems("#unusual-pricelist > li", check)
    });
}

export function unusual(){
    return;
    let check;

    appendCheck(".panel-body > .padded");
    $(".panel-body > .padded").append(buttons.addAll);
    $(".panel-body > .padded").append(buttons.addAllPriced);
    $(".panel-body > .padded").append(buttons.addAUnPriced);

    buttons.addAll.on("click", ()=>{
        check = buttons.check.find("input").val();
        addItems(".item-list.unusual-pricelist > li, .item-list.unusual-pricelist-missing > li", check)
    });
    buttons.addAllPriced.on("click", ()=>{
        check = buttons.check.find("input").val();
        addItems(".item-list.unusual-pricelist > li", check);
    });
    buttons.addAllUnPriced.on("click", ()=>{
        check = buttons.check.find("input").val();
        addItems(".item-list.unusual-pricelist-missing > li", check)
    });
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



async function appendCheck(selector){
    $(selector).append(buttons.check);
    if(new Boolean(await GM.getValue("check", false))){
        buttons.check.click();
    }
    buttons.check.on("click", function(){
        GM.setValue("check", $(this).val());
    })
}

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