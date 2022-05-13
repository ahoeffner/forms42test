import { Event, EventType } from 'forms42core';
import { BaseForm } from './BaseForm';
import content from './Countries.html';


export class Countries extends BaseForm
{
    constructor()
    {
        super(content);
		this.title = "Countries";
		this.addEventListener(this.handle);
    }

	public test() : void
	{
		console.log("test");
	}

	public async handle(event:Event) : Promise<boolean>
	{
		console.log("event: "+event);
		//if (event.type == EventType.PostChange) return(false);
		return(true);
	}
}