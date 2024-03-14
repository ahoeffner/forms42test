import { FormsModule } from "../FormsModule";
import { BindValue, ListOfValues, DatabaseSource, Custom } from "forms42core";

export class JobList extends ListOfValues
{
	public title:string = "Jobs";

	public datasource: Jobs;
	public bindvalue: BindValue;

	public sourcefields: string;
	public targetfields: string;
	public displayfields: string[];

	public inQueryMode:boolean = true;
	public inReadOnlyMode:boolean = true;

	constructor()
	{
		super();

		this.datasource = new Jobs();
		this.bindvalue = this.datasource.job;

		this.sourcefields = "job_id";
		this.targetfields = "job_id";
		this.displayfields = ["job_title"];
	}
}

class Jobs extends DatabaseSource
{
	public job:BindValue = new BindValue("job","");

	constructor()
	{
		super(FormsModule.DATABASE,"jobs");
		this.addColumns(["job_id","job_title"])

		let contains:Custom = new Custom("contains");
		contains.addBindValue(this.job);
		this.addFilter(contains);

		this.sorting = "job_title";
	}
}