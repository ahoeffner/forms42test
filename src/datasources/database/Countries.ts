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

import { BindValue, DatabaseTable, DataType, SQLStatement } from "forms42core";
import { FormsModule } from "../../FormsModule";

export class Countries extends DatabaseTable
{
	constructor()
	{
		super(FormsModule.DATABASE,"countries");

		this.rowlocking = true;
		this.sorting = "country_id";
		this.primaryKey = "country_id";
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

		return(row[0]);
	}
}