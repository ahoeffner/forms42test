import { Column } from "./columen";
import { Languaes } from "./Languaes";
import { CustomTag } from "forms42core";

export class Input implements CustomTag
{
    column:string = null;
    table: string = null;
    size:string = null;
    tabindex:string = null;

	parse(component: any, tag: HTMLElement, attr: string): string | HTMLElement | HTMLElement[]
	{
        if (tag.getAttribute("size")) this.size = tag.getAttribute("size").toLowerCase();
        if (tag.getAttribute("from")) this.table = tag.getAttribute("from").toLowerCase();
        if (tag.getAttribute("name")) this.column = tag.getAttribute("name").toLowerCase();
        if(tag.getAttribute("tabindex")) this.tabindex = tag.getAttribute("tabindex").toLowerCase();
        
        let input:HTMLElement = document.createElement("input");
        let columen:Column = Languaes.getColumn(this.table,this.column);
        
        Utils.copyAttributes(tag,input);

        input.setAttribute("from", this.table);
        
        if (columen) 
            input.setAttribute("name", columen.name);
    
        return(input);   
	}
}

export class Utils 
{
    constructor(){}

    public static copyAttributes(fr:Element,to:Element) : void
    {
      if (fr == null || to == null) return;
      let attrnames:string[] = fr.getAttributeNames();

      for (let an = 0; an < attrnames.length; an++)
        to.setAttribute(attrnames[an],fr.getAttribute(attrnames[an]));
    }

}