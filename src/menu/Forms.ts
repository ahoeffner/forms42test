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

	public async execute(path: string): Promise<boolean>
	{
		let pos:number = path.lastIndexOf('/');
		await FormsModule.get().showform(path.substring(pos+1));
		return(true);
	}

	 private static data() : StaticMenuEntry
	 {
		  return(
			{
				id: "forms",
				text: "forms",

				entries:
				[
					{
						id: "nocode",
						text: "1 Minimal",
						command: "/forms/Nocode"
					},
					{
						id: "phonebook",
						text: "2 Phone Book",
						command: "/forms/PhoneBook"
					},
					{
						id: "masterdetail",
						text: "3 Master Detail",
						command: "/forms/MasterDetail"
					},
					{
						id: "fields",
						text: "4 Fields with extensions",
						command: "/forms/Fields"
					}
			]
			});
	 }
}