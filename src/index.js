
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


