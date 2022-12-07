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
					id:"query",
					display:"Query",
					entries:
					[
						{
							id:"enter",
							display:"Enter",
							command:"query/enter"
						},
						{
							id:"execute",
							display:"Execute",
							command:"query/execute"
						},
						{
							id:"refine",
							display:"Refine",
							command:"query/refine"
						},
						{
							id:"advanced",
							display:"Advanced",
							command:"query/advanced"
						}
					]
				},
				{
					id:"record",
					display:"Record",
					entries:
					[
						{
							id:"insert",
							display: "Insert",
							command:"record/insert"
						},
						{
							id:"delete",
							display:"Delete",
							command:"record/delete"
						},
						{
							id:"refresh",
							display:"Refresh",
							command:"record/refresh"
						}
					]
				},
				{
					id: "transaction",
					display:"Transaction",
					entries:
					[
						{
							id:"commit",
							display:"Commit",
							command:"transaction/commit"
						},
						{
							id: "rollback",
							display:"Rollback",
							command:"transaction/rollback"
						},
					]
				},
				{
					id:"connection",
					display:`Connection`,
					entries:
					[
						{
								id:"connect",
								display:`Connect`,
								command:"connection/connect"
						},
						{
								id:"disconnect",
								disabled: true,
								display:`Disconnect`,
								command:"connection/disconnect"
						}
					]
        		}
			]
		})
	}
}