export interface IBook{
    BookId:string,
    BookName:string,
    Price:number,
    Image:string,
    ImageBase64?:string
}

export class Book implements IBook{
    BookId:string=''
    BookName:string=''
    Price:number=0
    Image:string=''
    ImageBase64:string=''

    constructor(init?:Partial<Book>){
        Object.assign(this, init)
    }
}
