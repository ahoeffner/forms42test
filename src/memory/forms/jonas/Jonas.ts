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

import { BaseForm } from '../../../BaseForm';
import { Employees } from "../../../datasources/memory/Employees";
import { EventType, Filters, Filter, Block, block, datasource, formevent, FormEvent, KeyMap, MouseMap } from 'forms42core';
import { dragDropTable } from './dragdrop';

@datasource("Employees",Employees)

export class Jonas extends BaseForm
{

	@block("employees")
	public emp:Block = null;
	private filter:Filter = null;
	private sorting:{column?:string, asc?:boolean} = {}

	constructor()
	{
		super(content);
		this.title = "PhoneBook";
		this.filter = Filters.Contains("first_name, last_name");
	}

	public async sort(column:string)
	{
		let asc:boolean = this.sorting.asc;
		let toogle:boolean = column == this.sorting.column;

		if (!toogle) asc = true;
		else asc = !this.sorting.asc;

		this.sorting.asc = asc;
		this.sorting.column = column;

		this.emp.datasource.sorting =
			column+" "+(this.sorting.asc ? "asc" : "desc");

		this.sorting.column = column;
		this.emp.executeQuery(true);
	}

	@formevent({type: EventType.PostViewInit})
	public async start() : Promise<boolean>
	{
		this.addEventListener(this.pick,
		[
			{type: EventType.Key, block: "calendar", key: KeyMap.enter},
			{type: EventType.Mouse, block: "calendar", mouse: MouseMap.dblclick}
		])

		for (let week = 2; week < 3; week++)
		{
			for (let day = 0; day < 7; day++)
				this.setValue("calendar",week+""+day,"d-"+week+""+day);
		}

		const column:HTMLTableElement = document.querySelector(".table")
		column.addEventListener('mousedown', (event) => new dragDropTable(column,
		{
			// Cells:".columen_cell",
			Cells:".cell",
			// Heading: ".columen_heading",
			Heading:".heading",
			// Rows:".columen_rows",
			Rows:".rows",
			// Click: ".columen_heading"
			Drag: ".heading"
		}).mouseDownHandler(event));

		await this.emp.executeQuery();
		return(true);
	}

	public async pick(event:FormEvent) : Promise<boolean>
	{
		console.log("Pick date: "+event.field)
		return(true);
	}

	@formevent({type: EventType.PreQuery, block: "employees"})
	public async setFilter() : Promise<boolean>
	{
		let value:any = this.getValue("search","filter");
		if (value) this.emp.filter.and(this.filter);
		else this.emp.filter.delete(this.filter);
		return(true);
	}

	@formevent({type: EventType.OnEdit, block: "search", field: "filter"})
	public async search() : Promise<boolean>
	{
		this.filter.constraint = this.getValue("search","filter");
		await this.emp.executeQuery(true);
		return(true);
	}

	public alert() : void
	{
		let msg:string =
		`
			Detter er en forholdsvis lang meddelelse
			Med en meget lang streng xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
		`;

		this.message(msg,"Test");
	}
}