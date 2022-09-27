import { CustomTag } from "forms42core";

export class LanguageLabel implements CustomTag
{
	parse(component: any, tag: HTMLElement, attr: string): string | HTMLElement | HTMLElement[]
	{
		return("Label");
	}
}