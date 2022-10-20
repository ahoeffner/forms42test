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

import content from './Locations.html';

import { BaseForm } from "../../../BaseForm";
import { Countries } from '../../../datasources/database/Countries';
import { Locations as Locationdata } from "../../../datasources/database/Locations";
import { datasource, EventType, Filters, FormEvent, ListOfValues, Case } from "forms42core";

@datasource("Locations",Locationdata)

export class Locations extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "Locations";

		let lov:ListOfValues =
		{
			filterPostfix: "%",
			filterCase: Case.initcap,
			datasource: new Countries(),
			displayfields: "country_name",
			filter: Filters.Like("country_name"),
			sourcefields: ["country_id","country_name"],
			targetfields: ["country_id","country_name"],
		}

		this.setListOfValues("Locations","country_id",lov);

		this.addEventListener(this.getCountryName,{type: EventType.OnFetch})
		this.addEventListener(this.getCountryName,{type: EventType.WhenValidateField, field: "country_id"})
	}

	public async getCountryName(event:FormEvent) : Promise<boolean>
	{
		let code:string = this.getValue("Locations","country_id");
		let country:string = await Countries.getName(code);
		this.setValue("Locations","country_name",country);

		if (event.type == EventType.WhenValidateField)
		{
			if (country == null)
			{
				this.warning("Invalid country code","Validation");
				return(false);
			}
		}

		return(true);
	}
}
