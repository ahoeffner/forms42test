import { FormsModule } from '../FormsModule';
import { Form, View, EventType } from 'forms42core';


export class BaseForm extends Form
{
    public id:string = null;
    private view:View = null;
	public title:string = null;
    private static forms:number = 0;
    private handler:EventHandler = new EventHandler(this);

    constructor(content:string)
    {
        super(content);
        this.id = "f" + ++BaseForm.forms;
		this.addEventListener(this.oninit,{type: EventType.NewForm});
    }

    public oninit() : void
    {
        let px:number = 16;
        let off:number = BaseForm.forms % 8;

        let posX:number = off*px;
        let posY:number = off*px;

        this.canvas.getElement().style.top = posY + "px";
        this.canvas.getElement().style.left = posX + "px";

        this.canvas.getContent().tabIndex = -1;
        this.canvas.getContent().addEventListener("blur",this.handler);
        this.canvas.getContent().addEventListener("focus",this.handler);

		this.setTitle(this.title);
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
        let forms:FormsModule = FormsModule.get() as FormsModule;
        forms.list.add(this);
        this.hide();
    }

    public setTitle(title:string) : void
    {
        let header:HTMLElement = this.getLayout().querySelector("[name='title']");
        header.appendChild(document.createTextNode(title));
    }
}


class EventHandler implements EventListenerObject
{
	private static zindex:number = 0;

    constructor(private form:BaseForm) {}

    public handleEvent(event:Event): void
    {
		if (event.type == "focus")
		{
			EventHandler.zindex++;
			this.form.canvas.zindex = EventHandler.zindex;
		}
    }
}