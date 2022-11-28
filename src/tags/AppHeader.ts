import { CustomTag } from "forms42core";

export class AppHeader implements CustomTag
{
	parse(_component: any, _tag: HTMLElement, _attr: string): string | HTMLElement | HTMLElement[]
	{
		let heading:string =
		`
			<b style="position: relative; display: inline-block; height: 18px; top: 1.5px;">
				Præsenattion for Jonas
			</b>
		`;

		return(heading);
	}
}