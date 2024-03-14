import { FormsModule } from "../FormsModule";
import { BindValue, ListOfValues, DatabaseSource, Custom } from "forms42core";

export class DepartmentsList extends ListOfValues
{
	public title:string = "Departments";

	public bindvalue: BindValue;
	public datasource: Departments;

	public sourcefields: string;
	public targetfields: string;
	public displayfields: string;

	public inQueryMode:boolean = true;
	public inReadOnlyMode:boolean = true;

	constructor()
	{
		super();

		this.datasource = new Departments();
		this.bindvalue = this.datasource.department;

		this.sourcefields = "department_id";
		this.targetfields = "department_id";
		this.displayfields = "department_name";
	}
}

class Departments extends DatabaseSource
{
	public department:BindValue = new BindValue("department","");

	constructor()
	{
		super(FormsModule.DATABASE,"departments");
		this.addColumns(["department_id","department_name"])

		let contains:Custom = new Custom("contains");

		contains.addMapping("value","department");
		contains.addMapping("column","department_name");

		contains.addBindValue(this.department);
		this.addFilter(contains);
	}
}