import { Include } from 'forms42core';
import fragment from './PageHeader.html';

export class PageHeader implements Include
{
    public get content() : string | Element
    {
        return(fragment);
    }
}