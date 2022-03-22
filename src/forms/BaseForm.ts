import { Form, View } from 'forms42core';


export class BaseForm extends Form
{
    private view:View = null;

    public toggle() : void
    {
        if (this.view == null)
        {
            this.view = this.canvas.getView();
            let avail:View = this.canvas.getParentView();

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

    public minimize() : void
    {
        let icon:HTMLImageElement = this.canvas.getElementById("icon") as HTMLImageElement;
        icon.style.display = "block";
        console.log("icon: "+icon)
    }
}