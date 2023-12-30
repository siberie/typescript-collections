class Deque<TElement> {
    private _elements: TElement[] = [];
    private _head: number | null = null;
    private _tail: number | null = null;
    private _next: (number | null)[] = []
    private _prev: (number | null)[] = []

    public push(element: TElement) {
        if (this._tail === null) {
            this._head = 0
            this._tail = 0
            this._elements = [element]
            this._next = [null]
            this._prev = [null]
        } else {
            this.insertAfter(this._tail, element)
        }
    }

    public unshift(element: TElement) {
        if (this._head === null) {
            this._head = 0
            this._tail = 0
            this._elements = [element]
            this._next = [null]
            this._prev = [null]
        } else {
            this.insertBefore(this._head, element)
        }
    }

    public pop(): TElement | undefined {
        if (this._tail === null) return undefined
        const oldTail = this._tail

        this._tail = this._prev[this._tail]
        if (this._tail !== null)
            this._next[this._tail] = null
        else
            this._head = null

        if (oldTail < this._elements.length - 1)
            this.transplant(this._elements.length - 1, oldTail)

        this._next.pop()
        this._prev.pop()
        return this._elements.pop()
    }

    public shift(): TElement | undefined {
        if (this._head === null) return undefined
        const oldHead = this._head

        this._head = this._next[this._head]

        if (this._head !== null)
            this._prev[this._head] = null
        else
            this._tail = null

        if (oldHead < this._elements.length - 1)
            this.transplant(this._elements.length - 1, oldHead)

        this._next.pop()
        this._prev.pop()
        return this._elements.pop()
    }

    public insertAfter(index: number, element: TElement) {
        this._elements.push(element)
        const newIndex = this.lastIndex()

        const next = this._next[index]

        this._next[index] = newIndex
        this._next[newIndex] = next
        this._prev[newIndex] = index

        if (next !== null)
            this._prev[next] = newIndex
        else
            this._tail = newIndex
    }

    public insertBefore(index: number, element: TElement) {
        this._elements.push(element)
        const newIndex = this.lastIndex()

        const prev = this._prev[index]
        this._prev[index] = newIndex
        this._prev[newIndex] = prev
        this._next[newIndex] = index

        if (prev !== null)
            this._next[prev] = newIndex
        else
            this._head = newIndex
    }

    public remove(index: number) {
        const prev = this._prev[index]
        const next = this._next[index]

        if (prev !== null)
            this._next[prev] = next
        else
            this._head = next

        if (next !== null)
            this._prev[next] = prev
        else
            this._tail = prev

        this.transplant(this._elements.length - 1, index)

        this._next.pop()
        this._prev.pop()
        this._elements.pop()
    }

    public get length() {
        return this._elements.length;
    }

    private transplant(source: number, destination: number) {
        if (source === destination) return

        const srcPrevious = this._prev[source]
        const srcNext = this._next[source]

        const toElement = this._elements[destination]

        this._elements[destination] = this._elements[source]
        this._next[destination] = srcNext
        this._prev[destination] = srcPrevious

        this._elements[source] = toElement

        if (srcPrevious !== null)
            this._next[srcPrevious] = destination
        else
            this._head = destination

        if (srcNext !== null)
            this._prev[srcNext] = destination
        else
            this._tail = destination
    }

    private lastIndex() {
        return this._elements.length - 1
    }
}

export default Deque