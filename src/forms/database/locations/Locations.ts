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
import { datasource, EventType } from "forms42core";
import { Countries } from '../../../datasources/database/Countries';
import { Locations as Locationdata } from "../../../datasources/database/Locations";

@datasource("Locations",Locationdata)

export class Locations extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "Locations";

		this.addEventListener(this.getCountryName,{type: EventType.OnFetch})
		this.addEventListener(this.getCountryName,{type: EventType.WhenValidateField, field: "country_id"})
	}

	public async getCountryName() : Promise<boolean>
	{
		let code:string = this.getValue("Locations","country_id");
		let country:string = await Countries.getName(code);
		this.setValue("Locations","country_name",country);
		return(true);
	}
}
