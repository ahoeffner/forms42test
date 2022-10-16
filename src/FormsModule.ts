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
import { FormHeader } from './html/FormHeader';
import { PageHeader } from './html/PageHeader';
import { PageFooter } from './html/PageFooter';

import { Fields } from './fields/Fields';
import { Jonas } from './memory/forms/jonas/jonas';
import { Simple } from './database/forms/simple/Simple';
import { SimpleMembased } from './memory/forms/simple/SimpleMembased';
import { MasterDetail } from './database/forms/masterdetail/MasterDetail';
import { PhoneBookMembased } from './memory/forms/phonenook/PhoneBookMembased';
import { MasterDetailMembased } from './memory/forms/masterdetail/MasterDetailMembased';

import { LanguageLabel } from './tags/LanguageLabels';

import { LinkMapper } from './fields/LinkMapper';
import { TrueFalseMapper } from './fields/TrueFalseMapper';

import { FormsPathMapping, FormsModule as FormsCoreModule, KeyMap, FormEvent, EventType, DatabaseConnection as Connection, FormProperties, BuiltIns, KeyCodes } from 'forms42core';

@FormsPathMapping(
	[
		{class: Fields, path: "/forms/fields"},
		{class: Jonas, path: "/forms/memory/jonas"},

		{class: SimpleMembased, path: "/forms/memory/simple"},
		{class: PhoneBookMembased, path: "/forms/memory/phonebook"},
		{class: MasterDetailMembased, path: "/forms/memory/masterdetail"},

		{class: Simple, path: "/forms/database/simple"},
		{class: MasterDetail, path: "/forms/database/masterdetail"},

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

	private jonas:KeyMap = new KeyMap({key: 'j', ctrl: true})
	private dbform:KeyMap = new KeyMap({key: 'd', ctrl: true})
	private nocode:KeyMap = new KeyMap({key: 'n', ctrl: true})
	private fields:KeyMap = new KeyMap({key: 'f', ctrl: true})
	private phonebook:KeyMap = new KeyMap({key: 'p', ctrl: true})
	private masterdetail:KeyMap = new KeyMap({key: 'm', ctrl: true})

	public static bootstrap() : void {new FormsModule();}

	constructor()
	{
		super();

		this.parse();
		this.menu = new Menu();
		this.list = new Minimized();

		FormProperties.TagLibrary.set("bklabel",LanguageLabel);

		this.OpenURLForm();
		this.updateKeyMap(keymap);

		FormsModule.DATABASE = new Connection("database","http://localhost:9002");
		FormsModule.DATABASE.connect("hr","hr");

		this.addEventListener(this.login,{type: EventType.Key, key: keymap.login});
		this.addEventListener(this.commit,{type: EventType.Key, key: keymap.commit});
		this.addEventListener(this.rollback,{type: EventType.Key, key: keymap.rollback});

		this.addEventListener(this.open,
		[
			{type:EventType.Key,key:this.jonas},
			{type:EventType.Key,key:this.fields},
			{type:EventType.Key,key:this.nocode},
			{type:EventType.Key,key:this.dbform},
			{type:EventType.Key,key:this.phonebook},
			{type:EventType.Key,key:this.masterdetail}
		]);
	}

	private async open(event:FormEvent) : Promise<boolean>
	{
		if (event.key == this.jonas)
			this.showform(Jonas);

		if (event.key == this.nocode)
			this.showform(SimpleMembased);

		if (event.key == this.fields)
			this.showform(Fields);

		if (event.key == this.phonebook)
			this.showform(PhoneBookMembased);

		if (event.key == this.masterdetail)
			this.showform(MasterDetail);

		if (event.key == this.dbform)
			this.showform(Simple);

		return(true);
	}

	private async login() : Promise<boolean>
	{
		BuiltIns.callUsernamePasswordForm();
		return(true);
	}

	private async commit() : Promise<boolean>
	{
		let succces:boolean = await FormsModule.DATABASE.commit();
		this.message("Transactions comitted "+succces,"Demo Application");
		return(true);
	}

	private async rollback() : Promise<boolean>
	{
		let succces:boolean = await FormsModule.DATABASE.rollback();
		this.message("Transactions rolled back "+succces,"Demo Application");
		return(true);
	}
}

export class keymap extends KeyMap
{
	public static commit:KeyMap = new KeyMap({key: KeyCodes.f10});
	public static login:KeyMap = new KeyMap({key: 'C', ctrl: true});
	public static rollback:KeyMap = new KeyMap({key: KeyCodes.f10, shift: true});
}