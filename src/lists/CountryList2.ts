import { FormsModule } from "../FormsModule";
import { BindValue, Filter, FilterStructure, Filters, ListOfValues, QueryTable } from "forms42core";

export class CountryList implements ListOfValues
{
	public title:string = "Countries";

	public datasource: Countries;
	public bindvalue: BindValue[];

	public sourcefields: string;
	public targetfields: string;
	public displayfields: string[];

	public inQueryMode:boolean = true;
	public inReadOnlyMode:boolean = true;

	constructor()
	{
		this.datasource = new Countries();

		this.sourcefields = "country_id";
		this.targetfields = "country_id";
		this.displayfields = ["country_id","country_name"];

		this.bindvalue = [];
		let filter:FilterStructure = null;

		let idflt:Filter = Filters.ILike("country_id");
		let nameflt:Filter = Filters.ILike("country_name");

		filter = new FilterStructure().and(idflt).or(nameflt);
		this.datasource.addFilter(filter);

		this.bindvalue.push(idflt.getBindValue());
		this.bindvalue.push(nameflt.getBindValue());
	}
}

class Countries extends QueryTable
{
	constructor()
	{
		super(FormsModule.DATABASE);

		this.sql =
		`
			select country_id, country_name from countries
		`;

		this.sorting = "country_id";
	}
}