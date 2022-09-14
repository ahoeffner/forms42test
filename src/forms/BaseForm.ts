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

import { FormsModule } from '../FormsModule';
import { Form, View, EventType } from 'forms42core';


export class BaseForm extends Form
{
	public id:string = null;
	private view:View = null;
	public title:string = null;
	private static forms:number = 0;

	constructor(content:string)
	{
		super(content);
		this.id = "f" + ++BaseForm.forms;
		this.addEventListener(this.oninit,{type: EventType.PostViewInit});
	}

	public async oninit() : Promise<boolean>
	{
		let px:number = 16;
		let off:number = BaseForm.forms % 8;

		let posX:number = off*px;
		let posY:number = off*px + 20;

		this.getView().style.top = posY + "px";
		this.getView().style.left = posX + "px";

		this.setTitle(this.title);
		return(true);
	}

	public toggle() : void
	{
		if (this.view == null)
		{
			this.view = this.getViewPort();
			let avail:View = this.getParentViewPort();

			avail.x = 0;
			avail.y = 0;
			avail.width = +avail.width - 2;
			avail.height = +avail.height - 2;

			this.setViewPort(avail);
		}
		else
		{
			this.setViewPort(this.view);
			this.view = null;
		}
	}

	public minimize() : void
	{
		let forms:FormsModule = FormsModule.get() as FormsModule;
		forms.list.add(this);
		this.hide();
	}

	public setTitle(title:string) : void
	{
		let header:HTMLElement = this.getView().querySelector("[name='title']");
		header.appendChild(document.createTextNode(title));
	}
}