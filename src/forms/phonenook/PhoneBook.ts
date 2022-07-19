
import content from './phonebook.html';
import { BaseForm } from '../BaseForm';
import { EventType } from 'forms42core';

export class PhoneBook extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "PhoneBook";
		this.addEventListener(this.initPhoneBook,{type: EventType.PostViewInit});
	}

	public async initPhoneBook() : Promise<boolean>
	{
		//this.getBlock("Employees").executeQuery()
		return(true);
	}
}