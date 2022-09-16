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

export class Departments
{
	public static columns:string[] =
	[
		"department_id","department_name","manager_id","location_id"
	];

	public static get data() : any[][]
	{
		return(Departments.rawdata);
	}

	private static rawdata:any[][] =
	[
		[10    , "Administration"       , 200    , 1700],
		[20    , "Marketing"            , 201    , 1800],
		[30    , "Purchasing"           , 114    , 1700],
		[40    , "Human Resources"      , 203    , 2400],
		[50    , "Shipping"             , 121    , 1500],
		[60    , "IT"                   , 103    , 1400],
		[70    , "Public Relations"     , 204    , 2700],
		[80    , "Sales"                , 145    , 2500],
		[90    , "Executive"            , 100    , 1700],
		[100   , "Finance"              , 108    , 1700],
		[110   , "Accounting"           , 205    , 1700],
		[120   , "Treasury"             , null   , 1700],
		[130   , "Corporate Tax"        , null   , 1700],
		[140   , "Control And Credit"   , null   , 1700],
		[150   , "Shareholder Services" , null   , 1700],
		[160   , "Benefits"             , null   , 1700],
		[170   , "Manufacturing"        , null   , 1700],
		[180   , "Construction"         , null   , 1700],
		[190   , "Contracting"          , null   , 1700],
		[200   , "Operations"           , null   , 1700],
		[210   , "IT Support"           , null   , 1700],
		[220   , "NOC"                  , null   , 1700],
		[230   , "IT Helpdesk"          , null   , 1700],
		[240   , "Government Sales"     , null   , 1700],
		[250   , "Retail Sales"         , null   , 1700],
		[260   , "Recruiting"           , null   , 1700],
		[270   , "Payroll"              , null   , 1700]
	]
}