/*
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.

 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 */

import { BaseForm } from './BaseForm';
import content from './Countries.html';
import { FormEvent, EventType, MouseMap } from 'forms42core';


export class Countries extends BaseForm
{
    constructor()
    {
        super(content);
		this.title = "Countries";
		this.addEventListener(this.handle);
		this.addEventListener(this.allevents,{field: "country_name", type: EventType.ValidateField});
		this.addEventListener(this.mouseevents,[{mouse: MouseMap.contextmenu}]);
    }

	private async allevents(event:FormEvent) : Promise<boolean>
	{
		if (event.type == EventType.ValidateField)
			console.log("1: "+event);
			
		return(true);
	}

	private async mouseevents(event:FormEvent) : Promise<boolean>
	{
		console.log(event.fieldname+" "+EventType[event.type]+" "+MouseMap[event.mouse]);
		return(true);
	}

	private rec:number = 0;
	public async handle(event:FormEvent) : Promise<boolean>
	{
		if (event.type == EventType.PostQuery)
			this.setValue("countries","country_id",this.rec++);

		if (event.type == EventType.ValidateField)
			console.log("2: "+event);

		//if (event.type == EventType.Mouse)
			//console.log(EventType[event.type])

		/*
		if (event.type == EventType.Editing)
			console.log("Edit "+event.fieldname+" <"+event.field.getValue()+">")

		if (EventType[event.type].startsWith("Pre") || EventType[event.type].startsWith("Post"))
			console.log(EventType[event.type]+" "+this.getValue("Countries","country_id")+" field: "+event.fieldname)

		if (event.type == EventType.ValidateField)
			console.log("validate field "+event.fieldname+" <"+event.field.getValue()+">");

		if (event.type == EventType.ValidateField && event.fieldname == "country_name")
			if (event.field.getValue() == "ERR") return(false);

		if (event.type == EventType.ValidateRecord)
			console.log("validate record "+event.blockname);
		*/

		return(true);
	}

	public test() : void
	{
		this.dumpInstances();
	}
}