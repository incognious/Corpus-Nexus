const topicWeb = document.querySelector(".topic-web");
const nodes = Array.from(document.querySelectorAll(".web-node[data-node]"));
const links = Array.from(document.querySelectorAll(".web-lines line[data-link]"));

const nodeMap = new Map(nodes.map((node) => [node.dataset.node, node]));

const svg = document.querySelector(".web-lines");

const getNodeCenterInSvg = (node) => {
  const nodeRect = node.getBoundingClientRect();
  const point = svg.createSVGPoint();
  point.x = nodeRect.left + nodeRect.width / 2;
  point.y = nodeRect.top + nodeRect.height / 2;

  return point.matrixTransform(svg.getScreenCTM().inverse());
};

const syncLinesToNodes = () => {
  if (!svg) return;

  links.forEach((line) => {
    const [fromId, toId] = line.dataset.link.split(" ");
    const from = nodeMap.get(fromId);
    const to = nodeMap.get(toId);

    if (!from || !to) return;

    const fromPoint = getNodeCenterInSvg(from);
    const toPoint = getNodeCenterInSvg(to);

    line.setAttribute("x1", fromPoint.x.toFixed(1));
    line.setAttribute("y1", fromPoint.y.toFixed(1));
    line.setAttribute("x2", toPoint.x.toFixed(1));
    line.setAttribute("y2", toPoint.y.toFixed(1));
  });
};

const trackFloatingNodes = () => {
  syncLinesToNodes();
  requestAnimationFrame(trackFloatingNodes);
};

const clearHighlight = () => {
  topicWeb?.classList.remove("is-highlighting");
  nodes.forEach((node) => node.classList.remove("is-active", "is-connected", "is-dimmed"));
  links.forEach((line) => line.classList.remove("is-active", "is-dimmed"));
};

const highlightNode = (nodeId) => {
  const connected = new Set([nodeId]);

  links.forEach((line) => {
    const lineNodes = line.dataset.link.split(" ");
    const isConnected = lineNodes.includes(nodeId);

    line.classList.toggle("is-active", isConnected);
    line.classList.toggle("is-dimmed", !isConnected);

    if (isConnected) {
      lineNodes.forEach((id) => connected.add(id));
    }
  });

  topicWeb?.classList.add("is-highlighting");

  nodes.forEach((node) => {
    const isActive = node.dataset.node === nodeId;
    const isConnected = connected.has(node.dataset.node);

    node.classList.toggle("is-active", isActive);
    node.classList.toggle("is-connected", !isActive && isConnected);
    node.classList.toggle("is-dimmed", !isConnected);
  });
};

nodes.forEach((node) => {
  node.addEventListener("mouseenter", () => highlightNode(node.dataset.node));
  node.addEventListener("focus", () => highlightNode(node.dataset.node));
  node.addEventListener("mouseleave", clearHighlight);
  node.addEventListener("blur", clearHighlight);
});

trackFloatingNodes();
window.addEventListener("resize", syncLinesToNodes);
