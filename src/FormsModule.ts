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

import { Menu } from './Menu';
import { Minimized } from './Minimized';
import { FormHeader } from './html/FormHeader';
import { PageHeader } from './html/PageHeader';
import { PageFooter } from './html/PageFooter';

import { Jonas } from './forms/jonas/jonas';
import { Fields } from './forms/fields/Fields';
import { Nocode } from './forms/nocode/Nocode';
import { PhoneBook } from './forms/phonenook/PhoneBook';
import { MasterDetail } from './forms/masterdetail/MasterDetail';

import { LinkMapper } from './forms/fields/LinkMapper';
import { TrueFalseMapper } from './forms/fields/TrueFalseMapper';

import { FormsPathMapping, FormsModule as FormsCoreModule, KeyCodes, KeyMap, FormEvent, EventType, Connections } from 'forms42core';

@FormsPathMapping(
	[
		Jonas,
		Fields,
		Nocode,
		PhoneBook,
		MasterDetail,
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

	private jonas:KeyMap = new KeyMap({key: 'j', ctrl: true})
	private nocode:KeyMap = new KeyMap({key: 'n', ctrl: true})
	private fields:KeyMap = new KeyMap({key: 'f', ctrl: true})
	private phonebook:KeyMap = new KeyMap({key: 'p', ctrl: true})
	private masterdetail:KeyMap = new KeyMap({key: 'm', ctrl: true})

	public static load() : void {new FormsModule();}

	constructor()
	{
		super();

		this.parse();
		this.menu = new Menu();
		this.list = new Minimized();

		this.OpenURLForm();
		this.updateKeyMap(keymap);

		Connections.create("database","http://localhost:9002");

		this.addEventListener(this.open,
		[
			{type:EventType.Key,key:this.jonas},
			{type:EventType.Key,key:this.fields},
			{type:EventType.Key,key:this.nocode},
			{type:EventType.Key,key:this.phonebook},
			{type:EventType.Key,key:this.masterdetail}
		]);
	}

	public async open(event:FormEvent) : Promise<boolean>
	{
		if (event.key == this.jonas)
			this.showform(Jonas);

		if (event.key == this.nocode)
			this.showform(Nocode);

		if (event.key == this.fields)
			this.showform(Fields);

		if (event.key == this.phonebook)
			this.showform(PhoneBook);

		if (event.key == this.masterdetail)
			this.showform(MasterDetail);

		return(true);
	}
}

export class keymap extends KeyMap
{
	public static test:KeyMap = new KeyMap({key: KeyCodes.Enter});
}