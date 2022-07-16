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

import { DataMapper, Tier } from "forms42core";

//Demo: Convert backend boolean to Y/N flag
export class LinkMapper implements DataMapper
{
	private link:HTMLAnchorElement = document.createElement("a");

	public getValue(tier:Tier) : any
	{
		if (tier == Tier.Backend) return(null);
		else					  return(this.link);
	}

	public setValue(tier:Tier, value:any) : void
	{
		if (tier == Tier.Backend)
		{
			if (value == null) value = "";

			if (!this.link.firstChild)
				this.link.append(document.createTextNode(""))

			let text:Node = this.link.firstChild;

			this.link.title = value;
			text.textContent = value;
			this.link.href = "https://"+value;
		}
	}

	public getIntermediateValue(tier:Tier) : string
	{
		return(this.getValue(tier)+"");
	}

	public setIntermediateValue(tier:Tier, value:string) : void
	{
		this.setValue(tier,value);
	}
}