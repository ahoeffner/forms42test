import { DragDropOptions } from "./DragDropOptions";












export class dragDropTable implements EventListenerObject
{
    
    x:number = 0;
    y:number = 0;
    top:number = 0;
    left:number = 0;
    width : number = 0;
    rows: string = null;
    click:string = null;
    cells: string = null;
    heading: string = null;
    list: HTMLElement = null;
    placeholder:HTMLElement = null;
    draggingEle:HTMLElement = null;
    options:DragDropOptions = null;
    draggingColumnIndex:number = 0;
    tableElem:HTMLTableElement = null;
    isDraggingStarted:boolean = false;
    foundTheDrag = null;
    constructor(tableElem: HTMLTableElement, options: DragDropOptions)
    {

        this.options = options;
        this.tableElem = tableElem;
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.update(options);
    }
    handleEvent(object: Event): void 
    {   

       
        if(object.type === "mousemove")
        {
            
            this.mouseMoveHandler();
            this.top = this.y - object["clientY"] as number;
            this.left = this.x - object["clientX"] as number;
            this.draggingEle.style.position = 'absolute' as string;
            this.x = object["clientX"] as number;
            this.y = object["clientY"] as number;        
            this.draggingEle.style.top = `${this.draggingEle.offsetTop - this.top}px` as string;
            this.draggingEle.style.left = `${this.draggingEle.offsetLeft - this.left}px` as string;
          
        } else if(object.type == "mouseup")
        {   
             this.mouseUpHandler()
    
        }
    }

    set setRows(value: string){
        this.rows = value;
    }

    set setHeading(value: string){

        this.heading = value;
    }
    set setCells(value:string){

        this.cells = value;
    }

    set setClick(value: string){

        this.click = value;
    }

   public mouseDownHandler(object: Event):void
   {
    object["path"].forEach(obj =>
        {
            if("." + obj["className"] == this.click.trim() || obj.tagName == "TH")
            {
                this.foundTheDrag =  obj
            }
        })

       
            this.draggingColumnIndex = [].slice.call(this.tableElem.querySelectorAll(this.click)).indexOf(this.foundTheDrag) as number;
            this.x =<number> object["clientX"] - object.target["offsetLeft"];
            this.y = <number> object["clientY"] - object.target["offsetTop"];
        
            document.addEventListener('mousemove',this);
            document.addEventListener('mouseup', this);
        
    }
   private mouseUpHandler() : void
   {
        if( this.placeholder && this.placeholder !== null){
            if(this.placeholder.parentNode){
            this.placeholder.parentNode.removeChild(this.placeholder) as HTMLElement
         }
        }
        if(this.draggingEle)
        {
        this.draggingEle.classList.remove('dragging');
        this.draggingEle.style.removeProperty('top');
        this.draggingEle.style.removeProperty('left');
        this.draggingEle.style.removeProperty('position');

        const endColumnIndex:number = [].slice.call(this.list.children).indexOf(this.draggingEle);

        this.isDraggingStarted = false;
        if(this.list.parentNode)
        {
        this.list.parentNode.removeChild(this.list);
        }

        this.tableElem.querySelectorAll(this.rows).forEach((row) => {
            const cells:Array<HTMLElement> = [].slice.call(row.querySelectorAll(`${this.heading}, ${this.cells}`));

            if(this.draggingColumnIndex > endColumnIndex) cells[endColumnIndex].parentNode.insertBefore(cells[this.draggingColumnIndex],cells[endColumnIndex])
            else cells[endColumnIndex].parentNode.insertBefore(cells[this.draggingColumnIndex],cells[endColumnIndex].nextSibling);
            
           
               
        });

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
            this.cloneTable();
            console.log(this.list)
            console.log(this.draggingColumnIndex)
            this.draggingEle = [].slice.call(this.list.children)[this.draggingColumnIndex];
            this.draggingEle.classList.add('dragging');
            this.placeholder = document.createElement('div');
            this.placeholder.classList.add('placeholder');
            this.draggingEle.parentNode.insertBefore(this.placeholder, this.draggingEle.nextSibling);
            this.placeholder.style.width = `${this.draggingEle.offsetWidth}px`;
        }
         
        const prevEle:Element = this.draggingEle.previousElementSibling;
        const nextEle:Element = this.placeholder.nextElementSibling;
        if (prevEle && this.IsOnLeft(this.draggingEle, prevEle))
        {
            this.swap(this.placeholder, this.draggingEle);
            this.swap(this.placeholder, prevEle);
            return;
        }
        if (nextEle && this.IsOnLeft(nextEle, this.draggingEle))
        {
            this.swap(nextEle, this.placeholder);
            this.swap(nextEle, this.draggingEle);
            return;
        }
    }

    private swap(nodeA: Node, nodeB: Node) : void
    {
        const parentA:Node = nodeA.parentNode;
        const siblingA:Node = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        nodeB.parentNode.insertBefore(nodeA, nodeB);

        parentA.insertBefore(nodeB, siblingA);
    };

    private IsOnLeft(nodeA: Element  ,nodeB : Element) : boolean
    {
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();
        return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
    }

    private cloneTable() : void
    {
        this.list = document.createElement("div");
        this.list.classList.add("clone-list");
        this.list.style.position = "relative";
        this.list.style.top = `${0}px`
        
        this.tableElem.style.display = 'none';
        this.tableElem.style.position = "";

        this.tableElem.parentElement.insertBefore(this.list,this.tableElem.nextSibling);
        const originalCells:Array<HTMLElement> = [].slice.call(this.tableElem.querySelectorAll(this.cells));
        const originalHeaderCells:Array<HTMLElement> = [].slice.call(this.tableElem.querySelectorAll(this.heading));

        originalHeaderCells.forEach((header,headerIndex) => {
            this.width = Number(window.getComputedStyle(header).width) ;

            const item:HTMLElement = document.createElement('div')
            item.classList.add('draggable');

            const newTable:HTMLElement = document.createElement('div');
            newTable.setAttribute('class', 'clone-table');
            newTable.style.width = `${this.width}px`;

            const cell_header:Node = header.cloneNode(true);

            let newRow:HTMLElement = document.createElement('div')
            newRow.classList.add(this.rows);

            newRow.appendChild(cell_header);
            newTable.appendChild(newRow);
            console.log(newTable)
            const cells = originalCells.filter((c,idx) => {
                return (idx - headerIndex) % originalHeaderCells.length === 0;
            })
            cells.forEach((cell) => {
                const newCell = cell.cloneNode(true);
                newRow = document.createElement('div');
                newRow.classList.add(this.rows);

                newRow.appendChild(newCell);
                newTable.appendChild(newRow)
            })
            item.appendChild(newTable);
         
            this.list.appendChild(item);
        })

    }

    update(options: DragDropOptions)
    {
        Object.entries({...options}).forEach(([key,value]) => 
        {
          this[key] = value;
        })
    }
}