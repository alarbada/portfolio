import { createStore as _createStore, produce } from 'solid-js/store'

import mePng from './imgs/me.png'

function createStore<T extends object>(value: T) {
    const [getter, setter] = _createStore(value)

    type mutationFunction = (val: T) => void

    function immerLike(cb: mutationFunction): void {
        setter(produce(cb))
    }

    return [getter, immerLike] as const
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

const loadingMsg = 'loading awesome description...'
const fullTitle = 'Full stack mate lover'
const description = `I'm a fullstack web developer with a passion for travel and exploring new technologies. Whether I'm developing with Go during the day, or programming with SolidJS at night, I'm always looking for ways to grow and learn. When I'm not coding, I'm usually sipping some mate, planning my next adventure and daydreaming about the possibilities of the future!`
const [store, setStore] = createStore({
    title: '',
    description: '',
})

// window.onload = async function () {
//     for (let i = 0; i < loadingMsg.length; i++) {
//         const char = loadingMsg[i]
//         await sleep(30)
//         setStore((store) => {
//             store.title += char
//         })
//     }

//     await sleep(1000)
//     setStore((store) => {
//         store.title = ''
//     })

//     for (let i = 0; i < fullTitle.length; i++) {
//         const char = fullTitle[i]
//         await sleep(40)
//         setStore((store) => {
//             store.title += char
//         })
//     }
// }

function MePng() {
    return (
        <img
            class="w-40 rounded-full border border-4 border-slate-600 opacity-70"
            src={mePng}
        ></img>
    )
}

function App() {
    return (
        <div class="bg-neutral-800 text-xs text-white">
            <div class="flex h-screen">
                <div class="border-r border-stone-600 pt-4">
                    <p class="text-lime-300 pr-2">
                        {'/guillem/projects/portfolio/'}
                    </p>
                    <div>
                        <span class="pr-2 text-orange-500">▾</span>
                        <span class="text-green-500">src/</span>
                    </div>
                    <p class="pl-8">skills.ts</p>
                    <p class="pl-8">aboutme.ts</p>
                    <p class="pl-8">contact.js</p>
                    <p class="bg-neutral-700 pl-4">README.md</p>
                </div>
                <div class="pt-4 pl-2 grow">
                    <p class="text-white"></p>
                    <p></p>
                    <p class="grow text-white">hello there</p>
                    <p></p>
                    <p class="grow text-white">hello there</p>
                </div>
            </div>
        </div>
    )
}

export default App
