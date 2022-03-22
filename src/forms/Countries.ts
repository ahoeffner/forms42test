import { Form } from './Form';
import content from './Countries.html';


export class Countries extends Form
{
    constructor()
    {
        super(content);
    }

    public hello(msg?:string, n?:number) : void
    {
        if (n == null) n = 0;
        if (msg == null) msg = "none";
        console.log("Message "+msg+"["+n+"]");
    }
}