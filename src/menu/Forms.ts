import { FormsModule, StaticMenu, StaticMenuEntry } from "forms42core";
import { Fields } from "../forms/fields/Fields";
import { Menu } from "../Menu";

export class Forms extends StaticMenu
{
	constructor(private handler:Menu)
	{
		super(Forms.data());
	}

	public async execute(path: string): Promise<boolean>
	{
		console.log("choose <"+path+">");
		await FormsModule.get().getApplication().showform(Fields);
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
                    id: "fields",
                    text: "1 Fields",
					command: "/forms/Fields"
				}
			]
       });
    }
}