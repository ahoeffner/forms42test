import { DatabaseConnection, DatabaseTable, Filters, FilterStructure } from "forms42core";

export class SQLTest
{
	public static async test()
	{
		let conn:DatabaseConnection = new DatabaseConnection("database","http://localhost:9002");

		await conn.connect("hr","hr");

		let filters:FilterStructure = new FilterStructure();

		let source:DatabaseTable = new DatabaseTable(conn,"employees",["first_name","last_name"]);
		source.arrayfecth = 5;

		filters.and(Filters.Between("employee_id",true).setConstraint([0,200]));

		await source.query(filters);
		while ((await source.fetch()).length > 0);

		console.log("Succeeded")
	}
}