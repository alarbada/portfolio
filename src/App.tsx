import { Switch, Match, For, JSX } from 'solid-js'
import { A } from '@solidjs/router'

const links = {
    readme: {
        name: 'README.md',
        path: '/readme',
    },
    skills: {
        name: 'skills.sql',
        path: '/skills',
    },
    work: {
        name: 'work.ts',
        path: '/work',
    },
    contact: {
        name: 'contact.js',
        path: '/contact',
    },
}

function trimExtension(file: string): string {
    const [filename] = file.split('.')
    if (filename === undefined) {
        throw new Error(`file ${file} should have an extension`)
    }

    return filename
}

// const finalState = {
//     fullTitle: 'Guillem Garcia Sans',
//     description: `I'm a fullstack web developer with a passion for travel and exploring new technologies. Whether I'm developing with Go during the day, or programming with SolidJS at night, I'm always looking for ways to grow and learn. When I'm not coding, I'm usually sipping some mate, planning my next adventure and daydreaming about the possibilities of the future!`,
// }

// type AppState = Partial<typeof finalState>

// const [appState, setAppState] = createStore<AppState>({})

// This will be useful for the typing effect
// function sleep(ms: number): Promise<void> {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms)
//     })
// }

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


const totalLines: JSX.Element[] = []
for (let i = 1; i <= 100; i++) {
    totalLines.push(<p class="text-right">{i}</p>)
}

type ButtonProps = {
    href?: string
    children: JSX.Element
}

function Button(props: ButtonProps) {
    const btn = (
        <button
            type="button"
            class="unset rounded border border-stone-600 py-1.5 px-2.5 transition hover:bg-stone-700"
        >
            {props.children}
        </button>
    )

    return (
        <Switch>
            <Match when={props.href !== undefined}>
                <A href={props.href as string}>{btn}</A>
            </Match>
            <Match when={props.href === undefined}>{btn}</Match>
        </Switch>
    )
}

type WorkExperienceProps = {
    title: {
        content: string
        href: string
    }
    period: string
    mainPoints: JSX.Element[]
    skills: string[]
}

function WorkExperience(props: WorkExperienceProps) {
    function ExternalLink(props: { href: string; children: string }) {
        return (
            <a class="underline" href={props.href} target="_blank">
                {props.children}
            </a>
        )
    }

    return (
        <div class="rounded border border-stone-600 p-4">
            <p class="text-base">
                <ExternalLink href={props.title.href}>
                    {props.title.content}
                </ExternalLink>
            </p>
            <p>{props.period}</p>
            <ul class="mt-2 list-disc pl-4">
                <For each={props.mainPoints}>{(point) => <li>{point}</li>}</For>
            </ul>
            <div class="flex flex-wrap justify-end">
                <For each={props.skills}>
                    {(skill) => <span class="py-1.5 px-2.5">{skill}</span>}
                </For>
            </div>
        </div>
    )
}

function ExternalLink(props: { href: string; children: string }) {
    return (
        <a class="underline" href={props.href} target="_blank">
            {props.children}
        </a>
    )
}

const spiralPricing: WorkExperienceProps = {
    title: {
        content: 'Spiral Pricing',
        href: 'https://www.spiral-pricing.com/',
    },
    period: 'Aug 2019 - Jan 2023 (3 years 6 months)',
    mainPoints: [
        <>
            Developed{' '}
            <ExternalLink href="https://spiral-seller.com/ar/">
                Spiral Seller
            </ExternalLink>
            , an ecommerce intelligence solution for the Mercadolibre
            marketplace
        </>,
        `Worked as the lead developer and the tech lead of the company.`,
        `Developed and debugged applications using nodejs / Express and Reactjs with material ui.`,
        `Managed postgresql databases on AWS rds, and improved performance of SQL queries`,
    ],
    skills: [
        'javascript',
        'typescript',
        'nodejs',
        'Go',
        'SQL',
        'Postgresql',
        'DocumentDB',
        'AWS',
    ],
}

const ditecGroup: WorkExperienceProps = {
    title: {
        content: 'Ditec Group',
        href: 'https://ditec.es/en/',
    },
    period: 'Feb 2019 - Jul 2019 (6 months)',
    mainPoints: [
        'Developed an internal audio routing app',
        'Developed an internal audio routing app',
        'Developed an internal audio routing app',
        'Developed an internal audio routing app',
    ],
    skills: ['javascript', 'typescript', 'nodejs', 'SQL', 'MySQL'],
}

function Sections() {
    return (
        <div class="flex flex-col gap-4">
            <WorkExperience {...spiralPricing}></WorkExperience>
            <WorkExperience {...ditecGroup}></WorkExperience>

            <div class="flex justify-center">
                <Button>Show internships</Button>
            </div>

            <div>
                Consultia IT logo InternIntern Consultia IT · ... and friends
                ...
            </div>
        </div>
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
                        <span class="text-green-300">src/</span>
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
                        <div class="m-auto w-[500px] pt-4">
                            <p class="text-2xl">Guillem Garcia Sans</p>
                            <p>
                                Mid-level 26 y/o fullstack web developer with 6
                                years of web development experience.
                            </p>
                            <div class="mt-10 flex justify-evenly gap-4">
                                <Button href={links.skills.path}>
                                    {trimExtension(links.skills.name)}
                                </Button>
                                <Button href={links.work.path}>
                                    {trimExtension(links.work.name)}
                                </Button>
                                <Button href={links.contact.path}>
                                    {trimExtension(links.contact.name)}
                                </Button>
                            </div>
                            <div class="mt-10">
                                <Sections></Sections>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
