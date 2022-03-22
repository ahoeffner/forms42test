import { Include } from 'forms42core';
import fragment from './PageFooter.html';

export class PageFooter implements Include
{
    public get content() : string | Element
    {
        return(fragment);
    }
}