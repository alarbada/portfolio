import { For, JSX } from 'solid-js'
import { createStore as _createStore, produce } from 'solid-js/store'
import { A, Navigate, Routes, Route } from '@solidjs/router'

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

const finalState = {
    fullTitle: 'Guillem Garcia Sans',
    description: `I'm a fullstack web developer with a passion for travel and exploring new technologies. Whether I'm developing with Go during the day, or programming with SolidJS at night, I'm always looking for ways to grow and learn. When I'm not coding, I'm usually sipping some mate, planning my next adventure and daydreaming about the possibilities of the future!`,
}

const links = {
    readme: {
        name: 'readme',
        path: '/readme',
    },
    skills: {
        name: 'skills',
        path: '/skills',
    },
    work: {
        name: 'work',
        path: '/work',
    },
    contact: {
        name: 'contact',
        path: '/contact',
    },
}

type AppState = Partial<typeof finalState>

const [appState, setAppState] = createStore<AppState>({})

window.onload = async function () {
    // for (const char of finalState.fullTitle) {
    // }
    // for (let i = 0; i < loadingMsg.length; i++) {
    //     const char = loadingMsg[i]
    //     await sleep(30)
    //     setStore((store) => {
    //         store.title += char
    //     })
    // }
    // await sleep(1000)
    // setStore((store) => {
    //     store.title = ''
    // })
    // for (let i = 0; i < fullTitle.length; i++) {
    //     const char = fullTitle[i]
    //     await sleep(40)
    //     setStore((store) => {
    //         store.title += char
    //     })
    // }
}

function MePng() {
    return (
        <img
            class="w-40 rounded-full border border-4 border-slate-600 opacity-70"
            src={mePng}
        ></img>
    )
}

const totalLines: JSX.Element[] = []
for (let i = 1; i <= 100; i++) {
    totalLines.push(<p class="text-right">{i}</p>)
}

type ButtonProps = {
    href: string
    children: JSX.Element
}

function Button(props: ButtonProps) {
    return (
        <A href={props.href}>
            <button
                type="button"
                class="unset rounded border border-stone-600 py-1.5 px-2.5 transition hover:bg-stone-700"
            >
                {props.children}
            </button>
        </A>
    )
}

function App() {
    return (
        <div class="flex h-screen flex-col overflow-hidden bg-neutral-800 text-xs text-white">
            <div class="flex grow">
                <div class="w-[210px] border-r border-stone-600 pt-4">
                    <p class="pr-2 text-lime-300">
                        /guillem/projects/portfolio/
                    </p>
                    <div>
                        <span class="pr-2 text-orange-500">▾</span>
                        <span class="text-green-500">src/</span>
                    </div>
                    <A class="block pl-8" href={links.skills.path}>
                        {links.skills.name}
                    </A>
                    <A class="block pl-8" href={links.work.path}>
                        {links.work.name}
                    </A>
                    <A class="block pl-8" href={links.contact.path}>
                        {links.contact.name}
                    </A>
                    <A
                        class="block bg-neutral-700 pl-4"
                        href={links.readme.path}
                    >
                        {links.readme.name}
                    </A>
                </div>
                <div class="flex grow pl-2">
                    <div class="mr-4 w-4 text-left text-gray-500">
                        <For each={totalLines}>{(p) => p}</For>
                    </div>
                    <div class="grow">
                        <div class="m-auto pt-4 w-[500px]">
                            <p class="text-xl">Guillem Garcia Sans</p>
                            <p>
                                Mid-level 26 y/o fullstack web developer with 6
                                years of web development experience.
                            </p>
                            <div class="mt-10 flex justify-evenly gap-4">
                                <Button href={links.skills.path}>
                                    {links.skills.name}
                                </Button>
                                <Button href={links.work.path}>
                                    {links.work.name}
                                </Button>
                                <Button href={links.contact.path}>
                                    {links.contact.name}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
