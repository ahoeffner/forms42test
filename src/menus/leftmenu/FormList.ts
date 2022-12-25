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

import { FormsModule, StaticMenu, StaticMenuEntry } from "forms42core";

export class FormList extends StaticMenu
{
	constructor()
	{
		super(FormList.data());
	}

	public async execute(path:string): Promise<boolean>
	{
		await FormsModule.get().showform(path);
		return(true);
	}

	private static data() : StaticMenuEntry
	{
		return(
		{
			id: "demo",
			display: "Demo",
			entries:
			[
				{
					id: "countries",
					display: "Countries",
					command: "/forms/countries"
				}
				,
				{
					id: "locations",
					display: "Locations",
					command: "/forms/locations"
				}
				,
				{
					id: "jobs",
					display: "Jobs",
					command: "/forms/jobs"
				}
				,
				{
					id: "departments",
					display: "Departments",
					command: "/forms/departments"
				}
				,
				{
					id: "employees",
					display: "Employees",
					command: "/forms/employees"
				}
				,
				{
					id: "masterdetail",
					display: "MasterDetail",
					command: "/forms/masterdetail"
				}
				,
				{
					id: "nobase",
					display: "Database less",
					entries:
					[
						{
							id: "phonebook",
							display: "1 Phone Book",
							command: "/forms/PhoneBook"
						}
						,
						{
							id: "fields",
							display: "2 Fieldtypes",
							command: "/forms/Fields"
						}
					]
				}
			]
		});
	}
}