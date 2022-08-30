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
import { Employees } from "../../datasources/memory/Employees";
import { EventType, Filters, Filter, Block } from 'forms42core';

export class PhoneBook extends BaseForm
{
	//@datasource(Employees)
	public emp:Block = null;
	private filter:Filter = null;

	constructor()
	{
		super(content);
		this.title = "PhoneBook";
		this.filter = Filters.Contains("first_name, last_name");

		this.addEventListener(this.start,{type: EventType.PostViewInit});
		this.addEventListener(this.search,{type: EventType.OnTyping, block: "search", field: "filter"});
	}

	public sort(column:string) : void
	{
		this.emp.datasource.sorting = column;
		this.emp.executeQuery(this.emp.filters);
	}

	public async start() : Promise<boolean>
	{
		this.emp = this.getBlock("Employees");
		this.emp.datasource = Employees.get();

		await this.emp.executeQuery();
		return(true);
	}

	public async search() : Promise<boolean>
	{
		this.filter.contraint = this.getValue("search","filter");
		await this.emp.executeQuery(this.filter);
		return(true);
	}
}