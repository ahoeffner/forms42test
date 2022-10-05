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

import { Connections, DatabaseTable, DataType } from "forms42core";

export class Employees extends DatabaseTable
{
	constructor()
	{
		super(Connections.get("database"),"employees");

		this.primaryKey = "employee_id";
		this.sorting = "first_name, last_name";
		this.deleteReturnColumns = "hire_date";
	}
}