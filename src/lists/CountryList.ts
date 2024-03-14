import { FormsModule } from "../FormsModule";
import { BindValue, ListOfValues, DatabaseSource, CustomEvent, Custom } from "forms42core";

export class CountryList extends ListOfValues
{
	public title:string = "Countries";

	public datasource: Countries;
	public bindvalue: BindValue;

	public sourcefields: string;
	public targetfields: string;
	public displayfields: string[];

	public inQueryMode:boolean = true;
	public inReadOnlyMode:boolean = true;
	public filterInitialValueFrom = "country_id";

	constructor()
	{
		super();

		this.datasource = new Countries();
		this.bindvalue = this.datasource.country;

		this.sourcefields = "country_id";
		this.targetfields = "country_id";
		this.displayfields = ["country_id","country_name"];
	}
}

class Countries extends DatabaseSource
{
	public country:BindValue = new BindValue("country","");

	constructor()
	{
		super("countries");
		this.connection = FormsModule.DATABASE;

		this.addColumns(["country_id","country_name"])

		let contains:Custom = new Custom("contains");
		contains.addBindValue(this.country);
		this.addFilter(contains);
	}
}