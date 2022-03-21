import { Form as Base, Frame } from 'forms42core';


export class Form extends Base
{
    private frame:Frame = null;


    public toggle() : void
    {
        if (this.frame == null)
        {
            this.frame = this.canvas.getFrame();
            this.canvas.setFrame(this.canvas.getParentFrame());
        }
        else
        {
            this.canvas.setFrame(this.frame);
            this.frame = null;
        }
    }
}