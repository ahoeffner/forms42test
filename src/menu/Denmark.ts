import { StaticMenu, StaticMenuEntry } from "forms42core";

export class Denmark extends StaticMenu
{
	constructor()
	{
		super(Denmark.data());
	}

	public async execute(path: string): Promise<boolean>
	{
		console.log("choose <"+path+">");
		return(true);
	}

    private static data() : StaticMenuEntry
    {
        return(
        {
            id: "Danmark",
            text: "Danmark",
            entries:
            [
                {
                    id: "Jylland",
                    text: "Jylland",
                    entries:
                    [
                        {
                            id: "Sønderborg",
                            text: "Sønderborg",
                            command: "/soenderborg"
                        }
                        ,
                        {
                            id: "Århus",
                            text: "Århus",
                            entries:
                            [
                                {
                                    id: "Syd",
                                    text: "Syd",
                                    command: "/aahus/syd"
                                }
                                ,
                                {
                                    id: "Nord",
                                    text: "Nord",
                                    command: "/aahus/nord"
                                }
                            ]
                        }
                        ,
                        {
                            id: "Skagen",
                            text: "Skagen",
                            command: "/skagen"
                        }
                    ]
                }
                ,
                {
                    id: "Sjælland",
                    text: "Sjælland",
                    entries:
                    [
                        {
                            id: "København",
                            text: "København",
                            command: "/kopenhavn"
                        }
                        ,
                        {
                            id: "Hørsholm",
                            text: "Hørsholm",
                            command: "/horsholm"
                        }
                    ]
                }
                ,
                {
                    id: "Fyn",
                    text: "Fyn",
                    command: "/fyn"
                }
                ,
                {
                    id: "Øerne",
                    text: "Øerne",
                    command: "/oerne"
                }
            ]
        });
    }
}