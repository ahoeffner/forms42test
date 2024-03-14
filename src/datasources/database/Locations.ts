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
import { BindValue, DatabaseSource, DataType, Like, SQLStatement } from "forms42core";

export class Locations extends DatabaseSource
{
	constructor()
	{
		super("locations");

		this.sorting = "loc_id";
		this.primaryKey = "loc_id";
		this.addColumns("country_id");

		this.connection = FormsModule.DATABASE;
	}

	public static async getLocation(loc_id:number) : Promise<string>
	{
		let row:any[] = null;

		let stmt:SQLStatement = new SQLStatement("getLocationName",true);
		stmt.addBindValue(new BindValue("loc_id",loc_id,DataType.smallint));

		let success:boolean = await stmt.execute(FormsModule.DATABASE);
		if (success) row = await stmt.fetch();

		stmt.close();
		if (row)	return(row[0]);

		return(null);
	}
}