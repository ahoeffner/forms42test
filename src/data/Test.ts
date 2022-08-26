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
		["100"   , "Steven"      , "King"        , "SKING"    , "515.123.4567"       , "1987-06-17" , "AD_PRES"    , "24000.00" ,  null    , null     , "90"],
		["101"   , "Neena"       , "Kochhar"     , "NKOCHHAR" , "515.123.4568"       , "1989-09-21" , "AD_VP"      , "17000.00" ,  null    , "100"    , "90"],
		["102"   , "Lex"         , "De Haan"     , "LDEHAAN"  , "515.123.4569"       , "1993-01-13" , "AD_VP"      , "17000.00" ,  null    , "100"    , "90"],
		["103"   , "Alexander"   , "Hunold"      , "AHUNOLD"  , "590.423.4567"       , "1990-01-03" , "IT_PROG"    , "9000.00"  ,  null    , "102"    , "60"],
		["104"   , "Bruce"       , "Ernst"       , "BERNST"   , "590.423.4568"       , "1991-05-21" , "IT_PROG"    , "6000.00"  ,  null    , "103"    , "60"],
		["105"   , "David"       , "Austin"      , "DAUSTIN"  , "590.423.4569"       , "1997-06-25" , "IT_PROG"    , "4800.00"  ,  null    , "103"    , "60"],
		["106"   , "Valli"       , "Pataballa"   , "VPATABAL" , "590.423.4560"       , "1998-02-05" , "IT_PROG"    , "4800.00"  ,  null    , "103"    , "60"],
		["107"   , "Diana"       , "Lorentz"     , "DLORENTZ" , "590.423.5567"       , "1999-02-07" , "IT_PROG"    , "4200.00"  ,  null    , "103"    , "60"],
		["108"   , "Nancy"       , "Greenberg"   , "NGREENBE" , "515.124.4569"       , "1994-08-17" , "FI_MGR"     , "12000.00" ,  null    , "101"    , "100"],
		["109"   , "Daniel"      , "Faviet"      , "DFAVIET"  , "515.124.4169"       , "1994-08-16" , "FI_ACCOUNT" , "9000.00"  ,  null    , "108"    , "100"],
		["110"   , "John"        , "Chen"        , "JCHEN"    , "515.124.4269"       , "1997-09-28" , "FI_ACCOUNT" , "8200.00"  ,  null    , "108"    , "100"],
		["111"   , "Ismael"      , "Sciarra"     , "ISCIARRA" , "515.124.4369"       , "1997-09-30" , "FI_ACCOUNT" , "7700.00"  ,  null    , "108"    , "100"],
	]
}