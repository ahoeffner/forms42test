

export interface DragDropOptions{
    
    Rows: string,
    Heading: string,
    Cells: string,
    Drag: string,
    classes?:{
        dragging?:string
        cloneTable?:string
        cloneList?:string
        draggable?: string
    }
}