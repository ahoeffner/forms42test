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

export class Forms extends StaticMenu
{
	constructor()
	{
		super(Forms.data());
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
				id: "forms",
				display: "forms",

				entries:
				[
					{
						id: "nocode",
						display: "1 Minimal",
						command: "/forms/memory/simple"
					},
					{
						id: "phonebook",
						display: "2 Phone Book",
						command: "/forms/memory/PhoneBook"
					},
					{
						id: "masterdetail",
						display: "3 Master Detail",
						command: "/forms/memory/MasterDetail"
					},
					{
						id: "fields",
						display: "4 Fields with extensions",
						command: "/forms/Fields"
					}
					,
					{
						id: "database",
						display: "<b>Database based forms</b>",
						entries:
						[
							{
								id: "simple",
								display: "1 Minimal",
								command: "/forms/database/simple"
							}
						]
					}
			]
			});
	 }
}