import { Countries } from './forms/Countries';
import {ModuleDefinition} from 'forms42core';

@ModuleDefinition(
    [
        Countries,
        {class: Countries, path: '/countries'}
    ]
)

class Main
{
    public show() : void
    {
        let root:Element = document.body.querySelector('forms');
        let template:HTMLTemplateElement = document.createElement('template');

        let countries:Countries = new Countries();
        template.innerHTML = countries.page();

        root.replaceWith(template.content);
    }
}

let main:Main = new Main();
main.show();
