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
import { datasource, EventType, FormEvent, ListOfValues } from "forms42core";
import { Locations as Locationdata } from "../../../datasources/database/Locations";

@datasource("Locations",Locationdata)

export class Locations extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "Locations";

		let lov:ListOfValues = Countries.getCountryLov();
		this.setListOfValues("Locations","country_id",lov);

		this.addEventListener(this.setCountryName,{type: EventType.OnFetch})
		this.addEventListener(this.setCountryName,{type: EventType.WhenValidateField, field: "country_id"})
	}

	public async setCountryName(event:FormEvent) : Promise<boolean>
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
