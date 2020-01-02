import { initCallback } from './callbacks.js'
import { on } from './event.js'

// bulk initialize all components
document.body ? initCallback() : on( document, 'DOMContentLoaded', initCallback );
