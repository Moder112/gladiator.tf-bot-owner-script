
export default function addMatchButtons(){
    let sellers = $($(".media-list")[0]);
    let buyers = $($(".media-list")[1]);

    sellers.find(".listing").each(spawnButton);
    buyers.find(".listing").each(spawnButton);

    // what the fuck
    globalThis.unsafeWindow.jQuery('.fa-tags').parent().tooltip();
}

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

function spawnButton(){
    let element = $(this);   
    const info = element.find('.item');
    const price = parseListingPrice(info.data('listing_price') || "");
    const match = `<a data-postfix="/item/${encodeURIComponent((info.prop('title') || info.data('original-title')).trim())}?keys=${price.keys}&metal=${price.metal}&intent=${info.data('listing_intent')}" title="Match this user's price" target="_blank" class="btn btn-bottom btn-xs btn-success gladiator-context">
            <i class="fa fa-sw fa-tags"></i>
        </a>`;
    
    if(!hasBlacklistedProperties(info) || info.data('listing_intent') === "sell" )
        element.find(".listing-buttons").prepend(match);
}
