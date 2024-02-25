import content from './MDD.html';

import { Countries } from "./Countries";
import { Locations } from './Locations';
import { Departments } from './Departments';
import { Form, datasource, Key } from "forms42core";

@datasource("Countries",Countries)
@datasource("Locations",Locations)
@datasource("Departments",Departments)

export class MDD extends Form
{
	constructor()
	{
		super(content);

		let mkey:Key = null;
		let dkey:Key = null;

		mkey = new Key("Countries","country_id");
		dkey = new Key("Locations","country_id");

		this.link(mkey,dkey);

		mkey = new Key("Locations","loc_id");
		dkey = new Key("Departments","loc_id");

		this.link(mkey,dkey);
	}
}