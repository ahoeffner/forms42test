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

import { Locations as LocationTable } from "../datasources/database/Locations";
import { BindValue, Block, Filter, Filters, FilterStructure, Form, ListOfValues } from "forms42core";

export class Locations extends Block
{
	constructor(form:Form, name:string)
	{
		super(form,name);
		this.datasource = new LocationTable();
	}

	public static getLocationLov() : ListOfValues
	{
		let source:LocationTable = null;
		let bindvalues:BindValue[] = [];
		let filter:FilterStructure = null;

		let cityflt:Filter = Filters.ILike("city");

		filter = new FilterStructure().and(cityflt);
		source = new LocationTable().addFilter(filter);

		bindvalues.push(cityflt.getBindValue());

		let lov:ListOfValues =
		{
			title: "Locations",
			filterPostfix: "%",
			datasource: source,

			inQueryMode: true,
			inReadOnlyMode: true,
			
			bindvalue: bindvalues,
			displayfields: ["city","street_address"],
			sourcefields: "loc_id",
			targetfields: "loc_id",
		}

		return(lov);
	}
}