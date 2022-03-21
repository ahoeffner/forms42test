import { Header } from './html/Header';
import { Countries } from './forms/Countries';
import { FormsModule, ModuleDefinition } from 'forms42core';

@ModuleDefinition(
    [
        {class: Header, path: "/html/header"},
        {class: Countries, path: "/countries"}
    ]
)

class Main extends FormsModule
{
    public showmenu(name:string) : void
    {
        let menu:Element = document.getElementById("main-menu");
        menu.appendChild(document.createTextNode("show menu: "+name));
    }
}

let main:Main = new Main();

main.parseIndexPage();
main.getApplication().showform("/countries");