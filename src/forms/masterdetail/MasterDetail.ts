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

import { BaseForm } from "../../BaseForm";
import { Sorter } from '../../utils/Sorter';
import { Employees } from "../../blocks/Employees";
import { Departments } from '../../blocks/Departments';


export class MasterDetail extends BaseForm
{
	private emp:Employees = new Employees(this,"Employees");
	private dept:Departments = new Departments(this,"Departments");

	private empsort:Sorter = new Sorter(this.emp,"last_name");
	private deptsort:Sorter = new Sorter(this.dept,"department_id");

	constructor()
	{
		super(content);
		this.title = "Departments/Employees";

		this.dept.setManagerLov("manager");
		this.dept.setLocationLov("location");

		this.emp.setJobLov(["job_id","job_title"]);
		this.emp.setDepartmentLov(["department_id","department_name"]);

		this.link(this.dept.getPrimaryKey(),this.emp.getDepartmentsForeignKey());
	}

	public sort(block:string, field:string) : void
	{
		if (block == "emp") this.empsort.column = field;
		if (block == "dept") this.deptsort.column = field;
	}
}