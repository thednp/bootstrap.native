import queryElement from 'shorter-js/src/misc/queryElement.js'
import normalizeValue from 'shorter-js/src/misc/normalizeValue.js'
import getTargetElement from './getTargetElement.js'

export default function( element, defaultOptions, inputOptions ) {
  const normalOptions = {}, dataOptions = {}, 
      data = Object.assign( {}, element.dataset ),
      targetOps = [ 'target', 'parent', 'container' ]

  Object.keys( data )
    .map( k => {
      let key = k.replace('bs','')
                 .replace(/[A-Z]/, (match) => match.toLowerCase() )

      dataOptions[key] = targetOps.includes(key) ? getTargetElement( element )
                       : normalizeValue( data[k] )
    })

  Object.keys( inputOptions )
    .map( k => {
      inputOptions[k] = targetOps.includes(k) 
        ? ( inputOptions[k] instanceof Element ? inputOptions[k] 
            : k === 'parent' ? element.closest( inputOptions[k] ) 
            : queryElement( inputOptions[k] ) )
        : normalizeValue( inputOptions[k] )
    })

  Object.keys( defaultOptions )
    .map( k => {
      normalOptions[k] = k in inputOptions ? inputOptions[k]
                       : k in dataOptions ? dataOptions[k]
                       : defaultOptions[k]
    })

  return normalOptions
}