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

import { Jobs } from '../datasources/database/Jobs';
import { Departments } from '../datasources/database/Departments';
import { Block, EventType, Form, FormEvent, Key } from "forms42core";
import { Employees as EmployeeSource } from "../datasources/database/Employees";

export class Employees extends Block
{
	constructor(form:Form, name:string)
	{
		super(form,name);
		this.datasource = new EmployeeSource();
	}

	public getDepartmentsForeignKey() : Key
	{
		return(new Key("deptfkey",this.name,"department_id"));
	}

	public async lookupJob(field:string) : Promise<boolean>
	{
		let code:string = null;
		let title:string = null;

		code = this.getValue("job_id");
		title = await Jobs.getTitle(code);

		this.setValue(field,title);
		return(true);
	}

	public async lookupDepartment(field:string) : Promise<boolean>
	{
		let code:string = null;
		let title:string = null;

		code = this.getValue("department_id");
		title = await Departments.getTitle(code);

		this.setValue(field,title);
		return(true);
	}

	public async validateJob(event:FormEvent, field?:string) : Promise<boolean>
	{
		let code:string = this.getValue("job_id");
		let title:string = await Jobs.getTitle(code);

		if (field)
			this.setValue(field,title);

		if (event.type == EventType.WhenValidateField)
		{
			if (title == null)
			{
				this.form.warning("Invalid job code","Validation");
				return(false);
			}
		}

		return(true);
	}

	public async validateDepartment(event:FormEvent, field?:string) : Promise<boolean>
	{
		let code:string = this.getValue("department_id");
		let title:string = await Departments.getTitle(code);

		if (field)
			this.setValue(field,title);

		if (event.type == EventType.WhenValidateField)
		{
			if (title == null)
			{
				this.form.warning("Invalid Depatment Id","Validation");
				return(false);
			}
		}

		return(true);
	}
}