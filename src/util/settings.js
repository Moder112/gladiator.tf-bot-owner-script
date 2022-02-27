

/**
 * @typedef {{
 *  bots: Bots,
 *  manageContext: string
 * }} SettingsData
 * */

/** @typedef {Object<string, string>} Bots */

/**
 * @returns {Promise<SettingsData>}
 */
function loadSettings(){
    return new Promise((resolve)=>{
        GM.getValue('settings', JSON.stringify(Settings.data)).then((settings)=>{
            const parsed = JSON.parse(settings);
            Settings.data = parsed;
            resolve(parsed);
        })
    });
}

function saveSettings(){
    GM.setValue('settings', JSON.stringify(Settings.data));
}

/**
 * @returns {Bots|null}
 */
function fetchBotData(){
    /**
     * @type {JQuery<HTMLFormElement>}
     */
    const form = $("#userBots");
    if(form.length === 0 || !form.serializeArray)
        return null;
     
    let formData = {};
    form.serializeArray().forEach((entry)=>formData[entry.name] = entry.value);

    return formData;
}

function renderForm(){
    const $parent = $("<form id='glad-settings'></form>");

    const botAmount = Object.keys(Settings.data.bots).length;
    const $select = $("<select name='manageContext'></select>");
    console.log(Settings.data.bots);
    console.log(Object.entries(Settings.data.bots));
    Object.entries(Settings.data.bots).forEach((bot)=>{
        $select.append(`<option value="${bot[1]}" ${Settings.data.manageContext === bot[1] ? 'selected' : ''}>${bot[0]}</option>`)
    })

    const $bots = $(`<div>
    <h4>Choose The Bot</h4>
    <hr>
    </div>`);
    $bots.append($select);
    $bots.insertAfter("hr", botAmount > 0 ? $select : "<span>You dont have multiple bots, or if you do, <a>refresh</a></span>");
    $parent.append($bots);

    return $parent;
}

function submitForm(){
    const form = $('#glad-settings').serializeArray();
    Settings.data.manageContext = form['manageContext'] ? form['manageContext'] : 'my';
    Settings.save();
}

const Settings = {
    /** @type {SettingsData} */
    data: {
        manageContext: 'my',
        bots: {}
    },
    load: loadSettings,
    save: saveSettings,
    form: {
        render: renderForm,
        submit: submitForm
    },
    updateBotData: ()=>{
        let fetched = fetchBotData();
        console.log(fetched);
        if(fetched !== null){
            Settings.data.bots = fetched;
            
            console.log({msg: "Fetched data from /manage", bots: Settings.data.bots});
            Settings.save();
        }
    }
}

export default Settings;


