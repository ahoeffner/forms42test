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

import { Denmark } from './menu/Denmark';
import { MenuHandler } from 'forms42core';

export class Menu
{
    private menu:boolean = false;
	private handler:MenuHandler = null;
    private menuelem:HTMLElement = null;

    constructor()
    {
		this.menuelem = document.createElement("div");
		this.menuelem.classList.value = "left-menu-container";
        let container:HTMLElement = document.getElementById("main-menu");

		this.menuelem = container.appendChild(this.menuelem);
		this.handler = new MenuHandler(new Denmark(), this.menuelem);
    }

    public showmenu() : void
    {
        if (this.menu)
		{
			this.handler.hide();
			this.menuelem.style.display = "none";
		}
        else
		{
			this.handler.show();
			this.menuelem.style.display = "block";
		}

        this.menu = !this.menu;
    }
}