import Settings from "../util/settings";


export default function gladiator(pathname){
    if(pathname === '/manage') Settings.updateBotData();
};

