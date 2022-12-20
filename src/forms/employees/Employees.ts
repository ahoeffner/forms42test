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
}
