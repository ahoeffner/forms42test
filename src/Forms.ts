import { Menu } from './Menu';
import { Minimized } from './Minimized';
import { Countries } from './forms/Countries';
import { FormHeader } from './html/FormHeader';
import { PageHeader } from './html/PageHeader';
import { PageFooter } from './html/PageFooter';
import { FormsModule, ModuleDefinition, Properties } from 'forms42core';

@ModuleDefinition(
    [
        {class: Countries, path: "/countries"},
        {class: FormHeader, path: "/html/formheader"},
        {class: PageHeader, path: "/html/pageheader"},
        {class: PageFooter, path: "/html/pagefooter"},
    ]
)

export class Forms extends FormsModule
{
    public menu:Menu = null;
    public list:Minimized = null;

    public static load() : void {new Forms();}

    constructor()
    {
        super();
		Properties.EventPrefix = "frm.";

        this.parse();
        this.menu = new Menu();
        this.list = new Minimized();

        this.getApplication().showform("/countries");
    }
}
