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

import { Jobs } from '../../blocks/Jobs';
import { BaseForm } from "../../BaseForm";
import { Employees } from "../../blocks/Employees";
import { Locations } from '../../blocks/Locations';
import { Departments } from '../../blocks/Departments';
import { DatabaseResponse, EventType, formevent, FormEvent, KeyMap } from "forms42core";


export class MasterDetail extends BaseForm
{
	private emp:Employees = new Employees(this,"Employees");
	private dept:Departments = new Departments(this,"Departments");

	constructor()
	{
		super(content);
		this.title = "Employees";

		this.emp.setListOfValues(Jobs.getJobLov(),"job_id");
		this.dept.setListOfValues(Employees.getManagerLov(),"manager");
		this.dept.setListOfValues(Locations.getLocationLov(),"location");

		this.link(this.dept.getPrimaryKey(),this.emp.getDepartmentsForeignKey());
	}

	@formevent({type: EventType.PreQuery, block: "employees"})
	public async preQuery() : Promise<boolean>
	{
		this.emp.filter.delete("job_title");
		return(true);
	}

	@formevent({type: EventType.OnFetch})
	public async getDerivedFields(event:FormEvent) : Promise<boolean>
	{
		if (event.block == "employees")
		{
			await this.emp.lookupJob("job_title");
		}
		else if (event.block == "departments")
		{
			await this.dept.lookupManager("manager");
			await this.dept.lookupLocation("location");
		}

		return(true);
	}

	@formevent({type: EventType.WhenValidateField, block: "departments", field: "manager_id"})
	public async validateManager() : Promise<boolean>
	{
		await this.dept.lookupManager("manager");
		return(true);
	}

	@formevent({type: EventType.WhenValidateField, block: "departments", field: "loc_id"})
	public async validateLocation() : Promise<boolean>
	{
		await this.dept.lookupLocation("location");
		return(true);
	}

	@formevent({type: EventType.WhenValidateField, block: "employees", field: "salary"})
	public async validateSalary() : Promise<boolean>
	{
		return(this.emp.validateSalary());
	}

	@formevent({type: EventType.WhenValidateField, block: "employees", field: "job_id"})
	public async validateJob(event:FormEvent) : Promise<boolean>
	{
		return(this.emp.validateJob(event,"job_title"));
	}

	@formevent({type: EventType.PostInsert, block: "employees"})
	public async setPrimaryKey() : Promise<boolean>
	{
		let response:DatabaseResponse = this.emp.getRecord().response;
		this.emp.setValue("employee_id",response.getValue("employee_id"));
		return(true);
	}
}