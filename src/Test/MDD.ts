import content from './MDD.html';

import { Countries } from "./Countries";
import { Locations } from './Locations';
import { Departments } from './Departments';
import { FormsModule } from '../FormsModule';
import { Form, datasource, Key, Function, DataType, ParameterType, Procedure } from "forms42core";

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


	public async testcall() : Promise<void>
	{
		let job:string = "SNRCONS";
		let proc:Procedure = new Procedure(FormsModule.DATABASE,"getSalaryLimit");

		proc.addParameter("job",job,DataType.varchar);
		proc.addParameter("MIN",0,DataType.integer,ParameterType.inout);
		proc.addParameter("max",0,DataType.integer,ParameterType.inout);

		let success:boolean = await proc.execute();
		console.log(success+" "+proc.getValue("mIn")+" "+proc.getValue("max"));

		let func:Function = new Function(FormsModule.DATABASE,"getCountry");

		func.addParameter("id","DK",DataType.varchar);
		func.addParameter("name","NA",DataType.varchar,ParameterType.inout);
		func.addOutParameter("date",DataType.date);

		func.returns("retval","date");
		success = await func.execute();

		console.log(success+" "+func.getValue("name")+" "+func.getValue("date")+" "+func.getReturnValue());
	}
}