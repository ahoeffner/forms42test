import { FormsModule } from "../FormsModule";
import { BindValue, ListOfValues, QueryTable } from "forms42core";

export class DepartmentsList implements ListOfValues
{
	public title:string = "Departments";

	public bindvalue: BindValue;
	public datasource: Departments;

	public displayfields: string;
	public sourcefields: string[];
	public targetfields: string[];

	public inQueryMode:boolean = true;
	public inReadOnlyMode:boolean = true;

	constructor()
	{
		this.datasource = new Departments();
		this.bindvalue = this.datasource.department;

		this.displayfields = "department_name";
		this.sourcefields = ["department_id","department_name"];
		this.targetfields = ["department_id","department_name"];
	}
}

class Departments extends QueryTable
{
	public department:BindValue = new BindValue("department","");

	constructor()
	{
		super(FormsModule.DATABASE);

		this.sql =
		`
			select department_id, department_name from departments
			where department_name ilike '%'||:department||'%'
		`;

		this.sorting = "department_id";
		this.addBindValue(this.department);
	}
}