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

import { Connection, Connections, StoredProcedure, DataType, ParameterType, StoredFunction, SQLStatement } from "forms42core";

export class Database
{
	public static async getDateProc() : Promise<Date>
	{
		let conn:Connection = Connections.get("database");
		let proc:StoredProcedure = new StoredProcedure(conn);
		let today:Date = new Date(); // InOut cannot be null in postgres

		proc.setName("getDateProc");
		proc.addParameter("today",today,DataType.date,ParameterType.inout);

		let success:boolean = await proc.execute();

		if (!success) console.log(proc.error());
		return(proc.getOutParameter("today"));
	}

	public static async getDate() : Promise<Date>
	{
		let conn:Connection = Connections.get("database");
		let func:StoredFunction = new StoredFunction(conn);

		func.setName("getDate");
		func.setReturnType(DataType.date);

		let success:boolean = await func.execute();
		if (!success) console.log(func.error());

		return(func.getReturnValue());
	}

	public static async getDepartments() : Promise<any[][]>
	{
		let conn:Connection = Connections.get("database");
		let stmt:SQLStatement = new SQLStatement(conn);

		stmt.sql = "select * from departments";

		let success:boolean = await stmt.execute();
		if (!success) console.log(stmt.error());

		let rows:any[][] = [];

		while(true)
		{
			let row:any[] = await stmt.fetch();
			if (row == null) break;
			rows.push(row);
		}

		return(rows);
	}
}