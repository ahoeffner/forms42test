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

import { FormsModule } from "../FormsModule";
import { StoredProcedure, DataType, ParameterType, SQLStatement } from "forms42core";

export class Database
{
	public static async getSalaryLimit(job:string) : Promise<number[]>
	{
		let limit:number[] = [0,0];
		let func:StoredProcedure = new StoredProcedure(FormsModule.DATABASE);

		func.setName("getSalaryLimit");

		func.addParameter("job",job,DataType.varchar);
		func.addParameter("min",0,DataType.integer,ParameterType.inout);
		func.addParameter("max",0,DataType.integer,ParameterType.inout);

		let success:boolean = await func.execute();
		if (!success) console.log(func.error());

		if (success)
		{
			limit[0] = func.getOutParameter("min");
			limit[1] = func.getOutParameter("max");
		}

		return(limit);
	}

	public static async getDepartments() : Promise<any[][]>
	{
		let stmt:SQLStatement = new SQLStatement(FormsModule.DATABASE);

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