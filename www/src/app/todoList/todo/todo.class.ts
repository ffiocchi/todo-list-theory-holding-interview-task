export class Todo {
    id: string | null = null;
    taskDescription: string | null = null;
    markAsComplete: boolean = false;
    insertDate: Date | null = null;
    owner: string | null = null;

    constructor(){
        this.id = crypto.randomUUID();
        this.insertDate = new Date(Date.now())
        this.owner = "Francesco"
        this.taskDescription = crypto.randomUUID()
        this.markAsComplete = false;
    }

    complete(){
        this.markAsComplete = true;
    }
} 