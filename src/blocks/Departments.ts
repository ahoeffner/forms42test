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

import { Employees as EmployeesBlock } from "./Employees";
import { Employees as EmployeesTable} from "../datasources/database/Employees";
import { Locations as LocationsTable } from "../datasources/database/Locations";
import { Departments as DepartmentTable } from "../datasources/database/Departments";
import { BindValue, Block, EventType, Filter, Filters, FilterStructure, Form, formevent, Key, ListOfValues } from "forms42core";

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

	@formevent({type: EventType.OnFetch})
	public async getDerivedFields() : Promise<boolean>
	{
		let id:number = null;
		let field:string = null;
		let manager:string = null;
		let location:string = null;

		field = "manager";
		if (this.getFieldNames().includes(field))
		{
			id = this.getValue("manager_id");

			if (id != null)
				manager = await EmployeesTable.getName(id);

			this.setValue(field,manager);
		}

		field = "location";
		if (this.getFieldNames().includes(field))
		{
			id = this.getValue("loc_id");

			if (id != null)
				location = await LocationsTable.getLocation(id);

			this.setValue(field,location);
		}

		return(true);
	}

	@formevent({type: EventType.WhenValidateField, field: "manager_id"})
	public async validateManager() : Promise<boolean>
	{
		let id:number = null;
		let manager:string = null;
		let field:string = "manager";

		id = this.getValue("manager_id");

		if (id != null)
		{
			manager = await EmployeesTable.getName(id);

			if (this.getFieldNames().includes(field))
				this.setValue(field,manager);

			if (manager == null && !this.queryMode())
			{
				this.warning("Invalid manager id","Departments");
				return(false);
			}
		}
		else
		{
			if (this.getFieldNames().includes(field))
				this.setValue(field,manager);
		}

		return(true);
	}

	@formevent({type: EventType.WhenValidateField, field: "loc_id"})
	public async validateLocation() : Promise<boolean>
	{
		let id:number = null;
		let location:string = null;
		let field:string = "location";

		id = this.getValue("loc_id");

		if (id != null)
		{
			location = await LocationsTable.getLocation(id);

			if (this.getFieldNames().includes(field))
				this.setValue(field,location);

			if (location == null && !this.queryMode())
			{
				this.warning("Invalid location id","Departments");
				return(false);
			}
		}
		else
		{
			if (this.getFieldNames().includes(field))
				this.setValue(field,location);
		}

		return(true);
	}

	@formevent({type: EventType.PostViewInit})
	public async setLovs() : Promise<boolean>
	{
		if (this.getFieldNames().includes("manager_id"))
			this.setListOfValues(EmployeesBlock.getManagerLov(),"manager");

		if (this.getFieldNames().includes("manager"))
			this.setListOfValues(EmployeesBlock.getManagerLov(),"manager");

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
}