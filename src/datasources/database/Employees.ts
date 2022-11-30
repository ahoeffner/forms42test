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
import { BindValue, DatabaseTable, DataType, SQLStatement } from "forms42core";

export class Employees extends DatabaseTable
{
	constructor()
	{
		super(FormsModule.DATABASE,"employees");

		this.rowlocking = true;
		this.primaryKey = "employee_id";
		this.insertReturnColumns = "employee_id";
		this.addDMLColumns(["job_id","department_id"]);
		this.sorting = "department_id, last_name, first_name";
	}

	public static async getName(employee_id:number) : Promise<string>
	{
		let row:any[] = null;
		let stmt:SQLStatement = new SQLStatement(FormsModule.DATABASE);

		stmt.sql =
		`
			select first_name||' '||last_name
			from employees
			where employee_id = :employee_id
		`;

		stmt.addBindValue(new BindValue("employee_id",employee_id,DataType.smallint));

		let success:boolean = await stmt.execute();
		if (success) row = await stmt.fetch();

		if (row)	return(row[0]);
		return(null);
	}

	public static async getAllEmployees() : Promise<string[]>
	{
		let row:any[] = null;
		let employees:string[] = [];

		let stmt:SQLStatement = new SQLStatement(FormsModule.DATABASE);

		stmt.sql =
		`
			select first_name||' '||last_name
			from employees order by last_name, first_name
		`;

		stmt.arrayfetch = 32;
		let success:boolean = await stmt.execute();

		if (success)
		{
			while(true)
			{
				row = await stmt.fetch();
				if (row == null) break;
				employees.push(row[0]);
			}
		}

		return(employees);
	}
}