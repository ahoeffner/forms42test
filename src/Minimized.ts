import { BaseForm as Form } from './forms/BaseForm';

export class Minimized implements EventListenerObject
{
    private list:HTMLElement = null;
    private icon:HTMLImageElement = null;
    private forms:Map<string,Form> = new Map<string,Form>();

    constructor()
    {
        this.list = document.getElementById("form-list");
        this.icon = this.list.querySelector("img");
    }

    public add(form:Form) : void
    {
        let icon:HTMLImageElement = this.icon.cloneNode() as HTMLImageElement;

        icon.id = form.id;
        icon.style.width = "32px";
        icon.style.height = "32px";
        icon.style.display = "flex";
        icon.style.marginTop = "2.5px";
        icon.style.marginLeft = "1.5px";
        icon.style.marginRight = "1.5px";
        icon.addEventListener("click",this);

        this.list.appendChild(icon);
        this.forms.set(form.id,form);
    }

    public handleEvent(event:Event): void
    {
        let icon:Element = event.target as Element;
        let form:Form = this.forms.get(icon.id);

        form.show();
        icon.remove();

        this.forms.delete(icon.id);
    }
}