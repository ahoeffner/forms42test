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

import { QueryFunction as Type, DataSource, Filter, Filters, BindValue } from "forms42core";

export class QueryFunction implements Type
{
	private filter:Filter;
	private bind:BindValue;

	constructor(source:DataSource, fields:string|string[])
	{
		this.filter = Filters.Contains(fields);

		source.addFilter(this.filter);
		this.bind = this.filter.getBindValues()[0];
	}

	query(criteria: string): boolean
	{
		this.bind.value = criteria;
		return(true);
	}
}