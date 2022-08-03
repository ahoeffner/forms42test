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
import { Employees } from './Employees';
import { EventType, FormEvent, DefaultProperties, FieldProperties } from 'forms42core';

export class PhoneBook extends BaseForm
{
	private nameprops:DefaultProperties = null;
	private managerprops:FieldProperties = null;
	private emp:Employees = new Employees(this,"employees");

	constructor()
	{
		super(content);
		this.title = "PhoneBook";
		this.addEventListener(this.fetch,{type: EventType.OnFetch});
		this.addEventListener(this.start,{type: EventType.PostViewInit});
		this.addEventListener(this.search,{type: EventType.OnTyping, block: "search", field: "filter"});
	}

	public async start() : Promise<boolean>
	{
		this.focus();

		this.nameprops = this.getBlock("Employees").getFieldById("first_name","fn1")?.getDefaultProperties();
		this.managerprops = new FieldProperties(this.nameprops);
		this.managerprops.setClass("green");

		await this.getBlock("Employees").executeQuery();
		return(true);
	}

	public async search() : Promise<boolean>
	{
		console.log("search "+this.getValue("search","filter",true));
		return(true);
	}

	public async fetch(event:FormEvent) : Promise<boolean>
	{
		if (event.block == "employees")
		{
			let fname:string = this.emp.getValue("first_name");
			if (fname == "Lex") this.emp.getRecord().setProperties(this.managerprops,"first_name");
			console.log(fname);
		}

		return(true);
	}
}