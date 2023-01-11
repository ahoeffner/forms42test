/*
  MIT License

  Copyright © 2023 Alex Høffner

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software
  and associated documentation files (the “Software”), to deal in the Software without
  restriction, including without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or
  substantial portions of the Software.

  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
  BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { BaseForm as Form } from './BaseForm';

export class Minimized implements EventListenerObject
{
    private list:HTMLElement = null;
    private icon:HTMLImageElement = null;
    private forms:Map<string,Form> = new Map<string,Form>();

    constructor()
    {
        this.list = document.getElementById("form-list");
        this.icon = this.list.querySelector("img");
    }

    public add(form:Form) : void
    {
        let icon:HTMLImageElement = this.icon.cloneNode() as HTMLImageElement;

        icon.id = form.id;
        icon.style.width = "32px";
        icon.style.height = "32px";
        icon.style.display = "flex";
        icon.style.marginTop = "2.5px";
        icon.style.marginLeft = "1.5px";
        icon.style.marginRight = "1.5px";
        this.list.style.display = "flex";
        icon.addEventListener("click",this);

        this.list.appendChild(icon);
        this.forms.set(form.id,form);
    }

    public handleEvent(event:Event): void
    {
        let icon:Element = event.target as Element;
        let form:Form = this.forms.get(icon.id);

        form.show();
        icon.remove();

        this.forms.delete(icon.id);
    }
}