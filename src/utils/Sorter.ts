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

import { Block } from "forms42core";

export class Sorter
{
	private asc$:boolean = true;
	private column$:string = null;

	constructor(private block:Block, column?:string)
	{
		this.column$ = column;
	}

	public set column(column:string)
	{
		if (column == this.column$) this.asc$ = !this.asc$;
		else {this.column$ = column; this.asc$ = true}

		if (!this.block.empty())
		{
			this.block.datasource.sorting = this.order;
			this.block.reQuery();
		}
	}

	public get order() : string
	{
		let sort:string = this.column$;
		sort += (this.asc$) ? "" : " desc";
		return(sort);
	}
}