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

import content from './MasterDetail.html';

import { BaseForm } from "../../../BaseForm";
import { EventType, FormEvent } from "forms42core";
import { Employees } from "../../../blocks/Employees";
import { Departments } from '../../../blocks/Departments';
import { Jobs } from '../../../datasources/database/Jobs';


export class MasterDetail extends BaseForm
{
	private emp:Employees = new Employees(this,"Employees");
	private dept:Departments = new Departments(this,"Departments");

	constructor()
	{
		super(content);
		this.title = "Employees";

		this.dept.setListOfValues("manager",Employees.getManagerLov());

		this.emp.setListOfValues("job_id",Jobs.getJobLov());
		this.emp.setListOfValues("department_id",Departments.getDepartmentLov());

		this.link(this.dept.getPrimaryKey(),this.emp.getDepartmentsForeignKey());

		this.addEventListener(this.getDerivedFields,{type: EventType.OnFetch})
		
		this.addEventListener(this.validateJob,{type: EventType.WhenValidateField, block: "employees", field: "job_id"})
		this.addEventListener(this.getDerivedFields,{type: EventType.WhenValidateField, block: "departments", field: "manager_id"})
		this.addEventListener(this.validateDepatment,{type: EventType.WhenValidateField, block: "employees", field: "department_id"})
	}

	public async getDerivedFields(event:FormEvent) : Promise<boolean>
	{
		if (event.block == "employees")
		{
			await this.emp.lookupJob("job_title");
			await this.emp.lookupDepartment("department_name");
		}
		else if (event.block == "departments")
		{
			await this.dept.lookupManager("manager");
		}

		return(true);
	}

	public async validateJob(event:FormEvent) : Promise<boolean>
	{
		this.emp.validateJob(event,"job_title");
		return(true);
	}

	public async validateDepatment(event:FormEvent) : Promise<boolean>
	{
		this.emp.validateDepartment(event,"department_name");
		return(true);
	}
}