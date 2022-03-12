import content from './Countries.html';
import { bean, Form } from 'forms42core';


@bean()

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