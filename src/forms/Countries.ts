import { BaseForm } from './BaseForm';
import content from './Countries.html';


export class Countries extends BaseForm
{
    constructor()
    {
        super(content);
        this.setTitle("Countries");
    }
}