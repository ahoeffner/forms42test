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

import { Minimized } from './Minimized';
import { Menu } from './menu/menuLeft/Menu';
import { TopBar } from './menu/menuTop/TopBar';
import { FormHeader } from './fragments/FormHeader';
import { PageHeader } from './fragments/PageHeader';
import { PageFooter } from './fragments/PageFooter';

import { Fields } from './fields/Fields';
import { Jobs } from './forms/jobs/Jobs';
import { Countries } from './forms/countries/Countries';
import { Locations } from './forms/locations/Locations';
import { Employees } from './forms/employees/Employees';
import { MasterDetail } from './forms/masterdetail/MasterDetail';
import { PhoneBookMembased } from './forms/phonenook/PhoneBookMembased';

import { AppHeader } from './tags/AppHeader';
import { LinkMapper } from './fields/LinkMapper';
import { TrueFalseMapper } from './fields/TrueFalseMapper';

import { FormsPathMapping, FormsModule as FormsCoreModule, KeyMap, FormEvent, EventType, DatabaseConnection as Connection, FormProperties, BuiltIns, KeyCodes } from 'forms42core';

@FormsPathMapping(
	[
		{class: Fields, path: "/forms/fields"},

		{class: Jobs, path: "/forms/jobs"},
		{class: Countries, path: "/forms/countries"},
		{class: Locations, path: "/forms/locations"},
		{class: Employees, path: "/forms/employees"},
		{class: MasterDetail, path: "/forms/masterdetail"},

		{class: PhoneBookMembased, path: "/forms/phonebook"},

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
	public topBar:TopBar = null;

	public list:Minimized = null;
	public static DATABASE:Connection = null;

	private jobs:KeyMap = new KeyMap({key: 'J', ctrl: true});
	private fields:KeyMap = new KeyMap({key: 'F', ctrl: true});
	private countries:KeyMap = new KeyMap({key: 'C', ctrl: true});
	private locations:KeyMap = new KeyMap({key: 'L', ctrl: true});
	private phonebook:KeyMap = new KeyMap({key: 'P', ctrl: true});
	private employees:KeyMap = new KeyMap({key: 'E', ctrl: true});
	private masterdetail:KeyMap = new KeyMap({key: 'M', ctrl: true});

	constructor()
	{
		super();

		// Demo cutom tag
		FormProperties.TagLibrary.set("AppHeader",AppHeader);

		this.parse();
		this.list = new Minimized();

		// Menues
		this.menu = new Menu();
		this.topBar = new TopBar();

		this.OpenURLForm();
		this.updateKeyMap(keymap);
		this.addEventListener(this.onLogon,{type: EventType.Connect})

		Connection.TRXTIMEOUT = 240;
		Connection.CONNTIMEOUT = 120;

		FormsModule.DATABASE = new Connection("http://localhost:9002");
		FormsModule.DATABASE.connect("hr","hr");

		this.addEventListener(this.login,{type: EventType.Key, key: keymap.login});

		this.addEventListener(this.open,
		[
			{type:EventType.Key,key:this.jobs},
			{type:EventType.Key,key:this.fields},
			{type:EventType.Key,key:this.countries},
			{type:EventType.Key,key:this.locations},
			{type:EventType.Key,key:this.phonebook},
			{type:EventType.Key,key:this.employees},
			{type:EventType.Key,key:this.masterdetail}
		]);
	}

	private async open(event:FormEvent) : Promise<boolean>
	{
		if (event.key == this.jobs)
			this.showform(Jobs);

		if (event.key == this.fields)
			this.showform(Fields);

		if (event.key == this.employees)
			this.showform(Employees);

		if (event.key == this.countries)
			this.showform(Countries);

		if (event.key == this.locations)
			this.showform(Locations);

		if (event.key == this.phonebook)
			this.showform(PhoneBookMembased);

		if (event.key == this.masterdetail)
			this.showform(MasterDetail);

		return(true);
	}

	private async onLogon() : Promise<boolean>
	{
		console.log("logon");
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
	public static login:KeyMap = new KeyMap({key: 'C', alt: true});
}