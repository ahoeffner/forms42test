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

import { FormsModule } from "../../FormsModule";
import { KeyMap, StaticMenu, StaticMenuEntry } from "forms42core";

export class Commands extends StaticMenu
{
	constructor()
	{
		super(Commands.data());
	}

	public async execute(path:string): Promise<boolean>
	{
		path = path.toLowerCase();
		let parts:string[] = path.split("/");
		let module:FormsModule = FormsModule.get() as FormsModule;

		if (parts[0] == "form")
		{
			switch(parts[1])
			{
				case "clear" : module.sendkey(KeyMap.enterquery);	break;
				case "close" : module.close();							break;
			}
		}

		if (parts[0] == "query")
		{
			switch(parts[1])
			{
				case "enter" 		: module.sendkey(KeyMap.enterquery);	break;
				case "execute" 	: module.sendkey(KeyMap.executequery);	break;
				case "refine" 		: module.sendkey(KeyMap.lastquery);		break;
				case "advanced" 	: module.sendkey(KeyMap.queryeditor);	break;
			}
		}

		if (parts[0] == "record")
		{
			switch(parts[1])
			{
				case "insert" 		: module.sendkey(KeyMap.insert);		break;
				case "delete" 		: module.sendkey(KeyMap.delete);		break;
				case "refresh" 	: module.sendkey(KeyMap.refresh);	break;
			}
		}

		if (parts[0] == "transaction")
		{
			switch(parts[1])
			{
				case "commit" 		: module.sendkey(KeyMap.commit);		break;
				case "rollback" 	: module.sendkey(KeyMap.rollback);	break;
			}
		}

		if (parts[0] == "connection")
		{
			switch(parts[1])
			{
				case "connect" 	: module.login();		break;
				case "disconnect" : module.logout();	break;
			}
		}

		return(true);
	}

	public static data() : StaticMenuEntry
	{
		return(
		{
			id: "topbar",
			display: "topbar",
			entries:
			[
				{
					id: "form",
					disabled: true,
					display: "Form",
					entries:
					[
						{
							id: "clear",
							display: "Clear",
							hinttext: "shift-F4",
							command :"form/clear"
						},
						{
							id: "close",
							display: "Close",
							hinttext: "ctrl-w",
							command: "form/close"
						}
					]
				},
				{
					id: "query",
					disabled: true,
					display: "Query",
					entries:
					[
						{
							id: "enter",
							display: "Enter",
							hinttext: "F7",
							command: "query/enter"
						},
						{
							id: "execute",
							display: "Execute",
							hinttext: "F8",
							command: "query/execute"
						},
						{
							id: "refine",
							display: "Refine",
							hinttext: "shift-F7",
							command: "query/refine"
						},
						{
							id: "advanced",
							display: "Advanced",
							hinttext: "ctrl-F7",
							command: "query/advanced"
						}
					]
				},
				{
					id: "record",
					disabled: true,
					display: "Record",
					entries:
					[
						{
							id: "insert",
							display: "Insert",
							hinttext: "F5",
							command: "record/insert"
						},
						{
							id: "delete",
							display: "Delete",
							hinttext: "F6",
							command: "record/delete"
						},
						{
							id: "refresh",
							display: "Requery/Undo",
							hinttext: "ctrl-u",
							command: "record/refresh"
						}
					]
				},
				{
					disabled: true,
					id: "transaction",
					display: "Transaction",
					entries:
					[
						{
							id: "commit",
							display: "Commit",
							hinttext: "F10",
							command: "transaction/commit"
						},
						{
							id: "rollback",
							display: "Rollback",
							hinttext: "F12",
							command: "transaction/rollback"
						},
					]
				},
				{
					id: "connection",
					display:`Connection`,
					entries:
					[
						{
								id: "connect",
								display: "Connect",
								command: "connection/connect"
						},
						{
								disabled: true,
								id: "disconnect",
								display:"Disconnect",
								command: "connection/disconnect"
						}
					]
        		}
			]
		})
	}
}