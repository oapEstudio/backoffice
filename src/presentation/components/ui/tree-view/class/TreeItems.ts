export type TreeItemActionHandlers = {
  onAddChild?: (node: ItemTree) => void
  onEditNode?: (node: ItemTree) => void
  onDeleteNode?: (node: ItemTree) => void
  onOrderUpNode?: (node: ItemTree) => void
  onOrderDownNode?: (node: ItemTree) => void
  onCustomNode?: (node: ItemTree) => void
}

export abstract class ItemTree {
    
    public id!: string;
    public label!: string;
    public obj?: any;
    public orden: number = 0;
    protected parent!: ItemTree | null;    

    constructor(pid: string,plabel: string,porden: number,pobj?: any){
        this.id = pid;
        this.label = plabel;
        this.obj = pobj;
        this.orden = porden;
    }
    public setParent(parent: ItemTree | null) {
        this.parent = parent;
    }

    public getParent(): ItemTree | null {
        return this.parent;
    }

    public add(ItemTree: ItemTree): void { }

    public remove(ItemTree: ItemTree): void { }

     public isComposite(): boolean {
        return false;
    }
    public abstract operation(param?: any): any;

    public callback?:  (a?:any) => void;

}


export class ChildItem extends ItemTree {

    public operation(param?: any): any {

        if(!this.callback) return;

        if(!param){
            this.callback();

            return;
        }  
        
        this.callback(param);
    }
}

export class FatherItem extends ItemTree {

    protected children: ItemTree[] = [];

    public add(ItemTree: ItemTree): void {
        this.children.push(ItemTree);
        ItemTree.setParent(this);
    }

    public remove(ItemTree: ItemTree): void {
        const ItemTreeIndex = this.children.indexOf(ItemTree);
        this.children.splice(ItemTreeIndex, 1);

        ItemTree.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    public getChildren(): ItemTree[] {
        return this.children.sort((a,b)=>a.orden-b.orden)
    }

    public operation(param?: any): any {

        if(!this.callback) return;

        if(!param){
            this.callback();

            return;
        }  
        
        this.callback(param);
    }

}