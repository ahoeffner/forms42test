import { Column } from "./Column";
import { Connection } from "forms42core";

export class Languages
{
	public static HINT:number = 8;
	public static COLUMN:number = 5;
	public static TABLE:number = 0;
	public static LABEL:number = 6;
	public static SIZE:number = 9;

	private static root:Map<string,Map<string,Column>> = new Map<string,Map<string,Column>>();

	public static async setLanguaes(file:string) : Promise<boolean>
	{
		if(file == null) return(true);
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
	}
}


export class Utils
{
	public static copyAttributes(fr:Element,to:Element) : void
	{
		if (fr == null || to == null) return;
		let attrnames:string[] = fr.getAttributeNames();

		for (let an = 0; an < attrnames.length; an++)
			to.setAttribute(attrnames[an],fr.getAttribute(attrnames[an]));
	}
}
