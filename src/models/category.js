export class Category {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.id = Math.random() * (10 ** 6);
    }
}
