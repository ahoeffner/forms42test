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
import { Departments } from '../../blocks/Departments';
import { Employees as EmployeeBlock } from "../../blocks/Employees";
import { DatabaseResponse, EventType, formevent, FormEvent } from 'forms42core';


export class Employees extends BaseForm
{
	private emp:EmployeeBlock = new EmployeeBlock(this,"Employees");

	constructor()
	{
		super(content);
		this.title = "Employees";

		this.emp.setListOfValues(Jobs.getJobLov(),["job_id","job_title"]);
		this.emp.setListOfValues(Departments.getDepartmentLov(),["department_id","department_name"]);
	}

	@formevent({type: EventType.OnFetch})
	public async getDerivedFields() : Promise<boolean>
	{
		await this.emp.lookupJob("job_title");
		await this.emp.lookupDepartment("department_name");
		return(true);
	}

	@formevent({type: EventType.OnNewRecord})
	public async setDefaults() : Promise<boolean>
	{
		this.emp.setValue("hire_date",new Date());
		return(true);
	}

	@formevent({type: EventType.WhenValidateField, field: "salary"})
	public async validateSalary() : Promise<boolean>
	{
		return(this.emp.validateSalary());
	}

	@formevent({type: EventType.WhenValidateField, field: "job_id"})
	public async validateJob(event:FormEvent) : Promise<boolean>
	{
		return(this.emp.validateJob(event,"job_title"));
	}

	@formevent({type: EventType.WhenValidateField, field: "department_id"})
	public async validateDepatment(event:FormEvent) : Promise<boolean>
	{
		return(this.emp.validateDepartment(event,"department_name"));
	}

	@formevent({type: EventType.PostInsert})
	public async setPrimaryKey() : Promise<boolean>
	{
		let response:DatabaseResponse = this.emp.getRecord().response;
		this.emp.setValue("employee_id",response.getValue("employee_id"));
		return(true);
	}
}
