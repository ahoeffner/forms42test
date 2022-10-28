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

import { Menu } from './menu/Menu';
import { Minimized } from './Minimized';
import { FormHeader } from './fragments/FormHeader';
import { PageHeader } from './fragments/PageHeader';
import { PageFooter } from './fragments/PageFooter';

import { Fields } from './fields/Fields';

import { Input } from './tags/Input';
import { Languaes } from './tags/Languaes';

import { Simple } from './old/dbbased/simple/Simple';
import { DemoInput } from './old/filebased/demoinput/demoinput';
import { MasterDetail } from './old/dbbased/masterdetail/MasterDetail';
import { PhoneBookMembased } from './old/filebased/phonenook/PhoneBookMembased';

import { Countries } from './forms/database/countries/Countries';
import { Locations } from './forms/database/locations/Locations';
import { Employees } from './forms/database/employees/Employees';

import { LanguageLabel } from './tags/LanguageLabels';

import { LinkMapper } from './fields/LinkMapper';
import { TrueFalseMapper } from './fields/TrueFalseMapper';

import { FormsPathMapping, FormsModule as FormsCoreModule, KeyMap, FormEvent, EventType, DatabaseConnection as Connection, FormProperties, BuiltIns, KeyCodes } from 'forms42core';

@FormsPathMapping(
	[
		{class: Fields, path: "/forms/fields"},

		{class: PhoneBookMembased, path: "/forms/memory/phonebook"},

		{class: Simple, path: "/forms/database/simple"},
		{class: MasterDetail, path: "/forms/database/masterdetail"},

		{class: Countries, path: "/forms/database/countries"},
		{class: Locations, path: "/forms/database/locations"},
		{class: Employees, path: "/forms/database/employees"},

		{class: FormHeader, path: "/html/formheader"},
		{class: PageHeader, path: "/html/pageheader"},
		{class: PageFooter, path: "/html/pagefooter"},
		{class: LinkMapper, path: "/mappers/linkmapper"},
		{class: TrueFalseMapper, path: "/mappers/truefalse"},
	]
)

export class FormsModule extends FormsCoreModule
{
	public menu:Menu = null;
	public list:Minimized = null;
	public static DATABASE:Connection = null;

	private fields:KeyMap = new KeyMap({key: 'f', ctrl: true})
	private inputdemo:KeyMap = new KeyMap({key: 'd', ctrl: true})
	private phonebook:KeyMap = new KeyMap({key: 'p', ctrl: true})
	private employees:KeyMap = new KeyMap({key: 'e', ctrl: true})
	private masterdetail:KeyMap = new KeyMap({key: 'm', ctrl: true})

	public static bootstrap() : void {new FormsModule();}

	constructor()
	{
		super();

		this.parse();
		this.menu = new Menu();
		this.list = new Minimized();
		let keys:string[][] = KeyMap.list();
		for (let i = 0; i < keys.length; i++)
			console.log(keys[i][0]+": "+keys[i][1]+" ("+keys[i][2]+")")
		

		Languaes.setLanguaes("Book1.xml");
		
		FormProperties.TagLibrary.set("BKinput",Input);

		this.OpenURLForm();
		this.updateKeyMap(keymap);

		FormsModule.DATABASE = new Connection("database","http://localhost:9002");
		FormsModule.DATABASE.connect("hr","hr");

		this.addEventListener(this.login,{type: EventType.Key, key: keymap.login});

		this.addEventListener(this.open,
		[
			{type:EventType.Key,key:this.fields},
			{type:EventType.Key,key:this.inputdemo},
			{type:EventType.Key,key:this.phonebook},
			{type:EventType.Key,key:this.employees},	
		]);
	}

	private async open(event:FormEvent) : Promise<boolean>
	{
		if (event.key == this.fields)
			this.showform(Fields);

		if (event.key == this.employees)
			this.showform(Employees);

		if (event.key == this.phonebook)
			this.showform(PhoneBookMembased);

		if (event.key == this.masterdetail)
			this.showform(MasterDetail);
		
		if (event.key == this.inputdemo)
			this.showform(DemoInput);
		return(true);
	}

	private async login() : Promise<boolean>
	{
		BuiltIns.callUsernamePasswordForm();
		return(true);
	}
}

export class keymap extends KeyMap
{
	public static login:KeyMap = new KeyMap({key: 'C', ctrl: true});
}