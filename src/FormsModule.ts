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
import { Countries } from './forms/Countries';
import { FormHeader } from './html/FormHeader';
import { PageHeader } from './html/PageHeader';
import { PageFooter } from './html/PageFooter';
import { FormsModule as FormsCoreModule, KeyMap, ModuleDefinition, Properties } from 'forms42core';

@ModuleDefinition(
    [
        {class: Countries, path: "/countries"},
        {class: FormHeader, path: "/html/formheader"},
        {class: PageHeader, path: "/html/pageheader"},
        {class: PageFooter, path: "/html/pagefooter"},
    ]
)

export class FormsModule extends FormsCoreModule
{
    public menu:Menu = null;
    public list:Minimized = null;

    public static load() : void {new FormsModule();}

    constructor()
    {
        super();
		Properties.AttributePrefix = "frm.";

        this.parse();
        this.menu = new Menu();
        this.list = new Minimized();

		KeyMap.update(keymap);
        this.getApplication().showform("/countries");
    }
}

export class keymap extends KeyMap
{
	public static Enter2:KeyMap = new KeyMap({key: 13});
}