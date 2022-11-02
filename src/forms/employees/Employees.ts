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

import { Jobs } from '../../blocks/Jobs';
import { BaseForm } from "../../BaseForm";
import { EventType, FormEvent } from 'forms42core';
import { Departments } from '../../blocks/Departments';
import { Employees as EmployeeBlock } from "../../blocks/Employees";


export class Employees extends BaseForm
{
	private emp:EmployeeBlock = new EmployeeBlock(this,"Employees");

	constructor()
	{
		super(content);
		this.title = "Employees";

		this.emp.setListOfValues("job_id",Jobs.getJobLov());
		this.emp.setListOfValues("department_id",Departments.getDepartmentLov());

		this.addEventListener(this.getDerivedFields,{type: EventType.OnFetch})
		this.addEventListener(this.validateJob,{type: EventType.WhenValidateField, field: "job_id"})
		this.addEventListener(this.validateDepatment,{type: EventType.WhenValidateField, field: "department_id"})
	}

	public async getDerivedFields() : Promise<boolean>
	{
		await this.emp.lookupJob("job_title");
		await this.emp.lookupDepartment("department_name");
		return(true);
	}

	public async validateJob(event:FormEvent) : Promise<boolean>
	{
		return(this.emp.validateJob(event,"job_title"));
	}

	public async validateDepatment(event:FormEvent) : Promise<boolean>
	{
		return(this.emp.validateDepartment(event,"department_name"));
	}
}
