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

import content from './phonebook.html';
import { BaseForm } from '../BaseForm';
import { EventType } from 'forms42core';
import { Employees } from '../../datasources/memory/Employees';

export class PhoneBook extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "PhoneBook";
		this.setDataSource("employees",new Employees());
		this.addEventListener(this.start,{type: EventType.PostViewInit});
		this.addEventListener(this.search,{type: EventType.OnEditing, block: "search", field: "filter"});
	}

	public async start() : Promise<boolean>
	{
		this.focus();
		await this.getBlock("Employees").executeQuery();
		return(true);
	}

	public async search() : Promise<boolean>
	{
		console.log("search "+this.getValue("search","filter"))
		return(true);
	}
}