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

}