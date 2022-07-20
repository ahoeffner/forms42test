import { Hook } from 'forms42core';
import content from './phonebook.html';
import { BaseForm } from '../BaseForm';
import { Employees } from '../../datasources/memory/Employees';

export class PhoneBook extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "PhoneBook";
		this.setDataSource("employees",new Employees());
		this.addRuntimeHook(this.start,Hook.AfterCreate);
	}

	public async start() : Promise<boolean>
	{
		this.focus();
		await this.getBlock("Employees").executeQuery();
		return(true);
	}
}