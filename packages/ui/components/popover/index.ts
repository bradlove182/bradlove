import { Popover as PopoverPrimitive } from "bits-ui"
import Content from "./PopoverContent.svelte"
import Trigger from "./PopoverTrigger.svelte"

const Root = PopoverPrimitive.Root
const Close = PopoverPrimitive.Close
export {
    Close,
    Content,
    //
    Root as Popover,
    Close as PopoverClose,
    Content as PopoverContent,
    Trigger as PopoverTrigger,
    Root,
    Trigger,
}
