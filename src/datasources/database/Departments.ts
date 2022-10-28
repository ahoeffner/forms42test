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

import { FormsModule } from "../../FormsModule";
import { BindValue, DatabaseTable, DataType, Filter, Filters, FilterStructure, ListOfValues, SQLStatement } from "forms42core";

export class Departments extends DatabaseTable
{
	constructor()
	{
		super(FormsModule.DATABASE,"departments");

		this.addColumns("manager_id");
		this.sorting = "department_id";
		this.primaryKey = "department_id";
	}

	public static getDepartmentLov() : ListOfValues
	{
		let source:Departments = null;
		let bindvalues:BindValue[] = [];
		let filter:FilterStructure = null;

		let nameflt:Filter = Filters.ILike("department_name");

		filter = new FilterStructure().and(nameflt);
		source = new Departments().addFilter(filter);

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
		let row:any[] = null;
		let stmt:SQLStatement = new SQLStatement(FormsModule.DATABASE);

		stmt.sql =
		`
			select department_name
			from departments
			where department_id = :id
		`;

		stmt.addBindValue(new BindValue("id",id,DataType.integer));

		let success:boolean = await stmt.execute();
		if (success) row = await stmt.fetch();

		if (row)	return(row[0]);
		return(null);
	}
}