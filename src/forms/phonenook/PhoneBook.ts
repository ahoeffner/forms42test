
import content from './phonebook.html';
import { BaseForm } from '../BaseForm';

export class PhoneBook extends BaseForm
{
	constructor()
	{
		super(content);
		this.title = "PhoneBook";
	}
}