import { Menu } from "../Menu";
import { Fields } from "../forms/fields/Fields";
import { FormsModule, StaticMenu, StaticMenuEntry } from "forms42core";

export class Forms extends StaticMenu
{
	constructor(private handler:Menu)
	{
		super(Forms.data());
	}

	public async execute(path: string): Promise<boolean>
	{
		let pos:number = path.lastIndexOf('/');
		await FormsModule.get().showform(path.substring(pos+1));
		this.handler.hide();
		return(false);
	}

    private static data() : StaticMenuEntry
    {
        return(
        {
            id: "forms",
            text: "forms",

            entries:
            [
                {
                    id: "phonebook",
                    text: "1 Phone Book",
					command: "/forms/PhoneBook"
				},
                {
                    id: "fields",
                    text: "2 Fields",
					command: "/forms/Fields"
				}
			]
       });
    }
}