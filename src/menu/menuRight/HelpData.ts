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
import {StaticMenu, StaticMenuEntry } from "forms42core";

export class HelpData extends StaticMenu
{
   
	constructor()
	{
		super(HelpData.data());
	}

    public async execute(path: string): Promise<boolean> 
    {
        await FormsModule.get().showform(path);
        return (false);
    }

    public static data() : StaticMenuEntry
    {
        return(
        {
            
            id:"help",
            display:"help",
            entries:
            [
                {
                    id:"insertrecord",
                    display:"F5 Insert Record",
                    command:"help/insertrecord"
                },
                {
                    id:"deleterecord",
                    display:"F6 Delete Record",
                },
                {
                    id:"enterquery",
                    display:"F7 Enter Query By Example",
                },
                {
                    id:"excutequery",
                    display:"F8 Excute Query",
                },
                {
                    id:"DataPicker",
                    display:"F9 DataPicker",
                },
                {
                    id:"record",
                    display:"Insert Record",
                }
            ]
            
        });
    }
}