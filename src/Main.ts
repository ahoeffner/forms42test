import { Countries } from './forms/Countries';
import { FormHeader } from './html/FormHeader';
import { PageHeader } from './html/PageHeader';
import { FormsModule, ModuleDefinition } from 'forms42core';

@ModuleDefinition(
    [
        {class: Countries, path: "/countries"},
        {class: FormHeader, path: "/html/formheader"},
        {class: PageHeader, path: "/html/pageheader"},
    ]
)

export class Main extends FormsModule
{
    private menu:boolean = false;
    public static load() : void {new Main();}

    constructor()
    {
        super();
        this.parseIndexPage();
        this.getApplication().showform("/countries");
    }


    public showmenu(name:string) : void
    {
        let menu:Element = document.getElementById("main-menu");

        if (this.menu) menu.firstChild.remove();
        else menu.appendChild(document.createTextNode("show menu: "+name));

        this.menu = !this.menu;
    }
}
