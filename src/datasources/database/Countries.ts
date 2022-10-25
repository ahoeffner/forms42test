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

export class Countries extends DatabaseTable
{
	constructor()
	{
		super(FormsModule.DATABASE,"countries");

		this.rowlocking = true;
		this.sorting = "country_id";
		this.primaryKey = "country_id";
	}

	public static getCountryLov() : ListOfValues
	{
		let source:Countries = null;
		let bindvalues:BindValue[] = [];
		let filter:FilterStructure = null;

		let idflt:Filter = Filters.ILike("country_id");
		let nameflt:Filter = Filters.ILike("country_name");

		filter = new FilterStructure().and(idflt).or(nameflt);
		source = new Countries().addFilter(filter);

		bindvalues.push(idflt.getBindValue());
		bindvalues.push(nameflt.getBindValue());

		let lov:ListOfValues =
		{
			filterPostfix: "%",
			datasource: source,
			title: "Countries",
			bindvalue: bindvalues,
			displayfields: "country_name",
			filterInitialValueFrom: "country_name",
			sourcefields: ["country_id","country_name"],
			targetfields: ["country_id","country_name"],
		}

		return(lov);
	}

	public static async getName(code:string) : Promise<string>
	{
		let row:any[] = null;
		let stmt:SQLStatement = new SQLStatement(FormsModule.DATABASE);

		stmt.sql =
		`
			select country_name
			from countries
			where country_id = :code
		`;

		stmt.addBindValue(new BindValue("code",code,DataType.string));

		let success:boolean = await stmt.execute();
		if (success) row = await stmt.fetch();

		if (row)	return(row[0]);
		return(null);
	}
}