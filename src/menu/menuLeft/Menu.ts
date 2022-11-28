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

import { MenuData } from './MenuData';
import { MenuComponent } from 'forms42core';

export class Menu extends MenuComponent
{
	private displayed:boolean = false;
	private menuelem:HTMLElement = null;
	private container:HTMLElement = null;

	constructor()
	{
		super(new MenuData());

		this.menuelem = document.createElement("div");
		this.menuelem.classList.value = "left-menu-container";

		this.container = document.getElementById("main-menu");

		this.menuelem = this.container.appendChild(this.menuelem);
		this.target = this.menuelem;
	}

	public hide() : void
	{
		super.hide();
		this.menuelem.style.display = "none";
		this.container.style.minWidth = "0px";

		this.displayed = false;
	}

	public showmenu() : void
	{
		if (this.displayed)
		{
			super.hide();
			this.menuelem.style.display = "none";
			this.container.style.minWidth = "0px";
		}
		else
		{
			super.show();

			this.container.style.minWidth = "150px";
			this.container.style.animationDuration = "0.4s"
			this.container.style.animationTimingFunction = "ease-in";


			this.menuelem.style.display = "block";
			this.menuelem.style.animationDuration = "0.4s";
			this.menuelem.style.animationName = "moveInLeft";
			this.menuelem.style.animationTimingFunction = "ease-in";
		}

		this.displayed = !this.displayed;
	}
}