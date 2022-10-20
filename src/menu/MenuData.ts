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

export class MenuData extends StaticMenu
{
	constructor()
	{
		super(MenuData.data());
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
						command: "/forms/database/countries"
					}
					,
					{
						id: "locations",
						display: "Locations",
						command: "/forms/database/locations"
					}
					,
					{
						id: "old",
						display: "Old",
						entries:
						[
							{
								id: "phonebook",
								display: "1 Phone Book",
								command: "/forms/memory/PhoneBook"
							}
							,
							{
								id: "fields",
								display: "2 Fields with extensions",
								command: "/forms/Fields"
							}
							,
							{
								id: "database",
								display: "Database based forms",
								entries:
								[
									{
										id: "simple",
										display: "1 Minimal",
										command: "/forms/database/simple"
									},
									{
										id: "masterdetail",
										display: "2 Master Detail",
										command: "/forms/database/MasterDetail"
									}
								]
							}
						]
					}
				]
			});
	 }
}