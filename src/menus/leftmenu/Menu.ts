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

import { FormList } from './FormList';
import { MenuComponent } from 'forms42core';

export class Menu extends MenuComponent
{
	private displayed:boolean = false;
	private menuelem:HTMLElement = null;
	private container:HTMLElement = null;

	constructor()
	{
		super(new FormList());

		this.menuelem = document.createElement("div");
		this.menuelem.classList.value = "left-menu-container";

		this.container = document.getElementById("main-menu");

		this.menuelem = this.container.appendChild(this.menuelem);
		this.target = this.menuelem;
		super.show();

	}

	public hide() : void
	{
		this.displayed = false;
		this.container.style.minWidth = "0px";
		this.container.classList.remove("menu-left-open");
	}

	public togglemenu() : void
	{
		if (this.displayed)
		{
			this.container.style.minWidth = "0px";
			this.container.classList.remove("menu-left-open");
		}
		else
		{
			this.container.style.minWidth = "150px";
			this.container.classList.add("menu-left-open");
		}

		this.displayed = !this.displayed;
	}
}