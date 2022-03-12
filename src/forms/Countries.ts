import { Form } from 'forms42core';
import content from './Countries.html';


export class Countries extends Form
{
    constructor()
    {
        super(content);
    }

    public hello() : void
    {
        console.log("It works II");
    }
}