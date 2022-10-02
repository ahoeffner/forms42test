




import { BaseForm } from '../../../BaseForm';
import { DragDropOptions } from "./DragDropOptions";
import { Employees } from "../../../datasources/memory/Employees";
import { EventType, Filters, Filter, Block, block, datasource, formevent, Form } from 'forms42core';



export class dragDropTable implements EventListenerObject, DragDropOptions
{

    x:number = 0;
    y:number = 0;
    top:number = 0;
    left:number = 0;
    width : number = 0;

    drag:string = null;
    cells: string = null;
    heading: string = null;
    rows: string = null;

    nextEle: Element = null;
    prevEle: Element = null;

    table: HTMLElement = null;
    dragColumnIndex:number = 0;
    foundTheDrag:Element = null;
    placeholder:HTMLElement = null;
    draggingEle:HTMLElement = null;

    options:DragDropOptions = null;
    tableElem:HTMLTableElement = null;
    isDraggingStarted:boolean = false;

    constructor(tableElem: HTMLTableElement, options: DragDropOptions)
    {
        this.options = options;
        this.tableElem = tableElem;
        if(this.options.classes == null) this.options.classes = {}
        if(this.options.classes.dragging == null) this.options.classes.dragging = "dragging";
        if(this.options.classes.draggable == null) this.options.classes.draggable = "draggable";
        if(this.options.classes.cloneList == null) this.options.classes.cloneList = "clone-list";
        if(this.options.classes.cloneTable == null) this.options.classes.cloneTable = "clone-table";

        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.update(options);
    }
     handleEvent(object: Event): void
    {

        if(object.type === "mousemove")
        {

            this.mouseMoveHandler();
            this.x = object["clientX"] as number;
            this.y = object["clientY"] as number;
            this.top = this.y - object["clientY"] as number;
            this.left = this.x - object["clientX"] as number;
            this.draggingEle.style.position = 'absolute' as string;
            this.draggingEle.style.top = `${this.draggingEle.offsetTop - this.top}px` as string;
            this.draggingEle.style.left = `${this.draggingEle.offsetLeft - this.left}px` as string;

        } else if(object.type == "mouseup")
        {
             this.mouseUpHandler()

        }
   }

   set Rows(value: string)
   {
       this.rows = value;
   }
   set Heading(value: string)
   {
       this.heading = value;
   }
   set Cells(value:string)
   {
       this.cells = value;
   }
   set Drag(value: string)
   {
       this.drag = value;
   }

   public mouseDownHandler(object: Event):void
   {
    object["path"].forEach(obj =>
        {
            if("." + obj["className"] == this.drag.trim() || obj.tagName == "TH" || "#" + obj["className"] == this.drag.trim())
            {
                this.foundTheDrag =  obj;
            }
        })


        this.x =<number> object["clientX"] - object.target["offsetLeft"];
        this.y = <number> object["clientY"] - object.target["offsetTop"];
        this.dragColumnIndex = [].slice.call(this.tableElem.querySelectorAll(this.drag)).indexOf(this.foundTheDrag) as number;

            document.addEventListener('mousemove',this);
            document.addEventListener('mouseup', this);

   }

   private mouseUpHandler() : void
   {
        if( this.placeholder && this.placeholder !== null)
        {
            if(this.placeholder.parentNode)
            {
            this.placeholder.parentNode.removeChild(this.placeholder) as HTMLElement
            }
        }
        if(this.draggingEle)
        {
            this.draggingEle.style.removeProperty('top');
            this.draggingEle.style.removeProperty('left');
            this.draggingEle.style.removeProperty('position');
            this.draggingEle.classList.remove(this.options.classes.dragging);

            let endColumnIndex:number = [].slice.call(this.table.children).indexOf(this.draggingEle);

            this.isDraggingStarted = false;
            if(this.table.parentNode)
            {
            this.table.parentNode.removeChild(this.table);
            }

            this.tableElem.querySelectorAll(this.rows).forEach((row) =>
            {
                let cells:Array<HTMLElement> = [].slice.call(row.querySelectorAll(`${this.heading}, ${this.cells}`));
                console.log(cells)
                if(this.dragColumnIndex > endColumnIndex) cells[endColumnIndex].parentNode.insertBefore(cells[this.dragColumnIndex],cells[endColumnIndex])
                else cells[endColumnIndex].parentNode.insertBefore(cells[this.dragColumnIndex],cells[endColumnIndex].nextSibling);
            });

            console.log(this.tableElem)
            this.tableElem.style.display = "block";
            document.removeEventListener('mousemove', this);
            document.removeEventListener('mouseup', this);
        }
    }

    private mouseMoveHandler() : void
    {

        if (!this.isDraggingStarted)
        {
            this.isDraggingStarted = true;
            this.table = this.cloneTable(this.table);
            console.log(this.table);
            if(this.table.nextElementSibling){
                this.table.nextElementSibling.remove()
            }

            this.draggingEle = [].slice.call(this.table.children)[this.dragColumnIndex] as HTMLElement;

            this.placeholder = document.createElement('div');
            this.placeholder.classList.add('placeholder');


            this.draggingEle.classList.add(this.options.classes.dragging);
            this.draggingEle.parentNode.insertBefore(this.placeholder, this.draggingEle.nextSibling);

            this.placeholder.style.width = `${this.draggingEle.offsetWidth}px`;
        }

        this.nextEle = this.placeholder.nextElementSibling;
        this.prevEle = this.draggingEle.previousElementSibling;


        if (this.prevEle && this.IsOnLeft(this.draggingEle, this.prevEle))
        {
            this.swap(this.placeholder, this.draggingEle);
            this.swap(this.placeholder, this.prevEle);
            return;
        }
        if (this.nextEle && this.IsOnLeft(this.nextEle, this.draggingEle))
        {
            this.swap(this.nextEle, this.placeholder);
            this.swap(this.nextEle, this.draggingEle);
            return;
        }
    }

    private swap(nodeA: Node, nodeB: Node) : void
    {
        let parentA:Node = nodeA.parentNode;
        let siblingA:Node = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        nodeB.parentNode.insertBefore(nodeA, nodeB);

        parentA.insertBefore(nodeB, siblingA);
    };

    private IsOnLeft(nodeA: Element  ,nodeB : Element) : boolean
    {
        let rectA: DOMRect = nodeA.getBoundingClientRect();
        let rectB: DOMRect = nodeB.getBoundingClientRect();
        return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
    }

    private cloneTable(table: HTMLElement) : HTMLElement
    {

        table = document.createElement("div");
        table.classList.add(this.options.classes.cloneTable);

        table.style.cssText = `position: relative; top:${0}px;`;
        this.tableElem.style.cssText = `display:none; position:"";`

        this.tableElem.parentElement.insertBefore(table,this.tableElem.nextSibling);
        let originalCells:Array<HTMLElement> = [].slice.call(this.tableElem.querySelectorAll(this.cells));
        let originalHeaderCells:Array<HTMLElement> = [].slice.call(this.tableElem.querySelectorAll(this.heading));

        originalHeaderCells.forEach((header:HTMLElement,headerIndex:number) => {

        let item:HTMLElement = document.createElement('div');
        let newRow:HTMLElement = document.createElement('div');
        let newTable:HTMLElement = document.createElement('div');
        this.width = Number(window.getComputedStyle(header).width);

        newTable.style.width = `${this.width}px`;
        newTable.classList.add(this.options.classes.cloneList);
        console.log(header)

        let newHeader:Node = header.cloneNode(true);
        newRow.classList.add(this.rows);
        newRow.appendChild(newHeader);
        newTable.appendChild(newRow);
        let cells = originalCells.filter((c,idx) => {
             return (idx - headerIndex) % originalHeaderCells.length === 0;
        });
         cells.forEach((cell) => {
             newRow = document.createElement('div');
             newRow.classList.add(this.rows);
             let newCell:Node = cell.cloneNode(true);
             newRow.appendChild(newCell);
             newTable.appendChild(newRow);
         });

         item.classList.add(this.options.classes.draggable);
         item.appendChild(newTable);
         table.appendChild(item);
         });
         return table;
    }

    private update(options: DragDropOptions)
    {
        Object.entries({...options}).forEach(([key,value]) =>
        {
          this[key] = value;
        })
    }
}