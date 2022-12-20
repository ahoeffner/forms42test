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


export class MasterDetail extends BaseForm
{
	private emp:Employees = new Employees(this,"Employees");
	private dept:Departments = new Departments(this,"Departments");

	private empsort:{column:string, asc:boolean} = {column: "last_name", asc: true};
	private deptsort:{column:string, asc:boolean} = {column: "department_id", asc: true};

	constructor()
	{
		super(content);
		this.title = "Employees";

		this.dept.setListOfValues(Employees.getManagerLov(),"manager");
		this.dept.setListOfValues(Locations.getLocationLov(),"location");

		this.emp.setListOfValues(Jobs.getJobLov(),["job_id","job_title"]);
		this.emp.setListOfValues(Departments.getDepartmentLov(),["department_id","department_name"]);

		this.link(this.dept.getPrimaryKey(),this.emp.getDepartmentsForeignKey());
	}

	public sort(block:string, field:string) : void
	{
		if (block == "dept" && !this.dept.empty())
		{
			if (field == this.deptsort.column) this.deptsort.asc = !this.deptsort.asc;
			else 										  this.deptsort = {column: field, asc: true};

			this.dept.datasource.sorting = this.deptsort.column + " " + (this.deptsort.asc ? "asc" : "desc");
			this.dept.reQuery();
		}
		else if (block == "emp" && !this.emp.empty())
		{
			if (field == this.empsort.column) this.empsort.asc = !this.empsort.asc;
			else 										 this.empsort = {column: field, asc: true};

			this.emp.datasource.sorting = this.empsort.column + " " + (this.empsort.asc ? "asc" : "desc");
			this.emp.reQuery();
		}
	}
}