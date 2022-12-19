import { CustomTag } from "forms42core";

export class AppHeader implements CustomTag
{
	parse(_component: any, _tag: HTMLElement, _attr: string): string | HTMLElement | HTMLElement[]
	{
		let heading:string =
		`
			<b class="logo" style="position: absolute; display: inline-block; height: 18px; top: 12px; left: 50px; user-select: none; cursor:default">
				FutureForms
			</b>
		`;

		return(heading);
	}
}