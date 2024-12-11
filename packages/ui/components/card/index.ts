import Root from "./Card.svelte"
import Content from "./CardContent.svelte"
import Description from "./CardDescription.svelte"
import Footer from "./CardFooter.svelte"
import Header from "./CardHeader.svelte"
import Title from "./CardTitle.svelte"

const Card = Object.assign(Root, {
    Content,
    Description,
    Footer,
    Header,
    Title,
})

export {
    Content,
    Content as CardContent,
    Description,
    Description as CardDescription,
    Footer,
    Footer as CardFooter,
    Header,
    Header as CardHeader,
    Root,
    //
    Root as Card,
    Title,
    Title as CardTitle,
}

export default Card

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
