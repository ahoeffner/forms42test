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

import { Employees } from "../datasources/database/Employees";
import { Locations } from "../datasources/database/Locations";
import { Departments as DepartmentTable } from "../datasources/database/Departments";
import { BindValue, Block, Filter, Filters, FilterStructure, Form, Key, ListOfValues } from "forms42core";

export class Departments extends Block
{
	constructor(form:Form, name:string)
	{
		super(form,name);
		this.datasource = new DepartmentTable();
	}

	public getPrimaryKey() : Key
	{
		return(new Key(this.name,"department_id"));
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

	public static getDepartmentLov() : ListOfValues
	{
		let bindvalues:BindValue[] = [];
		let filter:FilterStructure = null;
		let source:DepartmentTable = null;

		let nameflt:Filter = Filters.ILike("department_name");

		filter = new FilterStructure().and(nameflt);
		source = new DepartmentTable().addFilter(filter);

		bindvalues.push(nameflt.getBindValue());

		let lov:ListOfValues =
		{
			filterPostfix: "%",
			datasource: source,
			title: "Departments",
			bindvalue: bindvalues,
			displayfields: "department_name",
			filterInitialValueFrom: "department_name",
			sourcefields: ["department_id","department_name"],
			targetfields: ["department_id","department_name"],
		}

		return(lov);
	}

	public static async getTitle(id:string) : Promise<string>
	{
		return(DepartmentTable.getTitle(id));
	}
}