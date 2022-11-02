import { Column } from "./Column";
import { CustomTag } from "forms42core";
import { Languages,Utils } from "./Languages";

export class Input implements CustomTag
{
    column:string = null;
    table: string = null;
    size:string = null;
    tabindex:string = null;

	parse(_component: any, tag: HTMLElement, _attr: string): string | HTMLElement | HTMLElement[]
	{
        if (tag.getAttribute("size")) this.size = tag.getAttribute("size").toLowerCase();
        if (tag.getAttribute("from")) this.table = tag.getAttribute("from").toLowerCase();
        if (tag.getAttribute("name")) this.column = tag.getAttribute("name").toLowerCase();
        if(tag.getAttribute("tabindex")) this.tabindex = tag.getAttribute("tabindex").toLowerCase();

        let input:HTMLElement = document.createElement("input");
        let columen:Column = Languages.getColumn(this.table,this.column);

        Utils.copyAttributes(tag,input);

        input.setAttribute("from", this.table);

        if (columen)
            input.setAttribute("name", columen.name);

        return(input);
	}
}
