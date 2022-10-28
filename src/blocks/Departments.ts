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

import { Block, Form, Key, ListOfValues } from "forms42core";
import { Employees } from "../datasources/database/Employees";
import { Locations } from "../datasources/database/Locations";
import { Departments as DepartmentTable } from "../datasources/database/Departments";

export class Departments extends Block
{
	constructor(form:Form, name:string)
	{
		super(form,name);
		this.datasource = new DepartmentTable();
	}

	public getPrimaryKey() : Key
	{
		return(new Key("pkey",this.name,"department_id"));
	}

	public static getDepartmentLov() : ListOfValues
	{
		return(DepartmentTable.getDepartmentLov());
	}

	public async lookupManager(field:string) : Promise<boolean>
	{
		let id:number = null;
		let manager:string = null;

		id = this.getValue("manager_id");
		manager = await Employees.getName(id);

		this.setValue(field,manager);
		return(true);
	}

	public async lookupLocation(field:string) : Promise<boolean>
	{
		let id:number = null;
		let location:string = null;

		id = this.getValue("loc_id");
		location = await Locations.getLocation(id);

		this.setValue(field,location);
		return(true);
	}

	public static async getTitle(id:string) : Promise<string>
	{
		return(DepartmentTable.getTitle(id));
	}
}