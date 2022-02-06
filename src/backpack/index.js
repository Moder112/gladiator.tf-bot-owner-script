
export default function(){
    $(document).ready(function(){
        $('[title="Gladiator.tf Instant Trade"]').css('margin-right','3px');

        //javascript nonsense
        window.jQuery('.fa-tags').parent().tooltip();

        
    }); 

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
    

    if (window.location.href.includes('https://backpack.tf/effect/')){
        let check;
        appendCheck(".panel-body > .padded");
        $(".panel-body > .padded").append(buttons.addAll);

        buttons.addAll.on("click", ()=>{
            check = buttons.check.find("input").val();
            addItems("#unusual-pricelist > li", check)
        });
    }
    if (window.location.href.includes('https://backpack.tf/unusual/')){

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
    if (window.location.href.includes('/stats')) {
        $('.price-boxes').append(
            `<a class="price-box" href="https://gladiator.tf/manage/my/item/${encodeURIComponent($('.stats-header-title').text().trim())}/add" target="_blank" data-tip="top" data-original-title="Gladiator.tf">
                <img src="https://gladiator.tf/favicon-96x96.png" alt="gladiator">
                <div class="text" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 0;">
                    <div class="value" style="font-size: 14px;">Add on Gladiator.tf</div>
                </div>
            </a>`);
    }

    $("body").on("mouseover", ".item", function () {
        let self = this;
        let id = setInterval(function() {
            if ($(self).next().hasClass("popover")) {
                let popover = $(self).next().find("#popover-price-links");

                if (popover.find("a[href^='https://gladiator.tf']").length == 0) {
                    popover.append("<a class=\"btn btn-default btn-xs\" href=\"" + `https://gladiator.tf/manage/my/item/${encodeURIComponent($($(self)[0]).data('original-title'))}/add` + "\" target=\"_blank\"><img src=\"https://gladiator.tf/favicon-96x96.png\" style='width: 16px;height: 16px;margin-top: -2px;'> Add on Gladiator.tf</a>");
                }

                clearInterval(id);
            }
        }, 50);
        setTimeout(function () {
            clearInterval(id);
        }, 750);
    });

    
    if(window.location.href.includes('/stats') || window.location.href.includes('/classifieds')) {
        let sellers = $($(".media-list")[0]);
        let buyers = $($(".media-list")[1]);
        sellers.find(".listing").each(spawnButton);
        buyers.find(".listing").each(spawnButton);
    }
}