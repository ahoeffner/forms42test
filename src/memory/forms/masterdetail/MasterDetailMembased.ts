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

import content from './MasterDetailMembased.html';

import { BaseForm } from '../../../BaseForm';
import { Key, datasource } from 'forms42core';
import { Employees } from "../../../datasources/memory/Employees";
import { Departments } from "../../../datasources/memory/Departments";

@datasource("Employees",Employees)
@datasource("Departments",Departments)

export class MasterDetailMembased extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "Master Detail";

		let master:Key = new Key("pkey","Departments","department_id");
		let detail:Key = new Key("fkey.dept","Employees","department_id");

		this.link(master,detail);
	}
}