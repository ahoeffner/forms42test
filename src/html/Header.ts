import fragment from './Header.html';
import { Include } from 'forms42core';

export class Header implements Include
{
    public get content() : string | Element
    {
        return(fragment);
    }
}