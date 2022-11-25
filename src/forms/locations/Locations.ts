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

import { BaseForm } from "../../BaseForm";
import { Countries } from '../../blocks/Countries';
import { CountryNameFilter } from '../../bonus/CountryNameFilter';
import { Locations as Locationdata } from "../../datasources/database/Locations";
import { Block, datasource, EventType, formevent, FormEvent, ListOfValues } from "forms42core";

@datasource("Locations",Locationdata)

export class Locations extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "Locations";

		let lov:ListOfValues = Countries.getCountryLov();
		this.setListOfValues(lov,"Locations",["country_id","country_name"]);

		this.addEventListener(this.preQuery,{type: EventType.PreQuery})
	}

	public async preQuery() : Promise<boolean>
	{
		let loc:Block = this.getBlock("Locations")
		let country:string = loc.getValue("country_name");

		if (country != null)
		{
			loc.filter.delete("country_name");
			loc.filter.and(new CountryNameFilter("country_name").setConstraint(country));
		}

		return(true);
	}

	@formevent
	([
		{type: EventType.OnFetch},
		{type: EventType.WhenValidateField, field: "country_id"}
	])

	public async setCountryName(event:FormEvent) : Promise<boolean>
	{
		let code:string = this.getValue("Locations","country_id");
		let country:string = await Countries.getCountryName(code);

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
