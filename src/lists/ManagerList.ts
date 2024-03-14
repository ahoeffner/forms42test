import { FormsModule } from "../FormsModule";
import { BindValue, ListOfValues, DatabaseSource, Custom } from "forms42core";

export class ManagerList extends ListOfValues
{
	public title:string = "Employees";

	public bindvalue: BindValue;
	public datasource: Employees;

	public sourcefields: string;
	public targetfields: string;
	public displayfields: string[];

	public inQueryMode:boolean = true;
	public inReadOnlyMode:boolean = true;

	constructor()
	{
		super();

		this.datasource = new Employees();
		this.bindvalue = this.datasource.employee;

		this.targetfields = "manager_id";
		this.sourcefields = "employee_id";
		this.displayfields = ["first_name","last_name"];
	}
}

class Employees extends DatabaseSource
{
	public employee:BindValue = new BindValue("name","");

	constructor()
	{
		super("employees");
		this.connection = FormsModule.DATABASE;

		this.addColumns(["employee_id","first_name","last_name"])
		this.sorting = "first_name, last_name";

		let contains:Custom = new Custom("contains");
		contains.addBindValue(this.employee);
		this.addFilter(contains);
	}
}