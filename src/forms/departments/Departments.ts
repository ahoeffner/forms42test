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

import content from './Departments.html';

import { BaseForm } from "../../BaseForm";
import { Sorter } from '../../utils/Sorter';
import { Departments as DepartmentBlock } from "../../blocks/Departments";


export class Departments extends BaseForm
{
	private sorter:Sorter = null;
	private dept:DepartmentBlock = new DepartmentBlock(this,"Departments");

	constructor()
	{
		super(content);
		this.title = "Departments";

		this.dept.setManagerLov("manager");
		this.dept.setLocationLov("location");

		this.sorter = new Sorter(this.dept,"department_id");
	}

	public sort(field:string) : void
	{
		this.sorter.column = field;
	}
}
