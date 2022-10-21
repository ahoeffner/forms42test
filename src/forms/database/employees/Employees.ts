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

import content from './Employees.html';

import { BaseForm } from "../../../BaseForm";
import { datasource, EventType, FormEvent, ListOfValues } from "forms42core";
import { Employees as Employeedata } from "../../../datasources/database/Employees";
import { Jobs } from '../../../datasources/database/Jobs';

@datasource("Employees",Employeedata)

export class Employees extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "Employees";

		this.addEventListener(this.setJobName,{type: EventType.OnFetch})
		this.addEventListener(this.setJobName,{type: EventType.WhenValidateField, field: "job_id"})
	}

	public async setJobName(event:FormEvent) : Promise<boolean>
	{
		let code:string = this.getValue("Employees","job_id");
		let title:string = await Jobs.getTitle(code);

		this.setValue("Employees","job_title",title);

		if (event.type == EventType.WhenValidateField)
		{
			if (title == null)
			{
				this.warning("Invalid job code","Validation");
				return(false);
			}
		}

		return(true);
	}
}
