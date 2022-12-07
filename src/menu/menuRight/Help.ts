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

import { HelpData } from './HelpData';
import { MenuComponent } from 'forms42core';

export class Help extends MenuComponent
{
	private displayed:boolean = false;
	private menuelem:HTMLElement = null;
	private container:HTMLElement = null;

	constructor()
	{
		super(new HelpData());

        this.options.skiproot = true;
		this.menuelem = document.createElement("div");
		this.menuelem.classList.value = "info-dropdown";

		this.container = document.getElementById("info");
		this.menuelem = this.container.appendChild(this.menuelem);
        console.log(this.menuelem)
		this.target = this.menuelem;
	}

	public hide() : void
	{
		super.hide();
        this.menuelem.style.display = "none";
		this.container.style.display = "none";
		this.displayed = false;
	}

	public togglemenu() : void
	{
		if (this.displayed)
		{
			super.hide();
            this.menuelem.style.display = "none";
			this.container.style.display = "none";
		}
		else
		{
			super.show();
            this.menuelem.style.display = "block";
			this.container.style.display = "block";
		
		}

		this.displayed = !this.displayed;
	}
}