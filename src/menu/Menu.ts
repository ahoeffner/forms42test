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

import { Forms } from './Forms';
import { MenuHandler } from 'forms42core';

export class Menu extends MenuHandler
{
	private displayed:boolean = false;
	private static menuelem:HTMLElement = null;

	private static setup() : HTMLElement
	{
		let container:HTMLElement = null;

		Menu.menuelem = document.createElement("div");
		Menu.menuelem.classList.value = "left-menu-container";

		container = document.getElementById("main-menu");
		Menu.menuelem = container.appendChild(Menu.menuelem);

		return(Menu.menuelem);
	}

	constructor()
	{
		super(new Forms(),Menu.setup());
	}

	public hide() : void
	{
		super.hide();
		this.displayed = false;
		Menu.menuelem.style.display = "none";
	}

	public showmenu() : void
	{
		if (this.displayed)
		{
			super.hide();
			Menu.menuelem.style.display = "none";
		}
		else
		{
			super.show();
			Menu.menuelem.style.display = "block";
		}

		this.displayed = !this.displayed;
	}
}