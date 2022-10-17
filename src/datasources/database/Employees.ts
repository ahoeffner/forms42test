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

		this.primaryKey = "employee_id";
		this.addDMLColumns(["email","job_id"]);
		this.sorting = "first_name, last_name";
	}

	public static async getName(employee_id:number) : Promise<string>
	{
		let manager:string = null;
		let stmt:SQLStatement = new SQLStatement(FormsModule.DATABASE);

		stmt.sql =
		`
			select first_name||' '||last_name
			from employees
			where employee_id = :employee_id
		`;

		stmt.addBindValue(new BindValue("employee_id",employee_id,DataType.smallint));

		let success:boolean = await stmt.execute();
		if (success) manager = await stmt.fetch()[0];

		return(manager);
	}
}