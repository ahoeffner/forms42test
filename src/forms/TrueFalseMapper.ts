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
export class TrueFalseMapper implements DataMapper
{
	private value:{frontend:string, backend:string} = {frontend: null, backend: null};

	private static back2front:Map<string,string> = new Map<string,string>
	(
		[
			["true","Y"],
			["false","N"]
		]
	)

	private static front2back:Map<string,string> = new Map<string,string>
	(
		[
			["Y","true"],
			["N","false"]
		]
	)

	public getValue(tier:Tier) : any
	{
		if (tier == Tier.Backend) return(this.value.backend);
		else					  return(this.value.frontend);
	}

	public setValue(tier:Tier, value:any) : void
	{
		if (tier == Tier.Frontend)
		{
			this.value.frontend = value;
			this.value.backend = TrueFalseMapper.front2back.get(value);
		}
		else
		{
			this.value.backend = value;
			this.value.frontend = TrueFalseMapper.back2front.get(value);
		}
	}

	public getIntermediateValue(tier:Tier) : string
	{
		if (tier == Tier.Backend) return(this.value.backend);
		else 					  return(this.value.frontend);
	}

	public setIntermediateValue(tier:Tier, value:string) : void
	{
		if (tier == Tier.Backend)
		{
			this.value.backend = value;
			this.value.frontend = TrueFalseMapper.back2front.get(value);
		}
		else
		{
			this.value.frontend = value;
			this.value.backend = TrueFalseMapper.front2back.get(value);
		}
	}

	public toString() : string
	{
		return("value: ["+this.value.frontend+","+this.value.backend+"]")
	}
}