import { Show, Switch, Match, For, JSX, createSignal } from 'solid-js'
import { A } from '@solidjs/router'
import * as Icons from './Icons'

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
    onClick?: () => void
    children: JSX.Element
}

function Button(props: ButtonProps) {
    const btn = (
        <button
            onClick={props.onClick}
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
    isInternship: boolean
    title: {
        content: string
        href: string
    }
    period: string
    mainPoints: JSX.Element[]
    skills: {
        primary: string[]
        secondary: string[]
    }
}

function WorkExperience(props: WorkExperienceProps) {
    let border = 'border-2 border-stone-400'
    if (props.isInternship) {
        border = 'border border-stone-600'
    }

    return (
        <div class={`rounded ${border} p-4`}>
            <p class="text-base font-medium">
                <a
                    class="flex items-center"
                    href={props.title.href}
                    target="_blank"
                >
                    <span class="pr-1">
                        <Icons.Link />
                    </span>
                    {props.title.content}
                </a>
            </p>
            <div class="pl-5">
                <p>{props.period}</p>
                <ul class="mt-2 list-disc pl-4 leading-4">
                    <For each={props.mainPoints}>
                        {(point) => <li class="mt-1">{point}</li>}
                    </For>
                </ul>
                <div class="mt-4 flex flex-col items-end gap-2">
                    <div class="flex gap-2">
                        <For each={props.skills.primary}>
                            {(skill) => (
                                <span class="rounded-full border border-stone-700 bg-stone-500 py-1.5 px-2.5">
                                    {skill}
                                </span>
                            )}
                        </For>
                    </div>
                    <div class="flex gap-2">
                        <For each={props.skills.secondary}>
                            {(skill) => (
                                <span class="rounded-full border border-stone-600 py-1.5 px-2.5">
                                    {skill}
                                </span>
                            )}
                        </For>
                    </div>
                </div>
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
    isInternship: false,
    title: {
        content: 'Spiral Pricing',
        href: 'https://www.spiral-pricing.com/',
    },
    period: 'Aug 2019 - Jan 2023 (3 years 6 months)',
    mainPoints: [
        `Worked as the lead developer of the company.`,
        <>
            Developed{' '}
            <span class="font-bold">
                <ExternalLink href="https://spiral-seller.com/ar/">
                    Spiral Seller
                </ExternalLink>
            </span>
            , an ecommerce intelligence solution for the Mercadolibre
            marketplace
        </>,
        `Managed multiregional postgresql databases on AWS rds`,
        'Worked as the lead developer and the tech lead of the company.',
        'Worked with NoSQL databases with both Documentdb (AWS) and cosmosdb (Azure).',
        'Created many integrations with Mercadolibre API using typescript.',
        'Had 70%+ code coverage testing with unit and integration tests using jest and puppeteer.',
        'Improved performance of some webhook services using golang.',
        'Developed webscraping services using puppeteer and Apify.',
        'Containerized nodejs backend with docker and nginx for load balancing.',
        'Optimized typescript build times using esbuild and vitejs on the front end, and SWC on the backend.',
    ],
    skills: {
        primary: ['typescript', 'nodejs', 'Postgresql', 'AWS', 'Go'],
        secondary: ['DocumentDB', 'Apify', 'Docker', 'Azure', 'CosmosDB'],
    },
}

const ditecGroup: WorkExperienceProps = {
    isInternship: false,
    title: {
        content: 'Ditec Group',
        href: 'https://ditec.es/en/',
    },
    period: 'Feb 2019 - Jul 2019 (6 months)',
    mainPoints: [
        'Developed an internal audio routing app',
        'Single handedly built a reactjs SPA to manage audio sources in Operation Rooms.',
        'Had 80+% code coverage with unit and integrations tests using Jasmine',
        'Set up complex build pipelines with webpack.',
        'Maintained and debugged complex audio drivers in javascript.',
    ],
    skills: {
        primary: ['javascript', 'Reactjs', 'nodejs', 'MySQL'],
        secondary: ['scrum', 'CSS'],
    },
}

const consultia: WorkExperienceProps = {
    isInternship: true,
    title: {
        content: 'Consultia',
        href: 'https://www.consultia.biz/',
    },
    period: 'Oct 2018 - Feb 2019 (5 months)',
    mainPoints: [
        'Maintainance of legacy java apps',
        'Maintainance of SQL server',
    ],
    skills: {
        primary: ['java', 'javascript', 'SQL Server'],
        secondary: [],
    },
}

const ntropia: WorkExperienceProps = {
    isInternship: true,
    title: {
        content: 'n-tropia',
        href: 'https://n-tropia.com/',
    },
    period: 'Sep 2017 - May 2018 (9 months)',
    mainPoints: [
        'Heavy CSS responsive development',
        'First hand experience into JQuery callback hell',
    ],
    skills: {
        primary: ['javascript', 'CSS', 'jQuery', 'Bootstrap', 'UX/UI'],
        secondary: ['PHP', 'LAMP', 'linux'],
    },
}

const whitesheepIT: WorkExperienceProps = {
    isInternship: true,
    title: {
        content: 'Whitesheep-IT',
        href: 'https://whitesheep-it.de/',
    },
    period: 'Jun 2017 - Aug 2017 (3 months)',
    mainPoints: [
        'My very first experience into basic web development',
        'Did help setup LAMP servers',
    ],
    skills: {
        primary: ['javascript', 'HTML', 'CSS', 'PHP', 'LAMP'],
        secondary: [],
    },
}

const internships = [consultia, ntropia, whitesheepIT]

function Sections() {
    const [shown, setShown] = createSignal(false)

    function toggle() {
        setShown((shown) => !shown)
    }

    return (
        <div class="flex flex-col gap-4 pb-4">
            <WorkExperience {...spiralPricing}></WorkExperience>
            <WorkExperience {...ditecGroup}></WorkExperience>

            <div class="flex justify-center">
                <Button onClick={toggle}>
                    {shown() ? 'Hide internships' : 'Show internships'}
                </Button>
            </div>
            <Show when={shown()}>
                <For each={internships}>
                    {(internship) => (
                        <WorkExperience {...internship}></WorkExperience>
                    )}
                </For>
            </Show>
        </div>
    )
}

function Sidebar() {
    return (
        <div class="w-[210px] border-r border-stone-600 pt-4">
            <p class="pr-2 text-lime-300">/guillem/projects/portfolio/</p>
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
            <A class="block bg-neutral-700 pl-4" href={links.readme.path}>
                {links.readme.name}
            </A>
        </div>
    )
}

function App() {
    return (
        <div class="flex flex-col overflow-y-hidden bg-neutral-800 text-xs text-white">
            <div class="flex grow">
                <Sidebar></Sidebar>
                <div class="flex grow pl-2">
                    <div class="mr-4 h-screen w-4 overflow-hidden text-left text-gray-500">
                        <For each={totalLines}>{(p) => p}</For>
                    </div>
                    <div class="grow">
                        <div class="m-auto flex h-screen w-[500px] flex-col pt-4">
                            <p class="text-2xl font-medium">
                                Guillem Garcia Sans
                            </p>
                            <p>
                                Mid-level 26 y/o fullstack web developer with 6
                                years of web development experience.
                            </p>
                            <div class="mt-4 flex justify-evenly gap-4">
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

                            <div class="scroll-gutter-stable mt-4 grow overflow-y-auto pr-1">
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
