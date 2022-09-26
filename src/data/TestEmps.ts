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

import { dates } from "forms42core";

export class Employees
{
	public static columns:string[] =
		[
			"employee_id", "first_name", "last_name","email","phone_number",
			"hire_date","job_id","salary","commission_pct","manager_id","department_id"
		];

	private static converted:boolean = false;

	public static get data() : any[][]
	{
		if (!Employees.converted)
		{
			Employees.converted = true;

			for (let i = 0; i < this.rawdata.length; i++)
				Employees.rawdata[i][5] = dates.parse(Employees.rawdata[i][5],"YYYY-MM-DD");
		}

		return(Employees.rawdata);
	}


	private static rawdata:any[][] =
	[
		["100"   , "Steven"      , "King"        , "SKING"    , "515.123.4567"       , "1987-06-17" , "AD_PRES"    , "24000.00" ,  null    , null     , "10"],
		["101"   , "Steven"      , "Kochhar"     , "NKOCHHAR" , "515.123.4568"       , "1989-09-21" , "AD_VP"      , "17000.00" ,  null    , "100"    , "20"],
	]
}