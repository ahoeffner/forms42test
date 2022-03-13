import { Countries } from './forms/Countries';
import {FormsModule, ModuleDefinition} from 'forms42core';

@ModuleDefinition(
    [
        Countries,
        {class: Countries, path: "/countries"}
    ]
)

class Main extends FormsModule
{
}

let main:Main = new Main();
main.parseByTags();
main.showform("/countries")
