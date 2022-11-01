import { Column } from "./columen";
import { CustomTag } from "forms42core";
import { Languaes,Utils } from "./Languaes";

export class Label implements CustomTag
{
    public column:string = null;
    public table:string = null;
    public columen:Column = null;
    public titlename:string =null;
    parse(component: any, tag: HTMLElement, attr: string): string | HTMLElement | HTMLElement[] | null
    {
    
      if(tag.getAttribute("from")) this.table = tag.getAttribute("from");
      if(tag.getAttribute("name")) this.column = tag.getAttribute("name");

      let label:HTMLElement = document.createElement("label");

      Utils.copyAttributes(tag,label);
      this.columen = Languaes.getColumn(this.table,this.column);

      if(this.columen) 
      {
        if(!this.columen.hint)
        {
          let span:HTMLElement = document.createElement("span");
          
          span.textContent = this.columen.hint;
          label.setAttribute("class","tooltip");
          span.setAttribute("class","tooltiptext-top");
          
          label.appendChild(span);
        }
        label.textContent = this.columen.label;
      } else {
        label.textContent = "something went wrong";
      }
      return(label);
    }

}