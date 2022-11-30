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

import { BindValue, Block, Filter, Filters, FilterStructure, Form, ListOfValues } from "forms42core";
import { Countries as CountryTable } from "../datasources/database/Countries";

export class Countries extends Block
{
	constructor(form:Form, name:string)
	{
		super(form,name);
		this.datasource = new CountryTable();
	}

	public static async getCountryName(id:string) : Promise<string>
	{
		return(CountryTable.getName(id));

	}

	public static getCountryLov() : ListOfValues
	{
		let source:CountryTable = null;
		let bindvalues:BindValue[] = [];
		let filter:FilterStructure = null;

		let idflt:Filter = Filters.ILike("country_id");
		let nameflt:Filter = Filters.ILike("country_name");

		filter = new FilterStructure().and(idflt).or(nameflt);
		source = new CountryTable().addFilter(filter);

		bindvalues.push(idflt.getBindValue());
		bindvalues.push(nameflt.getBindValue());

		let lov:ListOfValues =
		{
			filterPostfix: "%",
			datasource: source,
			title: "Countries",
			bindvalue: bindvalues,
			displayfields: "country_name",
			filterInitialValueFrom: "country_name",
			sourcefields: ["country_id","country_name"],
			targetfields: ["country_id","country_name"],
		}

		return(lov);
	}
}