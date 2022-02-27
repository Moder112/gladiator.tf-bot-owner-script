import svg from "../assets";
import execOnRegexMatch from "../util/regexExec";
import Settings from "../util/settings";
import addMatchButtons from "./addMatch";
import { effect, unusual } from "./bulkAdd";

function settings(){
    const $svg =  $(`
        <a class="price-box" data-tip="top" data-original-title="Gladiator.tf">
            ${svg.options}
            <div class="text" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 0;">
                <div class="value" style="font-size: 14px;">Settings</div>
            </div>
        </a>
    `).on('click', ()=>Modal.render('Settings', Settings.form.render).$base
                            .on('hide.bs.modal',()=>{
                                Settings.form.submit();
                                fixManageLink(Settings.data.manageContext);
                            }));

    $('.price-boxes').append($svg);   
}
function addOnGladiatorStats(){
    const $addButton = $(`
        <a class="price-box gladiator-context" data-postfix="/item/${encodeURIComponent($('.stats-header-title').text().trim())}/add" target="_blank" data-tip="top" data-original-title="Gladiator.tf">
            <img src="https://gladiator.tf/favicon-96x96.png" alt="gladiator">
            <div class="text" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 0;">
                <div class="value" style="font-size: 14px;">Add on Gladiator.tf</div>
            </div>
        </a>
    `);

    $('.price-boxes').append($addButton);
}
function addOnGladiatorPopup(){
    $("body").on("mouseover", ".item", function () {
        let self = this;
        let id = setInterval(function() {
            if ($(self).next().hasClass("popover")) {
                let popover = $(self).next().find("#popover-price-links");

                if (popover.find("a[href^='https://gladiator.tf']").length == 0) {
                    popover.append("<a class=\"btn btn-default btn-xs\" href=\"" + `https://gladiator.tf/manage/${Settings.data.manageContext}/item/${encodeURIComponent($($(self)[0]).data('original-title'))}/add` + "\" target=\"_blank\"><img src=\"https://gladiator.tf/favicon-96x96.png\" style='width: 16px;height: 16px;margin-top: -2px;'> Add on Gladiator.tf</a>");
                }

                clearInterval(id);
            }
        }, 50);
        setTimeout(function () {
            clearInterval(id);
        }, 750);
    });
}

function fixManageLink(manageContext){
    if(!manageContext) manageContext = Settings.data.manageContext;
    
    $('.gladiator-context').each(function(){
        $(this).attr('href', `https://gladiator.tf/manage/${manageContext}${$(this).data('postfix')}`); 
    });
}

export default function backpack(pathname){
    $('[title="Gladiator.tf Instant Trade"]').css('margin-right','3px');

    const classiesAndStats = [addOnGladiatorPopup, addOnGladiatorStats, addMatchButtons];

    const patterns = {
        "stats\/":      [...classiesAndStats, settings],
        "classifieds\/":[...classiesAndStats],
        "effect\/":     [addOnGladiatorPopup, effect, settings],
        "unusual\/":    [addOnGladiatorPopup, unusual, settings]
    };

    execOnRegexMatch(patterns, pathname);
    fixManageLink();
    

    buttons = {
        addAll: $(`<a class="btn btn-default" target="_blank"><i class="fas fa-plus-circle"></i>Add all</a>`),
        addAllPriced: $(`<a class="btn btn-default" target="_blank"><i class="fas fa-plus-circle"></i>Add all priced unusuals</a>`),
        addAllUnPriced: $(`<a class="btn btn-default" target="_blank"><i class="fas fa-plus-circle"></i>Add all unpriced unusuals</a>`),
        check: $(`<div class="" target="_blank"><input type="checkbox" id="store-check">Store to Add Later</div>`)
    }

    for (let i of document.getElementsByClassName('price-box')) {
        if (i.origin === 'https://gladiator.tf') { 
          return;
        }
    }

}