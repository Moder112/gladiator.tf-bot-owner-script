import Settings from "../util/settings";


export default function gladiator(pathname){
    console.log(pathname);
    if(pathname === '/manage') Settings.updateBotData();
};

