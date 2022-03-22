import { Include } from 'forms42core';
import fragment from './FormHeader.html';

export class FormHeader implements Include
{
    public get content() : string | Element
    {
        return(fragment);
    }
}