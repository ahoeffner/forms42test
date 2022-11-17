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

export class Locations extends DatabaseTable
{
	constructor()
	{
		super(FormsModule.DATABASE,"locations");

		this.sorting = "loc_id";
		this.primaryKey = "loc_id";
		this.addColumns("country_id");
	}

	public static async getLocation(loc_id:number) : Promise<string>
	{
		let row:any[] = null;
		let stmt:SQLStatement = new SQLStatement(FormsModule.DATABASE);

		stmt.sql =
		`
			select city||' '||street_address||' '||country_id
			from locations
			where loc_id = :loc_id
		`;

		stmt.addBindValue(new BindValue("loc_id",loc_id,DataType.smallint));

		let success:boolean = await stmt.execute();
		if (success) row = await stmt.fetch();

		if (row)	return(row[0]);
		return(null);
	}
}