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

import content from './jonas.html';

import { BaseForm } from '../BaseForm';
import { Employees } from "../../datasources/memory/Employees";
import { EventType, Filters, Filter, Block, block, datasource, formevent } from 'forms42core';

@datasource("Employees",Employees)

export class Jonas extends BaseForm
{
	@block("employees")
	public emp:Block = null;
	private filter:Filter = null;

	constructor()
	{
		super(content);
		this.title = "PhoneBook";
		this.filter = Filters.Contains("first_name, last_name");
	}

	public sort(column:string) : void
	{
		this.emp.datasource.sorting = column;
		this.emp.executeQuery(this.emp.filters);
	}

	@formevent({type: EventType.PostViewInit})
	public async start() : Promise<boolean>
	{
		await this.emp.executeQuery();
		return(true);
	}

	@formevent({type: EventType.OnEdit, block: "search", field: "filter"})
	public async search() : Promise<boolean>
	{
		this.filter.constraint = this.getValue("search","filter");
		await this.emp.executeQuery(this.filter);
		return(true);
	}
}