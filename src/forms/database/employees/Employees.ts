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
import { Jobs } from '../../../datasources/database/Jobs';
import { datasource, EventType, FormEvent } from "forms42core";
import { Departments } from '../../../datasources/database/Departments';
import { Employees as Employeedata } from "../../../datasources/database/Employees";

@datasource("Employees",Employeedata)

export class Employees extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "Employees";

		this.setListOfValues("Employees","job_id",Jobs.getJobLov());
		this.setListOfValues("Employees","department_id",Departments.getDepartmentLov());

		this.addEventListener(this.lookups,{type: EventType.OnFetch})
		this.addEventListener(this.validateJob,{type: EventType.WhenValidateField, field: "job_id"})
		this.addEventListener(this.validateDepatment,{type: EventType.WhenValidateField, field: "department_id"})
	}

	public async lookups() : Promise<boolean>
	{
		let code:string = null;
		let title:string = null;

		code = this.getValue("Employees","job_id");
		title = await Jobs.getTitle(code);

		this.setValue("Employees","job_title",title);

		code = this.getValue("Employees","department_id");
		title = await Departments.getTitle(code);

		this.setValue("Employees","department_name",title);

		return(true);
	}

	public async validateJob(event:FormEvent) : Promise<boolean>
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

	public async validateDepatment(event:FormEvent) : Promise<boolean>
	{
		let code:string = this.getValue("Employees","department_id");
		let title:string = await Departments.getTitle(code);

		this.setValue("Employees","department_name",title);

		if (event.type == EventType.WhenValidateField)
		{
			if (title == null)
			{
				this.warning("Invalid Depatment Id","Validation");
				return(false);
			}
		}

		return(true);
	}
}
