import { library, dom } from '@fortawesome/fontawesome-svg-core'
import {
    faCheck,
    faSearch,
    faHistory,
    faSitemap,
} from '@fortawesome/free-solid-svg-icons'

const icons = [
    faCheck,
    faSearch,
    faHistory,
    faSitemap,
]

// Only add used icons
icons.forEach((icon) => library.add(icon))

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch()

export default library
