export class PageResponse {
    data: any;
    page: number;
    size: number;

    constructor(data: any, page: number, size: number) {
        this.data = data;
        this.page = page;
        this.size = size;
    }
}