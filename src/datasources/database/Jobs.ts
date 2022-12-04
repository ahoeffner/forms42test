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
import { BindValue, DatabaseTable, DataType, ParameterType, SQLStatement, StoredProcedure } from "forms42core";

export class Jobs extends DatabaseTable
{
	constructor()
	{
		super(FormsModule.DATABASE,"jobs");

		this.rowlocking = true;
		this.sorting = "job_id";
		this.primaryKey = "job_id";
	}

	public static async getTitle(id:string) : Promise<string>
	{
		let row:any[] = null;
		let stmt:SQLStatement = new SQLStatement(FormsModule.DATABASE);

		stmt.sql =
		`
			select job_title
			from jobs
			where job_id = :id
		`;

		stmt.addBindValue(new BindValue("id",id,DataType.string));

		let success:boolean = await stmt.execute();
		if (success) row = await stmt.fetch();

		if (row)	return(row[0]);
		return(null);
	}

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
}