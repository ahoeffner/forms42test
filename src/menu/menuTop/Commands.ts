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

import { StaticMenu, StaticMenuEntry } from "forms42core";

export class Commands extends StaticMenu
{
	constructor()
	{
		super(Commands.data());
	}

	public async execute(path:string): Promise<boolean>
	{
		console.log(path);
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
							id:"excute",
							display:"Excute",
							command:"query/excute"	
						}
					]

				},
				{
					id:"record",
					display:"Record",
					command:"record"

				},
				{
					id: "transactions",
					display:"Transactions",
					entries:
					[
						{
							id:"comment",
							display:"Comment",
							command:"transactions/comment"
						},
						{
							id: "rollback",
							display:"Rollback",
							command:"transactions/rollback"
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
                            display:`Disconnect`,
                            command:"connection/disconnect"
                        }
                    ]
        		}
			
			]
		})
	}
}