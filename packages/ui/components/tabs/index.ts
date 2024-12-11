import { Tabs as TabsPrimitive } from "bits-ui"
import Content from "./TabsContent.svelte"
import List from "./TabsList.svelte"
import Trigger from "./TabsTrigger.svelte"

const Root = TabsPrimitive.Root

const Tabs = Object.assign(Root, {
    Content,
    List,
    Trigger,
})

export {
    Content,
    Content as TabsContent,
    List,
    List as TabsList,
    Root,
    //
    Root as Tabs,
    Trigger,
    Trigger as TabsTrigger,
}

export default Tabs
