import {type Comparator, heapExtract, heapInsert} from "../heap";

class PriorityQueue<Element> {
    private readonly queue: Array<Element>;
    private readonly compareFn: Comparator<Element>

    constructor(compareFn: Comparator<Element>) {
        this.queue = [];
        this.compareFn = compareFn
    }

    enqueue(event: Element): void {
        heapInsert(this.queue, event, this.compareFn)
    }

    dequeue(): Element | null {
        return heapExtract(this.queue, this.compareFn) ?? null;
    }

    peek(): Element | null {
        return this.queue[0] ?? null
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }
}

export default PriorityQueue