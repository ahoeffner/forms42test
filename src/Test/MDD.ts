import content from './MDD.html';

import { Countries } from "./Countries";
import { Locations } from './Locations';
import { Departments } from './Departments';
import { FormsModule } from '../FormsModule';
import { Form, datasource, Key, StoredFunction, DataType, ParameterType, StoredProcedure } from "forms42core";

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
		let proc:StoredProcedure = new StoredProcedure("getSalaryLimit");

		proc.addParameter("job",job,DataType.varchar);
		proc.addParameter("MIN",0,DataType.integer,ParameterType.inout);
		proc.addParameter("max",0,DataType.integer,ParameterType.inout);

		let success:boolean = await proc.execute(FormsModule.DATABASE);
		console.log(success+" "+proc.getValue("mIn")+" "+proc.getValue("max"));

		let func:StoredFunction = new StoredFunction("getCountry");

		func.addParameter("id","DK",DataType.varchar);
		func.addParameter("name","NA",DataType.varchar,ParameterType.inout);
		func.addOutParameter("date",DataType.date);

		func.returns("retval","date");
		success = await func.execute(FormsModule.DATABASE);

		console.log(success+" "+func.getValue("name")+" "+func.getValue("date")+" "+func.getReturnValue());
	}
}