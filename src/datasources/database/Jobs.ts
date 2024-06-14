/*
  MIT License

  Copyright © 2023 Alex Høffner

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software
  and associated documentation files (the “Software”), to deal in the Software without
  restriction, including without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or
  substantial portions of the Software.

  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
  BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { FormsModule } from "../../FormsModule";
import { BindValue, DatabaseSource, DataType, ParameterType, SQLStatement, StoredProcedure } from "forms42core";

export class Jobs extends DatabaseSource
{
	constructor()
	{
		super("jobs");

		this.sorting = "job_id";
		this.primaryKey = "job_id";

		this.connection = FormsModule.DATABASE;
	}

	public static async getTitle(id:string) : Promise<string>
	{
		let row:any[] = null;
		let stmt:SQLStatement = new SQLStatement("getJobTitle",true);

		stmt.addBindValue(new BindValue("job_id",id,DataType.string));

		let success:boolean = await stmt.execute(FormsModule.DATABASE);
		if (success) row = await stmt.fetch();

		stmt.close();
		if (row)	return(row[0]);

		return(null);
	}

	public static async getSalaryLimit(job:string) : Promise<number[]>
	{
		let limit:number[] = [0,0];
		let func:StoredProcedure = new StoredProcedure("getSalaryLimit");

		func.addParameter("job",job,DataType.varchar);
		func.addParameter("min",0,DataType.integer,ParameterType.out);
		func.addParameter("max",0,DataType.integer,ParameterType.out);

		let success:boolean = await func.execute(FormsModule.DATABASE);
		if (!success) console.log(func.error());

		if (success)
		{
			limit[0] = func.getValue("min");
			limit[1] = func.getValue("max");
		}

		return(limit);
	}
}