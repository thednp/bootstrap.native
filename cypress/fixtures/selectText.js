/**
 * Returns an `Array` with all `#text` nodes in a Node. 
 * @param {Node} target root node
 * @returns {Node[]} the requested nodes
 */
function getTextNodes(target) {
  if (target.nodeType === 3) {
    return [target];
  }

  let nodes = [];
  const doc = target.ownerDocument;
  const win = doc.defaultView;
  const walk = doc.createTreeWalker(target, win.NodeFilter.SHOW_TEXT, null);
  let node;

  while (node = walk.nextNode()) {
    if (node.nodeType === 3) {
      nodes = [...nodes, node];
    }
  }
  return nodes;
}

/**
 * Select all the text of the first textNode of a given element.
 * @param {Node} target target element
 */
export default function selectText(target) {
  const textNodes = getTextNodes(target);
  const [startNode, endNode] = [...textNodes.slice(0,1), ...textNodes.slice(-1)];
  const doc = target.ownerDocument;
  const win = doc.defaultView;

  const range = new win.Range();
  range.setStart(startNode , 0);
  range.setEnd(endNode, endNode.textContent.length);
  win.getSelection().removeAllRanges();
  win.getSelection().addRange(range);
}