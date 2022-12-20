/*
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 only, as
 * published by the Free Software Foundation.

 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 */

import { WorkDays } from '../dates/WorkDays';
import { Jobs } from '../datasources/database/Jobs';
import { Departments } from '../datasources/database/Departments';
import { Employees as EmployeeTable } from "../datasources/database/Employees";
import { BindValue, Block, DatabaseResponse, EventType, FieldProperties, Filter, Filters, FilterStructure, Form, formevent, FormEvent, Key, ListOfValues } from "forms42core";

export class Employees extends Block
{
	constructor(form:Form, name:string)
	{
		super(form,name);
		this.datasource = new EmployeeTable();
		this.setDateConstraint(new WorkDays(),"hire_date");
	}

	public getDepartmentsForeignKey() : Key
	{
		return(new Key(this.name,"department_id"));
	}

	@formevent({type: EventType.OnNewRecord})
	public async setDefaults() : Promise<boolean>
	{
		this.setValue("hire_date",new Date());
		return(true);
	}

	@formevent({type: EventType.OnFetch})
	public async getDerivedFields() : Promise<boolean>
	{
		let code:string = null;
		let title:string = null;
		let field:string = null;

		field = "job_title";

		if (this.getFieldNames().includes(field))
		{
			code = this.getValue("job_id");

			if (code != null)
				title = await Jobs.getTitle(code);

			this.setValue(field,title);
		}

		field = "department_name";

		if (this.getFieldNames().includes(field))
		{
			code = this.getValue("department_id");

			if (code != null)
				title = await Departments.getTitle(code);

			this.setValue(field,title);
		}

		return(true);
	}

	@formevent({type: EventType.WhenValidateField, field: "salary"})
	public async validateSalary() : Promise<boolean>
	{
		let code:string = this.getValue("job_id");
		let salary:number = this.getValue("salary");

		if (code == null || salary == null)
			return(true);

		let limit:number[] = await Jobs.getSalaryLimit(code);

		if (salary < limit[0]*0.75 || salary > 1.25*limit[1])
		{
			this.warning("Salary is out of range ("+(limit[0]*0.75)+" - "+(1.25*limit[1])+" ) ","Validate Salary");
			return(false);
		}

		if (salary < limit[0] || salary > limit[1])
		{
			let props:FieldProperties = null;
			this.form.warning("Salary should be between "+limit[0]+" and "+limit[1],"Validation");

			props = this.getRecord().getProperties("last_name");
			this.getRecord().setProperties(props.setStyle("color","deeppink"),"last_name");

			props = this.getRecord().getProperties("first_name");
			this.getRecord().setProperties(props.setStyle("color","deeppink"),"first_name");

			props = this.getRecord().getProperties("salary");
			this.getRecord().setProperties(props.setStyle("color","deeppink"),"salary");
		}
		else
		{
			this.getRecord().clearProperties("salary");
			this.getRecord().clearProperties("last_name");
			this.getRecord().clearProperties("first_name");
		}

		return(true);
	}

	@formevent({type: EventType.WhenValidateField, field: "job_id"})
	public async validateJob(event:FormEvent) : Promise<boolean>
	{
		let success:boolean = true;
		let field:string = "job_title";
		let code:string = this.getValue("job_id");

		if (code == null)
			return(false);

		let title:string = await Jobs.getTitle(code);

		if (this.getFieldNames().includes(field))
			this.setValue(field,title);

		if (event.type == EventType.WhenValidateField && !this.queryMode())
		{
			if (title == null)
			{
				this.form.warning("Invalid job code","Employees");
				return(false);
			}

			success = await this.validateSalary();
		}

		return(success);
	}

	@formevent({type: EventType.WhenValidateField, field: "department_id"})
	public async validateDepartment(event:FormEvent) : Promise<boolean>
	{
		let field:string = "department_name";
		let code:string = this.getValue("department_id");
		let title:string = await Departments.getTitle(code);

		if (code == null)
			return(false);

		if (this.getFieldNames().includes(field))
			this.setValue(field,title);

		if (event.type == EventType.WhenValidateField && !this.queryMode())
		{
			if (title == null)
			{
				this.form.warning("Invalid Department Id","Employees");
				return(false);
			}
		}

		return(true);
	}

	@formevent({type: EventType.PostInsert})
	public async setPrimaryKey() : Promise<boolean>
	{
		let response:DatabaseResponse = this.getRecord().response;
		this.setValue("employee_id",response.getValue("employee_id"));
		return(true);
	}

	public static getManagerLov() : ListOfValues
	{
		let source:Jobs = null;
		let bindvalues:BindValue[] = [];
		let filter:FilterStructure = null;

		let fnameflt:Filter = Filters.ILike("first_name");
		let lnameflt:Filter = Filters.ILike("last_name");

		filter = new FilterStructure().and(fnameflt).or(lnameflt);
		source = new EmployeeTable().addFilter(filter);

		bindvalues.push(fnameflt.getBindValue());
		bindvalues.push(lnameflt.getBindValue());

		let lov:ListOfValues =
		{
			title: "Employees",
			filterPostfix: "%",
			datasource: source,
			inReadOnlyMode: true,
			bindvalue: bindvalues,
			displayfields: ["first_name","last_name"],
			sourcefields: "employee_id",
			targetfields: "manager_id",
		}

		return(lov);
	}
}