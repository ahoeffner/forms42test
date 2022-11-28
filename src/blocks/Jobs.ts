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

import { Jobs as JobTable } from "../datasources/database/Jobs";
import { BindValue, Block, Filter, Filters, FilterStructure, Form, ListOfValues } from "forms42core";

export class Jobs extends Block
{
	constructor(form:Form, name:string)
	{
		super(form,name);
		this.datasource = new JobTable();
	}

	public static getJobLov() : ListOfValues
	{
		let source:JobTable = null;
		let bindvalues:BindValue[] = [];
		let filter:FilterStructure = null;

		let idflt:Filter = Filters.ILike("job_id");
		let titleflt:Filter = Filters.ILike("job_title");

		filter = new FilterStructure().and(idflt).or(titleflt);
		source = new JobTable().addFilter(filter);

		bindvalues.push(idflt.getBindValue());
		bindvalues.push(titleflt.getBindValue());

		let lov:ListOfValues =
		{
			title: "Jobs",
			inQueryMode: true,
			filterPostfix: "%",
			datasource: source,
			bindvalue: bindvalues,
			displayfields: "job_title",
			filterInitialValueFrom: "job_id",
			sourcefields: ["job_id","job_title"],
			targetfields: ["job_id","job_title"],
		}

		return(lov);
	}
}