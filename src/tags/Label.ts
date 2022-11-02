import { Column } from "./Column";
import { CustomTag } from "forms42core";
import { Languages, Utils } from "./Languages";

export class Label implements CustomTag
{
	public name:string = null;
	public table:string = null;
	public column:Column = null;
	public titlename:string = null;

	parse(_component: any, tag: HTMLElement, _attr: string): string | HTMLElement | HTMLElement[] | null
	{
		if(tag.getAttribute("name")) this.name = tag.getAttribute("name");
		if(tag.getAttribute("table")) this.table = tag.getAttribute("table");

		let label:HTMLElement = document.createElement("label");

		Utils.copyAttributes(tag,label);
		this.column = Languages.getColumn(this.table,this.name);

		if(this.column)
		{
			if(!this.column.hint)
			{
				let span:HTMLElement = document.createElement("span");

				span.textContent = this.column.hint;
				label.setAttribute("class","tooltip");
				span.setAttribute("class","tooltiptext-top");

				label.appendChild(span);
			}

			label.textContent = this.column.label;
		}
		else
		{
			label.textContent = "something went wrong";
		}

		return(label);
	}
}