import Deque from "../src/deque";

describe('Deque tests', () => {
    test('deque created empty', () => {
        const deque = new Deque()
        expect(deque.length).toBe(0)
    })

    test('push', () => {
        const deque = new Deque()
        deque.push(1)
        expect(deque.length).toBe(1)
    })

    test('pop', () => {
        const deque = new Deque()
        deque.push(1)
        expect(deque.pop()).toBe(1)
        expect(deque.length).toBe(0)
    })

    test('shift', () => {
        const deque = new Deque()
        deque.push(1)
        expect(deque.shift()).toBe(1)
        expect(deque.length).toBe(0)
    })

    test('unshift', () => {
        const deque = new Deque()
        deque.unshift(1)
        expect(deque.length).toBe(1)
    })

    test('push, push, shift, shift', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        expect(deque.shift()).toBe(1)
        expect(deque.shift()).toBe(2)
        expect(deque.length).toBe(0)
    })

    test('push, push, push, shift, shift, shift', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        deque.push(3)
        expect(deque.shift()).toBe(1)
        expect(deque.shift()).toBe(2)
        expect(deque.shift()).toBe(3)
    })

    test('push, push, shift, push, push, shift', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        deque.shift()
        deque.push(3)
        deque.push(4)
        expect(deque.shift()).toBe(2)
    })

    test('push, push, insertAfter, shift, shift, shift', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        deque.insertAfter(0, 3)
        expect(deque.shift()).toBe(1)
        expect(deque.shift()).toBe(3)
        expect(deque.shift()).toBe(2)
    })

    test('push, push, insertBefore, shift, shift, shift', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        deque.insertBefore(1, 3)
        expect(deque.shift()).toBe(1)
        expect(deque.shift()).toBe(3)
        expect(deque.shift()).toBe(2)
    })

    test('insert before head', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        deque.insertBefore(0, 3)
        expect(deque.shift()).toBe(3)
        expect(deque.shift()).toBe(1)
        expect(deque.shift()).toBe(2)
    })

    test('insert after tail', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        deque.insertAfter(1, 3)
        expect(deque.shift()).toBe(1)
        expect(deque.shift()).toBe(2)
        expect(deque.shift()).toBe(3)
        expect(deque.length).toBe(0)
    })

    test('unshift unshift pop pop', () => {
        const deque = new Deque()
        deque.unshift(1)
        deque.unshift(2)
        expect(deque.pop()).toBe(1)
        expect(deque.pop()).toBe(2)
        expect(deque.length).toBe(0)
    })

    test('push push pop pop', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        expect(deque.pop()).toBe(2)
        expect(deque.pop()).toBe(1)
        expect(deque.length).toBe(0)
    })

    test('unshift unshift shift shift', () => {
        const deque = new Deque()
        deque.unshift(1)
        deque.unshift(2)
        expect(deque.shift()).toBe(2)
        expect(deque.shift()).toBe(1)
        expect(deque.length).toBe(0)
    })

    test('push remove', () => {
        const deque = new Deque()
        deque.push(1)
        deque.remove(0)
        expect(deque.length).toBe(0)
    })

    test('push push remove pop', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        deque.remove(0)
        expect(deque.pop()).toBe(2)
        expect(deque.length).toBe(0)
    })

    test('push push push remove pop pop', () => {
        const deque = new Deque()
        deque.push(1)
        deque.push(2)
        deque.push(3)
        deque.remove(1)
        expect(deque.pop()).toBe(3)
        expect(deque.pop()).toBe(1)
        expect(deque.length).toBe(0)
    })
})