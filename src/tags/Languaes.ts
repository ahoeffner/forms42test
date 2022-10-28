import { Column } from "./columen";
import { Connection } from "forms42core";



export class Languaes
{
    
    public static HINT:number = 8;
    public static COLUMN:number = 5;
    public static TABLE:number = 0;
    public static LABEL:number = 6;
    public static SIZE:number = 9;
    
    private static root:Map<string,Map<string,Column>> = new Map<string,Map<string,Column>>();

    constructor()
    {

    }    

    public static async setLanguaes(file:string) : Promise<boolean>
    {
        if(file == null)
            return(true); 
      
        let conn:Connection = new Connection("origen");
        let laws:string = await conn.get(file,true);
        this.parser(laws);
        return(true);
    }

    public static getTable(table:string) : Map<String,Column>
    {

            return this.root.get(table.toLowerCase());
    }

    public static getColumn(table:string,column?:string) : Column
    {
            return this.root.get(table.toLowerCase())?.get(column.toLowerCase());
    }

    private static parser(file: string) : void
    {        
        let parser:DOMParser = new DOMParser();
        let xmlDoc = parser.parseFromString(file,"text/xml");
        let spreadsheet = xmlDoc.querySelector("Table");
        console.log(spreadsheet);  
        let insert:Map<string,Column> = null;
      
        for (let i = 0; i < spreadsheet.children.length; i++) 
        {
            let row = spreadsheet.children.item(i);
            let hint = row.children.item(this.HINT) ? row.children.item(this.HINT).textContent : "";
            let size = row.children.item(this.SIZE) ? row.children.item(this.SIZE).textContent : "";
            let label = row.children.item(this.LABEL)? row.children.item(this.LABEL).textContent: "";
            let table = row.children.item(this.TABLE)? row.children.item(this.TABLE).textContent.toLowerCase() : ""; 
            let colname = row.children.item(this.COLUMN)? row.children.item(this.COLUMN).textContent.toLowerCase() : "";

            insert = this.root.get(table);

            if (insert == null)
            {
                insert = new Map<string,Column>();
                this.root.set(table,insert);
            };

            let column:Column = new Column(colname,label,hint,size);
            insert.set(colname,column);
        }
        console.log(this.root);
    }   
}

