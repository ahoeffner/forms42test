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
import { EventType, FormEvent, Contains, Block, Alert, FieldProperties } from 'forms42core';

export class PhoneBook extends BaseForm
{
	public emp:Block = null;
	private filter:Contains = null;
	private warning:FieldProperties = null;

	constructor()
	{
		super(content);
		this.title = "PhoneBook";
		this.filter = new Contains(["first_name","last_name"]);

		this.addEventListener(this.test);
		this.addEventListener(this.start,{type: EventType.PostViewInit});
		this.addEventListener(this.search,{type: EventType.OnTyping, block: "search", field: "filter"});
		this.addEventListener(this.validate,{type: EventType.WhenValidateField, block: "employees"});
		this.addEventListener(this.onfetch,{type: EventType.OnFetch, block: "employees"});
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
		this.warning = this.emp.getDefaultPropertiesById("first_name","fn1").setClass("warning");

		await this.emp.executeQuery();
		return(true);
	}

	public async search() : Promise<boolean>
	{
		this.filter.value = this.getValue("search","filter");
		await this.emp.executeQuery(this.filter);
		return(true);
	}

	public async onfetch() : Promise<boolean>
	{
		if (this.emp.getValue("first_name") == "Vladimir")
			this.emp.getRecord().setProperties(this.warning,"first_name");

		return(true);
	}

	public async validate(event:FormEvent) : Promise<boolean>
	{
		if (event.field == "first_name" && this.emp.getValue(event.field) == "Vladimir")
			this.emp.getRecord().setProperties(this.warning,"first_name");

		if (event.field == "last_name" && this.emp.getValue(event.field) == "Putin")
		{
			Alert.warning("Putin family is 'personae non gratae'","Validation Error")
			return(false);
		}

		return(true);
	}

	public async test(event:FormEvent) : Promise<boolean>
	{
		//if (event.type == EventType.OnFetch)
			//console.log(EventType[event.type]+" "+event.block+" "+event.field+" "+this.emp.getValue("first_name"))
		return(true);
	}}