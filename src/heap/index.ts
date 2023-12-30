export type Comparator<T> = (a: T, b: T) => number

const heapify = <T>(arr: T[], i: number, len: number, key: Comparator<T>) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < len && key(arr[left]!, arr[largest]!) > 0)
        largest = left;

    if (right < len && key(arr[right]!, arr[largest]!) > 0)
        largest = right;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest]!, arr[i]!];
        heapify(arr, largest, len, key);
    }
}

export const buildHeap = <T>(arr: T[], key: Comparator<T>) => {
    const len = arr.length;
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i, len, key);
    }
}

export const heapInsert = <T>(arr: T[], value: T, key: Comparator<T>) => {
    arr.push(value);
    let i = arr.length - 1;
    let parent = Math.floor((i - 1) / 2);

    while (i > 0 && key(arr[parent]!, arr[i]!) < 0) {
        [arr[parent], arr[i]] = [arr[i]!, arr[parent]!];
        i = parent;
        parent = Math.floor((i - 1) / 2);
    }
}

export const heapExtract = <T>(arr: T[], key: Comparator<T>) => {
    const len = arr.length;
    [arr[0], arr[len - 1]] = [arr[len - 1]!, arr[0]!];
    const max = arr.pop();
    heapify(arr, 0, len - 1, key);
    return max;
}