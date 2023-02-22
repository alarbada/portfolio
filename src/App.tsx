import { Show, Switch, Match, For, JSX, createSignal, createEffect } from 'solid-js'
import {
    A,
    Routes,
    Route,
    Navigate,
    useNavigate,
    useSearchParams,
} from '@solidjs/router'
import * as Icons from './Icons'



function Work() {
    const [showInternships, setShowInternships] = createSignal(false)
    const [searchParams] = useSearchParams()

    function toggle() {
        setShowInternships((shown) => !shown)
    }

    function shouldShowExperience(skill: string | undefined, props: WorkExperienceProps) {
        if (skill === undefined) {
            return true
        }
        if (props.skills.primary.includes(skill)) {
            return true
        }
        if (props.skills.secondary.includes(skill)) {
            return true
        }

        return false
    }

    return (
        <div class="flex flex-col gap-4 pb-4">
            <Show when={searchParams.skill === undefined}>
                <WorkExperience {...spiralPricing}></WorkExperience>
                <WorkExperience {...ditecGroup}></WorkExperience>

                <Show when={!showInternships()}>
                    <div class="flex justify-center">
                        <Button onClick={toggle}>Show internships</Button>
                    </div>
                </Show>
                <Show when={showInternships()}>
                    <For each={internships}>
                        {(internship) => (
                            <WorkExperience {...internship}></WorkExperience>
                        )}
                    </For>
                </Show>
            </Show>
            <Show when={searchParams.skill !== undefined}>
                <For each={allWorkExperiences}>
                    {(experience) => (
                        <Show when={shouldShowExperience(searchParams.skill, experience)}>
                            <WorkExperience {...experience}></WorkExperience>
                        </Show>
                    )}
                </For>
            </Show>
        </div>
    )
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

    function InternshipLabel() {
        return (
            <div class="absolute top-0 right-0 rounded-bl rounded-tr bg-stone-700  py-1.5 px-2.5">
                internship
            </div>
        )
    }

    return (
        <div class={`relative rounded ${border} p-4`}>
            {props.isInternship && <InternshipLabel />}
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
                            {(skill) => <Skill name={skill} primary></Skill>}
                        </For>
                        </div>
                    <div class="flex gap-2">
                        <For each={props.skills.secondary}>
                            {(skill) => <Skill name={skill}></Skill>}
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

type Level = { level: 'strong' | 'medium' | 'weak' }

const skills = new Map<string, Level>()
skills.set('typescript', { level: 'strong' })
skills.set('javascript', { level: 'strong' })
skills.set('nodejs', { level: 'strong' })
skills.set('Postgresql', { level: 'strong' })
skills.set('Reactjs', { level: 'strong' })
skills.set('MySQL', { level: 'strong' })
skills.set('scrum', { level: 'strong' })
skills.set('CSS', { level: 'strong' })
skills.set('linux', { level: 'strong' })
skills.set('HTML', { level: 'strong' })
skills.set('AWS', { level: 'medium' })
skills.set('Go', { level: 'medium' })
skills.set('DocumentDB', { level: 'medium' })
skills.set('UX/UI', { level: 'medium' })
skills.set('PHP', { level: 'medium' })
skills.set('LAMP', { level: 'medium' })
skills.set('Apify', { level: 'weak' })
skills.set('Docker', { level: 'weak' })
skills.set('Azure', { level: 'weak' })
skills.set('CosmosDB', { level: 'weak' })
skills.set('java', { level: 'weak' })
skills.set('SQL Server', { level: 'weak' })
skills.set('jQuery', { level: 'weak' })
skills.set('Bootstrap', { level: 'weak' })

/**
 * assertKey asserts that the skills given for each work experience do indeed
 * exist. This exists to prevent type mistakes.
 */
function assertKey(key: string): string {
    if (skills.has(key)) {
        return key
    }

    throw new Error(
        `The key ${key} does not exist on skills map, please use the corresponding one`
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
        primary: ['typescript', 'nodejs', 'Postgresql', 'AWS', 'Go'].map(
            assertKey
        ),
        secondary: ['DocumentDB', 'Apify', 'Docker', 'Azure', 'CosmosDB'].map(
            assertKey
        ),
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
        primary: ['javascript', 'Reactjs', 'nodejs', 'MySQL'].map(assertKey),
        secondary: ['scrum', 'CSS'].map(assertKey),
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
        primary: ['java', 'javascript', 'SQL Server'].map(assertKey),
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
        primary: ['javascript', 'CSS', 'jQuery', 'Bootstrap', 'UX/UI'].map(
            assertKey
        ),
        secondary: ['PHP', 'LAMP', 'linux'].map(assertKey),
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
        primary: ['javascript', 'HTML', 'CSS', 'PHP', 'LAMP'].map(assertKey),
        secondary: [],
    },
}

const internships = [consultia, ntropia, whitesheepIT]
const allWorkExperiences = [spiralPricing, ditecGroup, ...internships]

function Skill(props: { name: string; primary?: boolean }) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`${workLink.path}?skill=${props.name}`)
    }

    return (
        <Switch>
            <Match when={props.primary}>
                <span
                    class="cursor-pointer rounded-full border border-stone-700 bg-stone-500 py-1.5 px-2.5 transition hover:bg-stone-600"
                    onClick={handleClick}
                >
                    {props.name}
                </span>
            </Match>
            <Match when={!props.primary}>
                <span
                    class="cursor-pointer rounded-full border border-stone-600 py-1.5 px-2.5 transition hover:bg-stone-600"
                    onClick={handleClick}
                >
                    {props.name}
                </span>
            </Match>
        </Switch>
    )
}

function Skills() {
    const allSkills = [...skills]

    const strong = allSkills.filter((skill) => skill[1].level === 'strong')
    const medium = allSkills.filter((skill) => skill[1].level === 'medium')
    const weak = allSkills.filter((skill) => skill[1].level === 'weak')

    function Row(props: { skills: [string, Level][] }) {
        return (
            <div class="flex flex-wrap gap-2">
                <For each={props.skills}>
                    {(skill) => <Skill name={skill[0]}></Skill>}
                </For>
            </div>
        )
    }

    return (
        <div class="flex flex-col gap-4">
            <div class="rounded border-2 border-stone-400 p-4">
                <p class="mb-4 text-base font-medium">Strong</p>
                <Row skills={strong}></Row>
            </div>
            <div class="rounded border-2 border-stone-400 p-4">
                <p class="mb-4 text-base font-medium">Medium</p>
                <Row skills={medium}></Row>
            </div>
            <div class="rounded border-2 border-stone-400 p-4">
                <p class="mb-4 text-base font-medium">Weak</p>
                <Row skills={weak}></Row>
            </div>
        </div>
    )
}

function Contact() {
    return <div>contact</div>
}

const readmeLink = {
    name: 'README.md',
    path: '/readme',
}

const workLink = {
    name: 'work.ts',
    path: '/work',
    component: Work,
}

const links = [
    workLink,
    {
        name: 'skills.sql',
        path: '/skills',
        component: Skills,
    },
    {
        name: 'contact.js',
        path: '/contact',
        component: Contact,
    },
]

function trimExtension(file: string): string {
    const [filename] = file.split('.')
    if (filename === undefined) {
        throw new Error(`file ${file} should have an extension`)
    }

    return filename
}

function Sections() {
    return (
        <Routes>
            <For each={links}>
                {(link) => (
                    <Route path={link.path} component={link.component} />
                )}
            </For>
            <Route path={readmeLink.path} component={Work} />
            <Route path="*" element={<Navigate href={readmeLink.path} />} />
        </Routes>
    )
}

function App() {
    return (
        <div class="flex flex-col overflow-y-hidden bg-neutral-800 text-xs text-white print:text-black">
            <div class="flex grow">
                <div class="flex grow pl-2">
                    <div class="grow">
                        <div class="m-auto flex h-screen w-[700px] flex-col pt-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-2xl font-medium">
                                        Guillem Garcia Sans
                                    </p>
                                    <p>
                                        Mid-level 26 y/o fullstack web developer
                                    </p>
                                </div>

                                <div class="flex gap-2">
                                    <a
                                        href="https://github.com/not-rusty"
                                        target="_blank"
                                    >
                                        <Icons.Github></Icons.Github>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/guillem-garcia/"
                                        target="_blank"
                                    >
                                        <Icons.Linkedin></Icons.Linkedin>
                                    </a>
                                </div>
                            </div>
                            <p>Developing software since 2017</p>
                            <div class="mt-4 flex justify-evenly gap-4">
                                <For each={links}>
                                    {(link) => (
                                        <Button href={link.path}>
                                            {trimExtension(link.name)}
                                        </Button>
                                    )}
                                </For>
                            </div>

                            <div class="scroll-gutter-stable mt-4 grow overflow-y-auto pr-1">
                                <Sections />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
