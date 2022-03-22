export class Menu
{
    private menu:boolean = false;
    private menuelem:Element = null;

    constructor()
    {
        this.menuelem = document.getElementById("main-menu");
    }

    public showmenu(name:string) : void
    {
        if (this.menu) this.menuelem.firstChild.remove();
        else this.menuelem.appendChild(document.createTextNode("show menu: "+name));
        this.menu = !this.menu;
    }
}