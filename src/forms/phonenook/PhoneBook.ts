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
import { EventType, FormEvent, DefaultProperties, FieldProperties, Contains } from 'forms42core';

export class PhoneBook extends BaseForm
{
	private filter:Contains = null;
	private nameprops:DefaultProperties = null;
	private managerprops:FieldProperties = null;
	private emp:Employees = new Employees(this,"employees");

	constructor()
	{
		super(content);
		this.title = "PhoneBook";
		this.filter = new Contains(["first_name","last_name"]);

		this.addEventListener(this.test,{block: "employees"});
		this.addEventListener(this.start,{type: EventType.PostViewInit});
		this.addEventListener(this.fetch,{type: EventType.OnFetch, block: "employees"});
		this.addEventListener(this.search,{type: EventType.OnTyping, block: "search", field: "filter"});
		this.addEventListener(this.validate,{type: EventType.WhenValidateField, block: "employees"});
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

	public async test(event:FormEvent) : Promise<boolean>
	{
		//console.log(EventType[event.type]+" fname "+this.getValue("employees","first_name"));
		return(true);
	}

	public async search() : Promise<boolean>
	{
		this.filter.value = this.getValue("search","filter");
		await this.getBlock("Employees").executeQuery(this.filter);
		return(true);
	}

	public async fetch() : Promise<boolean>
	{
		let fname:string = this.emp.getValue("first_name");
		if (fname == "Lex") this.emp.getRecord().setProperties(this.managerprops,"first_name");
		return(true);
	}

	public async validate() : Promise<boolean>
	{
		let fname:string = this.emp.getValue("first_name");

		if (fname != "Lex") this.emp.getRecord().setProperties(null,"first_name");
		else				this.emp.getRecord().setProperties(this.managerprops,"first_name");

		return(true);
	}
}