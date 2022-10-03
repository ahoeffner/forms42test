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

import content from './Simple.html';

import { BaseForm } from "../../../BaseForm";
import { Employees } from "../../../datasources/database/Employees";
import { Block, DatabaseResponse, datasource, EventType, FormEvent } from "forms42core";

@datasource("Employees",Employees)

export class Simple extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "Employees";
		this.addEventListener(this.test,{type: EventType.PostDelete})
	}

	public async test(event:FormEvent) : Promise<boolean>
	{
		let block:Block = this.getBlock(event.block);
		let response:DatabaseResponse = block.getRecord().response;
		console.log("delete returned: "+response.getValue("employee_id"));
		return(true);
	}
}