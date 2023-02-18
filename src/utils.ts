import { createStore as _createStore, produce } from 'solid-js/store'

export function createStore<T extends object>(value: T) {
    const [getter, setter] = _createStore(value)

    type mutationFunction = (val: T) => void

    function immerLike(cb: mutationFunction): void {
        setter(produce(cb))
    }

    return [getter, immerLike] as const
}

