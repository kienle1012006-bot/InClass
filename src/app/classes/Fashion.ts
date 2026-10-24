export class Fashion {
    constructor(
        public _id:string | null=null,
        public style:string="",
        public fashion_subject:string="",
        public fashion_detail:string="",
        public fashion_image:string="",
        public IdF:number=0){}

    getBase64String(): string {
        if (!this.fashion_image) return '';
        return this.fashion_image.startsWith('data:image/') || /^https?:\/\//i.test(this.fashion_image)
            ? this.fashion_image
            : `data:image/jpeg;base64,${this.fashion_image}`;
    }
}


