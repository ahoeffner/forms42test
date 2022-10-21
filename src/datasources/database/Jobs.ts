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

export class Jobs extends DatabaseTable
{
	constructor()
	{
		super(FormsModule.DATABASE,"jobs");

		this.rowlocking = true;
		this.sorting = "country_id";
		this.primaryKey = "country_id";
	}

	public static getJobLov() : ListOfValues
	{
		let source:Jobs = null;
		let bindvalues:BindValue[] = [];
		let filter:FilterStructure = null;

		let idflt:Filter = Filters.ILike("job_id");
		let titleflt:Filter = Filters.ILike("job_title");

		filter = new FilterStructure().and(idflt).or(titleflt);
		source = new Jobs().addFilter(filter);

		bindvalues.push(idflt.getBindValue());
		bindvalues.push(titleflt.getBindValue());

		let lov:ListOfValues =
		{
			filterPostfix: "%",
			datasource: source,
			bindvalue: bindvalues,
			displayfields: "job_title",
			sourcefields: ["job_id","job_title"],
			targetfields: ["job_id","job_title"],
		}

		return(lov);
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
}