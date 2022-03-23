import { Main } from '../Main';
import { Form, FormsModule, View } from 'forms42core';


export class BaseForm extends Form
{
    public id:string = null;
    private view:View = null;
    private static forms:number = 0;

    constructor(content:string)
    {
        super(content);
        this.id = "f" + ++BaseForm.forms;
    }

    public toggle() : void
    {
        if (this.view == null)
        {
            this.view = this.canvas.getView();
            let avail:View = this.canvas.getParentView();

            avail.x = 0;
            avail.y = 0;
            avail.width = +avail.width - 2;
            avail.height = +avail.height - 2;

            this.canvas.setView(avail);
        }
        else
        {
            this.canvas.setView(this.view);
            this.view = null;
        }
    }

    public hide() : void
    {
        this.canvas.remove();
    }

    public show() : void
    {
        this.canvas.restore();
    }

    public minimize() : void
    {
        let main:Main = FormsModule.get() as Main;
        main.list.add(this);
        this.hide();
    }

    public setTitle(title:string) : void
    {
        let header:HTMLElement = this.getPage().querySelector("[name='title']");
        header.appendChild(document.createTextNode(title));
    }
}