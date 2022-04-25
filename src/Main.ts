import { Menu } from './Menu';
import { Countries } from './forms/Countries';
import { FormHeader } from './html/FormHeader';
import { PageHeader } from './html/PageHeader';
import { PageFooter } from './html/PageFooter';
import { FormsModule, ModuleDefinition } from 'forms42core';
import { Minimized } from './Minimized';

@ModuleDefinition(
    [
        {class: Countries, path: "/countries"},
        {class: FormHeader, path: "/html/formheader"},
        {class: PageHeader, path: "/html/pageheader"},
        {class: PageFooter, path: "/html/pagefooter"},
    ]
)

export class Main extends FormsModule
{
    public menu:Menu = null;
    public list:Minimized = null;

    public static load() : void {new Main();}

    constructor()
    {
        super();
        this.parseIndexPage();

        this.menu = new Menu();
        this.list = new Minimized();

        this.getApplication().showform("/countries");
    }
}