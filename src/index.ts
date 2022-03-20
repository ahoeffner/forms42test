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
    public showmenu(type:string) : void
    {
        console.log("showmenu "+type);
    }
}

let main:Main = new Main();

main.parseIndexPage();
main.getApplication().showform("/countries");