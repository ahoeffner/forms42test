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

import { MemoryTable } from "forms42core";
import { Employees as EmployeesData } from "../../data/Employees";

export class Employees extends MemoryTable
{
	private static table:Employees = null;

	public static get() : Employees
	{
		if (Employees.table == null)
			Employees.table = new Employees();

		return(Employees.table);
	}

	constructor()
	{
		super(EmployeesData.columns,EmployeesData.data);
		this.sorting = "last_name, first_name";
	}
}