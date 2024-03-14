import { FormsModule } from "../FormsModule";
import { BindValue, ListOfValues, DatabaseSource, Custom } from "forms42core";

export class LocationList extends ListOfValues
{
	public title:string = "Locations";

	public datasource: Locations;
	public bindvalue: BindValue;

	public sourcefields: string;
	public targetfields: string;
	public displayfields: string[];

	public inQueryMode:boolean = true;
	public inReadOnlyMode:boolean = true;

	constructor()
	{
		super();

		this.datasource = new Locations();
		this.bindvalue = this.datasource.loc;

		this.sourcefields = "loc_id";
		this.targetfields = "loc_id";
		this.displayfields = ["city","street_address"];
	}
}

class Locations extends DatabaseSource
{
	public loc:BindValue = new BindValue("location","");

	constructor()
	{
		super("locations");
		this.connection = FormsModule.DATABASE;

		this.addColumns(["job_id","city","street_address"])

		let contains:Custom = new Custom("contains");
		contains.addBindValue(this.loc);
		this.addFilter(contains);

		this.sorting = "city,street_address";
	}
}