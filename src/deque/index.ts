class Deque<Element = unknown> implements Iterable<Element> {
    private elements: Element[] = [];
    private head: number | null = null;
    private tail: number | null = null;
    private next: (number | null)[] = []
    private prev: (number | null)[] = []

    public push(element: Element) {
        if (this.tail === null) {
            this.head = 0
            this.tail = 0
            this.elements = [element]
            this.next = [null]
            this.prev = [null]
        } else {
            this.insertAfter(this.tail, element)
        }
    }

    public unshift(element: Element) {
        if (this.head === null) {
            this.head = 0
            this.tail = 0
            this.elements = [element]
            this.next = [null]
            this.prev = [null]
        } else {
            this.insertBefore(this.head, element)
        }
    }

    public pop(): Element | undefined {
        if (this.tail === null) return undefined
        const oldTail = this.tail

        this.tail = this.prev[this.tail]
        if (this.tail !== null)
            this.next[this.tail] = null
        else
            this.head = null

        if (oldTail < this.elements.length - 1)
            this.transplant(this.elements.length - 1, oldTail)

        this.next.pop()
        this.prev.pop()
        return this.elements.pop()
    }

    public shift(): Element | undefined {
        if (this.head === null) return undefined
        const oldHead = this.head

        this.head = this.next[this.head]

        if (this.head !== null)
            this.prev[this.head] = null
        else
            this.tail = null

        if (oldHead < this.elements.length - 1)
            this.transplant(this.elements.length - 1, oldHead)

        this.next.pop()
        this.prev.pop()
        return this.elements.pop()
    }

    public insertAfter(index: number, element: Element) {
        this.elements.push(element)
        const newIndex = this.lastIndex()

        const next = this.next[index]

        this.next[index] = newIndex
        this.next[newIndex] = next
        this.prev[newIndex] = index

        if (next !== null)
            this.prev[next] = newIndex
        else
            this.tail = newIndex
    }

    public insertBefore(index: number, element: Element) {
        this.elements.push(element)
        const newIndex = this.lastIndex()

        const prev = this.prev[index]
        this.prev[index] = newIndex
        this.prev[newIndex] = prev
        this.next[newIndex] = index

        if (prev !== null)
            this.next[prev] = newIndex
        else
            this.head = newIndex
    }

    public remove(index: number) {
        const prev = this.prev[index]
        const next = this.next[index]

        if (prev !== null)
            this.next[prev] = next
        else
            this.head = next

        if (next !== null)
            this.prev[next] = prev
        else
            this.tail = prev

        this.transplant(this.elements.length - 1, index)

        this.next.pop()
        this.prev.pop()
        this.elements.pop()
    }

    public get length() {
        return this.elements.length;
    }

    public [Symbol.iterator](): Iterator<Element> {
        let current = this.head
        return {
            next: () => {
                if (current === null) return {done: true, value: undefined}
                const value = this.elements[current]
                current = this.next[current]
                return {done: false, value}
            }
        }
    }

    private transplant(source: number, destination: number) {
        if (source === destination) return

        const srcPrevious = this.prev[source]
        const srcNext = this.next[source]

        const toElement = this.elements[destination]

        this.elements[destination] = this.elements[source]
        this.next[destination] = srcNext
        this.prev[destination] = srcPrevious

        this.elements[source] = toElement

        if (srcPrevious !== null)
            this.next[srcPrevious] = destination
        else
            this.head = destination

        if (srcNext !== null)
            this.prev[srcNext] = destination
        else
            this.tail = destination
    }

    private lastIndex() {
        return this.elements.length - 1
    }
}

export default Deque