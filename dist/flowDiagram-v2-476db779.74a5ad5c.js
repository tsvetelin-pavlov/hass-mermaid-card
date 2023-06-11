import "./flowDiagram-93327f21.2092a181.js";
import "./flowDiagram-93327f21.06432b66.js";
import "./flowDiagram-93327f21.fa112a48.js";
import "./flowDiagram-93327f21.72160e6b.js";
import "./flowDiagram-93327f21.3637df2f.js";
import "./flowDiagram-93327f21.89779acc.js";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var parcelRequire = $parcel$global["parcelRequire94c2"];
parcelRequire.register("1V2Fn", function(module, exports) {

$parcel$export(module.exports, "diagram", () => $165d2ec793494549$export$6118d022d940d562);

var $4lfVT = parcelRequire("4lfVT");

var $3XLJx = parcelRequire("3XLJx");

var $8ZZbk = parcelRequire("8ZZbk");
parcelRequire("9ONqd");
parcelRequire("hp6PI");

parcelRequire("5Nl7d");
parcelRequire("lDnUH");



parcelRequire("7Sll6");

parcelRequire("72GQT");

parcelRequire("1rtij");
parcelRequire("gOlfO");
parcelRequire("aiFbc");



const $165d2ec793494549$export$6118d022d940d562 = {
    parser: $4lfVT.p,
    db: (0, $4lfVT.f),
    renderer: (0, $3XLJx.f),
    styles: (0, $3XLJx.a),
    init: (cnf)=>{
        if (!cnf.flowchart) cnf.flowchart = {};
        cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
        (0, $8ZZbk.q)({
            flowchart: {
                arrowMarkerAbsolute: cnf.arrowMarkerAbsolute
            }
        });
        (0, $3XLJx.f).setConf(cnf.flowchart);
        (0, $4lfVT.f).clear();
        (0, $4lfVT.f).setGen("gen-2");
    }
};

});
parcelRequire.register("3XLJx", function(module, exports) {

$parcel$export(module.exports, "f", () => $2e2be8afde55211e$export$2d1720544b23b823);
$parcel$export(module.exports, "a", () => $2e2be8afde55211e$export$407448d2b89b1813);

var $hp6PI = parcelRequire("hp6PI");

var $9ONqd = parcelRequire("9ONqd");

var $4lfVT = parcelRequire("4lfVT");

var $8ZZbk = parcelRequire("8ZZbk");

var $kdbIU = parcelRequire("kdbIU");

var $72GQT = parcelRequire("72GQT");

var $87kMk = parcelRequire("87kMk");
const $2e2be8afde55211e$var$conf = {};
const $2e2be8afde55211e$var$setConf = function(cnf) {
    const keys = Object.keys(cnf);
    for (const key of keys)$2e2be8afde55211e$var$conf[key] = cnf[key];
};
const $2e2be8afde55211e$var$addVertices = function(vert, g, svgId, root, doc, diagObj) {
    const svg = root.select(`[id="${svgId}"]`);
    const keys = Object.keys(vert);
    keys.forEach(function(id) {
        const vertex = vert[id];
        let classStr = "default";
        if (vertex.classes.length > 0) classStr = vertex.classes.join(" ");
        classStr = classStr + " flowchart-label";
        const styles = (0, $8ZZbk.k)(vertex.styles);
        let vertexText = vertex.text !== void 0 ? vertex.text : vertex.id;
        let vertexNode;
        (0, $8ZZbk.l).info("vertex", vertex, vertex.labelType);
        if (vertex.labelType === "markdown") (0, $8ZZbk.l).info("vertex", vertex, vertex.labelType);
        else if ((0, $8ZZbk.n)((0, $8ZZbk.c)().flowchart.htmlLabels)) {
            const node = {
                label: vertexText.replace(/fa[blrs]?:fa-[\w-]+/g, (s)=>`<i class='${s.replace(":", " ")}'></i>`)
            };
            vertexNode = (0, $72GQT.addHtmlLabel)(svg, node).node();
            vertexNode.parentNode.removeChild(vertexNode);
        } else {
            const svgLabel = doc.createElementNS("http://www.w3.org/2000/svg", "text");
            svgLabel.setAttribute("style", styles.labelStyle.replace("color:", "fill:"));
            const rows = vertexText.split((0, $8ZZbk.e).lineBreakRegex);
            for (const row of rows){
                const tspan = doc.createElementNS("http://www.w3.org/2000/svg", "tspan");
                tspan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
                tspan.setAttribute("dy", "1em");
                tspan.setAttribute("x", "1");
                tspan.textContent = row;
                svgLabel.appendChild(tspan);
            }
            vertexNode = svgLabel;
        }
        let radious = 0;
        let _shape = "";
        switch(vertex.type){
            case "round":
                radious = 5;
                _shape = "rect";
                break;
            case "square":
                _shape = "rect";
                break;
            case "diamond":
                _shape = "question";
                break;
            case "hexagon":
                _shape = "hexagon";
                break;
            case "odd":
                _shape = "rect_left_inv_arrow";
                break;
            case "lean_right":
                _shape = "lean_right";
                break;
            case "lean_left":
                _shape = "lean_left";
                break;
            case "trapezoid":
                _shape = "trapezoid";
                break;
            case "inv_trapezoid":
                _shape = "inv_trapezoid";
                break;
            case "odd_right":
                _shape = "rect_left_inv_arrow";
                break;
            case "circle":
                _shape = "circle";
                break;
            case "ellipse":
                _shape = "ellipse";
                break;
            case "stadium":
                _shape = "stadium";
                break;
            case "subroutine":
                _shape = "subroutine";
                break;
            case "cylinder":
                _shape = "cylinder";
                break;
            case "group":
                _shape = "rect";
                break;
            case "doublecircle":
                _shape = "doublecircle";
                break;
            default:
                _shape = "rect";
        }
        g.setNode(vertex.id, {
            labelStyle: styles.labelStyle,
            shape: _shape,
            labelText: vertexText,
            labelType: vertex.labelType,
            rx: radious,
            ry: radious,
            class: classStr,
            style: styles.style,
            id: vertex.id,
            link: vertex.link,
            linkTarget: vertex.linkTarget,
            tooltip: diagObj.db.getTooltip(vertex.id) || "",
            domId: diagObj.db.lookUpDomId(vertex.id),
            haveCallback: vertex.haveCallback,
            width: vertex.type === "group" ? 500 : void 0,
            dir: vertex.dir,
            type: vertex.type,
            props: vertex.props,
            padding: (0, $8ZZbk.c)().flowchart.padding
        });
        (0, $8ZZbk.l).info("setNode", {
            labelStyle: styles.labelStyle,
            labelType: vertex.labelType,
            shape: _shape,
            labelText: vertexText,
            rx: radious,
            ry: radious,
            class: classStr,
            style: styles.style,
            id: vertex.id,
            domId: diagObj.db.lookUpDomId(vertex.id),
            width: vertex.type === "group" ? 500 : void 0,
            type: vertex.type,
            dir: vertex.dir,
            props: vertex.props,
            padding: (0, $8ZZbk.c)().flowchart.padding
        });
    });
};
const $2e2be8afde55211e$var$addEdges = function(edges, g, diagObj) {
    (0, $8ZZbk.l).info("abc78 edges = ", edges);
    let cnt = 0;
    let linkIdCnt = {};
    let defaultStyle;
    let defaultLabelStyle;
    if (edges.defaultStyle !== void 0) {
        const defaultStyles = (0, $8ZZbk.k)(edges.defaultStyle);
        defaultStyle = defaultStyles.style;
        defaultLabelStyle = defaultStyles.labelStyle;
    }
    edges.forEach(function(edge) {
        cnt++;
        const linkIdBase = "L-" + edge.start + "-" + edge.end;
        if (linkIdCnt[linkIdBase] === void 0) {
            linkIdCnt[linkIdBase] = 0;
            (0, $8ZZbk.l).info("abc78 new entry", linkIdBase, linkIdCnt[linkIdBase]);
        } else {
            linkIdCnt[linkIdBase]++;
            (0, $8ZZbk.l).info("abc78 new entry", linkIdBase, linkIdCnt[linkIdBase]);
        }
        let linkId = linkIdBase + "-" + linkIdCnt[linkIdBase];
        (0, $8ZZbk.l).info("abc78 new link id to be used is", linkIdBase, linkId, linkIdCnt[linkIdBase]);
        const linkNameStart = "LS-" + edge.start;
        const linkNameEnd = "LE-" + edge.end;
        const edgeData = {
            style: "",
            labelStyle: ""
        };
        edgeData.minlen = edge.length || 1;
        if (edge.type === "arrow_open") edgeData.arrowhead = "none";
        else edgeData.arrowhead = "normal";
        edgeData.arrowTypeStart = "arrow_open";
        edgeData.arrowTypeEnd = "arrow_open";
        switch(edge.type){
            case "double_arrow_cross":
                edgeData.arrowTypeStart = "arrow_cross";
            case "arrow_cross":
                edgeData.arrowTypeEnd = "arrow_cross";
                break;
            case "double_arrow_point":
                edgeData.arrowTypeStart = "arrow_point";
            case "arrow_point":
                edgeData.arrowTypeEnd = "arrow_point";
                break;
            case "double_arrow_circle":
                edgeData.arrowTypeStart = "arrow_circle";
            case "arrow_circle":
                edgeData.arrowTypeEnd = "arrow_circle";
                break;
        }
        let style = "";
        let labelStyle = "";
        switch(edge.stroke){
            case "normal":
                style = "fill:none;";
                if (defaultStyle !== void 0) style = defaultStyle;
                if (defaultLabelStyle !== void 0) labelStyle = defaultLabelStyle;
                edgeData.thickness = "normal";
                edgeData.pattern = "solid";
                break;
            case "dotted":
                edgeData.thickness = "normal";
                edgeData.pattern = "dotted";
                edgeData.style = "fill:none;stroke-width:2px;stroke-dasharray:3;";
                break;
            case "thick":
                edgeData.thickness = "thick";
                edgeData.pattern = "solid";
                edgeData.style = "stroke-width: 3.5px;fill:none;";
                break;
            case "invisible":
                edgeData.thickness = "invisible";
                edgeData.pattern = "solid";
                edgeData.style = "stroke-width: 0;fill:none;";
                break;
        }
        if (edge.style !== void 0) {
            const styles = (0, $8ZZbk.k)(edge.style);
            style = styles.style;
            labelStyle = styles.labelStyle;
        }
        edgeData.style = edgeData.style += style;
        edgeData.labelStyle = edgeData.labelStyle += labelStyle;
        if (edge.interpolate !== void 0) edgeData.curve = (0, $8ZZbk.o)(edge.interpolate, (0, $9ONqd.curveLinear));
        else if (edges.defaultInterpolate !== void 0) edgeData.curve = (0, $8ZZbk.o)(edges.defaultInterpolate, (0, $9ONqd.curveLinear));
        else edgeData.curve = (0, $8ZZbk.o)($2e2be8afde55211e$var$conf.curve, (0, $9ONqd.curveLinear));
        if (edge.text === void 0) {
            if (edge.style !== void 0) edgeData.arrowheadStyle = "fill: #333";
        } else {
            edgeData.arrowheadStyle = "fill: #333";
            edgeData.labelpos = "c";
        }
        edgeData.labelType = edge.labelType;
        edgeData.label = edge.text.replace((0, $8ZZbk.e).lineBreakRegex, "\n");
        if (edge.style === void 0) edgeData.style = edgeData.style || "stroke: #333; stroke-width: 1.5px;fill:none;";
        edgeData.labelStyle = edgeData.labelStyle.replace("color:", "fill:");
        edgeData.id = linkId;
        edgeData.classes = "flowchart-link " + linkNameStart + " " + linkNameEnd;
        g.setEdge(edge.start, edge.end, edgeData, cnt);
    });
};
const $2e2be8afde55211e$var$getClasses = function(text, diagObj) {
    (0, $8ZZbk.l).info("Extracting classes");
    diagObj.db.clear();
    try {
        diagObj.parse(text);
        return diagObj.db.getClasses();
    } catch (e) {
        return;
    }
};
const $2e2be8afde55211e$var$draw = async function(text, id, _version, diagObj) {
    (0, $8ZZbk.l).info("Drawing flowchart");
    diagObj.db.clear();
    (0, $4lfVT.f).setGen("gen-2");
    diagObj.parser.parse(text);
    let dir = diagObj.db.getDirection();
    if (dir === void 0) dir = "TD";
    const { securityLevel: securityLevel , flowchart: conf2  } = (0, $8ZZbk.c)();
    const nodeSpacing = conf2.nodeSpacing || 50;
    const rankSpacing = conf2.rankSpacing || 50;
    let sandboxElement;
    if (securityLevel === "sandbox") sandboxElement = (0, $9ONqd.select)("#i" + id);
    const root = securityLevel === "sandbox" ? (0, $9ONqd.select)(sandboxElement.nodes()[0].contentDocument.body) : (0, $9ONqd.select)("body");
    const doc = securityLevel === "sandbox" ? sandboxElement.nodes()[0].contentDocument : document;
    const g = new $hp6PI.Graph({
        multigraph: true,
        compound: true
    }).setGraph({
        rankdir: dir,
        nodesep: nodeSpacing,
        ranksep: rankSpacing,
        marginx: 0,
        marginy: 0
    }).setDefaultEdgeLabel(function() {
        return {};
    });
    let subG;
    const subGraphs = diagObj.db.getSubGraphs();
    (0, $8ZZbk.l).info("Subgraphs - ", subGraphs);
    for(let i2 = subGraphs.length - 1; i2 >= 0; i2--){
        subG = subGraphs[i2];
        (0, $8ZZbk.l).info("Subgraph - ", subG);
        diagObj.db.addVertex(subG.id, {
            text: subG.title,
            type: subG.labelType
        }, "group", void 0, subG.classes, subG.dir);
    }
    const vert = diagObj.db.getVertices();
    const edges = diagObj.db.getEdges();
    (0, $8ZZbk.l).info("Edges", edges);
    let i = 0;
    for(i = subGraphs.length - 1; i >= 0; i--){
        subG = subGraphs[i];
        (0, $9ONqd.selectAll)("cluster").append("text");
        for(let j = 0; j < subG.nodes.length; j++){
            (0, $8ZZbk.l).info("Setting up subgraphs", subG.nodes[j], subG.id);
            g.setParent(subG.nodes[j], subG.id);
        }
    }
    $2e2be8afde55211e$var$addVertices(vert, g, id, root, doc, diagObj);
    $2e2be8afde55211e$var$addEdges(edges, g);
    const svg = root.select(`[id="${id}"]`);
    const element = root.select("#" + id + " g");
    await (0, $kdbIU.r)(element, g, [
        "point",
        "circle",
        "cross"
    ], "flowchart", id);
    (0, $8ZZbk.u).insertTitle(svg, "flowchartTitleText", conf2.titleTopMargin, diagObj.db.getDiagramTitle());
    (0, $8ZZbk.p)(g, svg, conf2.diagramPadding, conf2.useMaxWidth);
    diagObj.db.indexNodes("subGraph" + i);
    if (!conf2.htmlLabels) {
        const labels = doc.querySelectorAll('[id="' + id + '"] .edgeLabel .label');
        for (const label of labels){
            const dim = label.getBBox();
            const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("rx", 0);
            rect.setAttribute("ry", 0);
            rect.setAttribute("width", dim.width);
            rect.setAttribute("height", dim.height);
            label.insertBefore(rect, label.firstChild);
        }
    }
    const keys = Object.keys(vert);
    keys.forEach(function(key) {
        const vertex = vert[key];
        if (vertex.link) {
            const node = (0, $9ONqd.select)("#" + id + ' [id="' + key + '"]');
            if (node) {
                const link = doc.createElementNS("http://www.w3.org/2000/svg", "a");
                link.setAttributeNS("http://www.w3.org/2000/svg", "class", vertex.classes.join(" "));
                link.setAttributeNS("http://www.w3.org/2000/svg", "href", vertex.link);
                link.setAttributeNS("http://www.w3.org/2000/svg", "rel", "noopener");
                if (securityLevel === "sandbox") link.setAttributeNS("http://www.w3.org/2000/svg", "target", "_top");
                else if (vertex.linkTarget) link.setAttributeNS("http://www.w3.org/2000/svg", "target", vertex.linkTarget);
                const linkNode = node.insert(function() {
                    return link;
                }, ":first-child");
                const shape = node.select(".label-container");
                if (shape) linkNode.append(function() {
                    return shape.node();
                });
                const label = node.select(".label");
                if (label) linkNode.append(function() {
                    return label.node();
                });
            }
        }
    });
};
const $2e2be8afde55211e$export$2d1720544b23b823 = {
    setConf: $2e2be8afde55211e$var$setConf,
    addVertices: $2e2be8afde55211e$var$addVertices,
    addEdges: $2e2be8afde55211e$var$addEdges,
    getClasses: $2e2be8afde55211e$var$getClasses,
    draw: $2e2be8afde55211e$var$draw
};
const $2e2be8afde55211e$var$fade = (color, opacity)=>{
    const channel = $87kMk.channel;
    const r = channel(color, "r");
    const g = channel(color, "g");
    const b = channel(color, "b");
    return $87kMk.rgba(r, g, b, opacity);
};
const $2e2be8afde55211e$var$getStyles = (options)=>`.label {
    font-family: ${options.fontFamily};
    color: ${options.nodeTextColor || options.textColor};
  }
  .cluster-label text {
    fill: ${options.titleColor};
  }
  .cluster-label span,p {
    color: ${options.titleColor};
  }

  .label text,span,p {
    fill: ${options.nodeTextColor || options.textColor};
    color: ${options.nodeTextColor || options.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${options.mainBkg};
    stroke: ${options.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${options.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${options.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${options.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${options.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${options.edgeLabelBackground};
      fill: ${options.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${$2e2be8afde55211e$var$fade(options.edgeLabelBackground, 0.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${options.clusterBkg};
    stroke: ${options.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${options.titleColor};
  }

  .cluster span,p {
    color: ${options.titleColor};
  }
  /* .cluster div {
    color: ${options.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${options.fontFamily};
    font-size: 12px;
    background: ${options.tertiaryColor};
    border: 1px solid ${options.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${options.textColor};
  }
`;
const $2e2be8afde55211e$export$407448d2b89b1813 = $2e2be8afde55211e$var$getStyles;

});


parcelRequire.register("l9e2h", function(module, exports) {

$parcel$export(module.exports, "p", () => $f6555377bd3b71eb$export$ffb5f4729a158638);
$parcel$export(module.exports, "s", () => $f6555377bd3b71eb$export$2408f22a0fab9ae5);

var $9ONqd = parcelRequire("9ONqd");

var $8ZZbk = parcelRequire("8ZZbk");
let $f6555377bd3b71eb$var$edgeCount = 0;
const $f6555377bd3b71eb$var$drawEdge = function(elem, path, relation, conf, diagObj) {
    const getRelationType = function(type) {
        switch(type){
            case diagObj.db.relationType.AGGREGATION:
                return "aggregation";
            case diagObj.db.relationType.EXTENSION:
                return "extension";
            case diagObj.db.relationType.COMPOSITION:
                return "composition";
            case diagObj.db.relationType.DEPENDENCY:
                return "dependency";
            case diagObj.db.relationType.LOLLIPOP:
                return "lollipop";
        }
    };
    path.points = path.points.filter((p)=>!Number.isNaN(p.y));
    const lineData = path.points;
    const lineFunction = (0, $9ONqd.line)().x(function(d) {
        return d.x;
    }).y(function(d) {
        return d.y;
    }).curve((0, $9ONqd.curveBasis));
    const svgPath = elem.append("path").attr("d", lineFunction(lineData)).attr("id", "edge" + $f6555377bd3b71eb$var$edgeCount).attr("class", "relation");
    let url = "";
    if (conf.arrowMarkerAbsolute) {
        url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
        url = url.replace(/\(/g, "\\(");
        url = url.replace(/\)/g, "\\)");
    }
    if (relation.relation.lineType == 1) svgPath.attr("class", "relation dashed-line");
    if (relation.relation.lineType == 10) svgPath.attr("class", "relation dotted-line");
    if (relation.relation.type1 !== "none") svgPath.attr("marker-start", "url(" + url + "#" + getRelationType(relation.relation.type1) + "Start)");
    if (relation.relation.type2 !== "none") svgPath.attr("marker-end", "url(" + url + "#" + getRelationType(relation.relation.type2) + "End)");
    let x, y;
    const l = path.points.length;
    let labelPosition = (0, $8ZZbk.u).calcLabelPosition(path.points);
    x = labelPosition.x;
    y = labelPosition.y;
    let p1_card_x, p1_card_y;
    let p2_card_x, p2_card_y;
    if (l % 2 !== 0 && l > 1) {
        let cardinality_1_point = (0, $8ZZbk.u).calcCardinalityPosition(relation.relation.type1 !== "none", path.points, path.points[0]);
        let cardinality_2_point = (0, $8ZZbk.u).calcCardinalityPosition(relation.relation.type2 !== "none", path.points, path.points[l - 1]);
        (0, $8ZZbk.l).debug("cardinality_1_point " + JSON.stringify(cardinality_1_point));
        (0, $8ZZbk.l).debug("cardinality_2_point " + JSON.stringify(cardinality_2_point));
        p1_card_x = cardinality_1_point.x;
        p1_card_y = cardinality_1_point.y;
        p2_card_x = cardinality_2_point.x;
        p2_card_y = cardinality_2_point.y;
    }
    if (relation.title !== void 0) {
        const g = elem.append("g").attr("class", "classLabel");
        const label = g.append("text").attr("class", "label").attr("x", x).attr("y", y).attr("fill", "red").attr("text-anchor", "middle").text(relation.title);
        window.label = label;
        const bounds = label.node().getBBox();
        g.insert("rect", ":first-child").attr("class", "box").attr("x", bounds.x - conf.padding / 2).attr("y", bounds.y - conf.padding / 2).attr("width", bounds.width + conf.padding).attr("height", bounds.height + conf.padding);
    }
    (0, $8ZZbk.l).info("Rendering relation " + JSON.stringify(relation));
    if (relation.relationTitle1 !== void 0 && relation.relationTitle1 !== "none") {
        const g = elem.append("g").attr("class", "cardinality");
        g.append("text").attr("class", "type1").attr("x", p1_card_x).attr("y", p1_card_y).attr("fill", "black").attr("font-size", "6").text(relation.relationTitle1);
    }
    if (relation.relationTitle2 !== void 0 && relation.relationTitle2 !== "none") {
        const g = elem.append("g").attr("class", "cardinality");
        g.append("text").attr("class", "type2").attr("x", p2_card_x).attr("y", p2_card_y).attr("fill", "black").attr("font-size", "6").text(relation.relationTitle2);
    }
    $f6555377bd3b71eb$var$edgeCount++;
};
const $f6555377bd3b71eb$var$drawClass = function(elem, classDef, conf, diagObj) {
    (0, $8ZZbk.l).debug("Rendering class ", classDef, conf);
    const id = classDef.id;
    const classInfo = {
        id: id,
        label: classDef.id,
        width: 0,
        height: 0
    };
    const g = elem.append("g").attr("id", diagObj.db.lookUpDomId(id)).attr("class", "classGroup");
    let title;
    if (classDef.link) title = g.append("svg:a").attr("xlink:href", classDef.link).attr("target", classDef.linkTarget).append("text").attr("y", conf.textHeight + conf.padding).attr("x", 0);
    else title = g.append("text").attr("y", conf.textHeight + conf.padding).attr("x", 0);
    let isFirst = true;
    classDef.annotations.forEach(function(member) {
        const titleText2 = title.append("tspan").text("\xab" + member + "\xbb");
        if (!isFirst) titleText2.attr("dy", conf.textHeight);
        isFirst = false;
    });
    let classTitleString = $f6555377bd3b71eb$var$getClassTitleString(classDef);
    const classTitle = title.append("tspan").text(classTitleString).attr("class", "title");
    if (!isFirst) classTitle.attr("dy", conf.textHeight);
    const titleHeight = title.node().getBBox().height;
    const membersLine = g.append("line").attr("x1", 0).attr("y1", conf.padding + titleHeight + conf.dividerMargin / 2).attr("y2", conf.padding + titleHeight + conf.dividerMargin / 2);
    const members = g.append("text").attr("x", conf.padding).attr("y", titleHeight + conf.dividerMargin + conf.textHeight).attr("fill", "white").attr("class", "classText");
    isFirst = true;
    classDef.members.forEach(function(member) {
        $f6555377bd3b71eb$var$addTspan(members, member, isFirst, conf);
        isFirst = false;
    });
    const membersBox = members.node().getBBox();
    const methodsLine = g.append("line").attr("x1", 0).attr("y1", conf.padding + titleHeight + conf.dividerMargin + membersBox.height).attr("y2", conf.padding + titleHeight + conf.dividerMargin + membersBox.height);
    const methods = g.append("text").attr("x", conf.padding).attr("y", titleHeight + 2 * conf.dividerMargin + membersBox.height + conf.textHeight).attr("fill", "white").attr("class", "classText");
    isFirst = true;
    classDef.methods.forEach(function(method) {
        $f6555377bd3b71eb$var$addTspan(methods, method, isFirst, conf);
        isFirst = false;
    });
    const classBox = g.node().getBBox();
    var cssClassStr = " ";
    if (classDef.cssClasses.length > 0) cssClassStr = cssClassStr + classDef.cssClasses.join(" ");
    const rect = g.insert("rect", ":first-child").attr("x", 0).attr("y", 0).attr("width", classBox.width + 2 * conf.padding).attr("height", classBox.height + conf.padding + 0.5 * conf.dividerMargin).attr("class", cssClassStr);
    const rectWidth = rect.node().getBBox().width;
    title.node().childNodes.forEach(function(x) {
        x.setAttribute("x", (rectWidth - x.getBBox().width) / 2);
    });
    if (classDef.tooltip) title.insert("title").text(classDef.tooltip);
    membersLine.attr("x2", rectWidth);
    methodsLine.attr("x2", rectWidth);
    classInfo.width = rectWidth;
    classInfo.height = classBox.height + conf.padding + 0.5 * conf.dividerMargin;
    return classInfo;
};
const $f6555377bd3b71eb$var$getClassTitleString = function(classDef) {
    let classTitleString = classDef.id;
    if (classDef.type) classTitleString += "<" + classDef.type + ">";
    return classTitleString;
};
const $f6555377bd3b71eb$var$drawNote = function(elem, note, conf, diagObj) {
    (0, $8ZZbk.l).debug("Rendering note ", note, conf);
    const id = note.id;
    const noteInfo = {
        id: id,
        text: note.text,
        width: 0,
        height: 0
    };
    const g = elem.append("g").attr("id", id).attr("class", "classGroup");
    let text = g.append("text").attr("y", conf.textHeight + conf.padding).attr("x", 0);
    const lines = JSON.parse(`"${note.text}"`).split("\n");
    lines.forEach(function(line2) {
        (0, $8ZZbk.l).debug(`Adding line: ${line2}`);
        text.append("tspan").text(line2).attr("class", "title").attr("dy", conf.textHeight);
    });
    const noteBox = g.node().getBBox();
    const rect = g.insert("rect", ":first-child").attr("x", 0).attr("y", 0).attr("width", noteBox.width + 2 * conf.padding).attr("height", noteBox.height + lines.length * conf.textHeight + conf.padding + 0.5 * conf.dividerMargin);
    const rectWidth = rect.node().getBBox().width;
    text.node().childNodes.forEach(function(x) {
        x.setAttribute("x", (rectWidth - x.getBBox().width) / 2);
    });
    noteInfo.width = rectWidth;
    noteInfo.height = noteBox.height + lines.length * conf.textHeight + conf.padding + 0.5 * conf.dividerMargin;
    return noteInfo;
};
const $f6555377bd3b71eb$export$ffb5f4729a158638 = function(text) {
    let displayText = "";
    let cssStyle = "";
    let returnType = "";
    let visibility = "";
    let firstChar = text.substring(0, 1);
    let lastChar = text.substring(text.length - 1, text.length);
    if (firstChar.match(/[#+~-]/)) visibility = firstChar;
    let noClassifierRe = /[\s\w)~]/;
    if (!lastChar.match(noClassifierRe)) cssStyle = $f6555377bd3b71eb$var$parseClassifier(lastChar);
    const startIndex = visibility === "" ? 0 : 1;
    let endIndex = cssStyle === "" ? text.length : text.length - 1;
    text = text.substring(startIndex, endIndex);
    const methodStart = text.indexOf("(");
    const methodEnd = text.indexOf(")");
    const isMethod = methodStart > 1 && methodEnd > methodStart && methodEnd <= text.length;
    if (isMethod) {
        let methodName = text.substring(0, methodStart).trim();
        const parameters = text.substring(methodStart + 1, methodEnd);
        displayText = visibility + methodName + "(" + (0, $8ZZbk.x)(parameters.trim()) + ")";
        if (methodEnd < text.length) {
            let potentialClassifier = text.substring(methodEnd + 1, methodEnd + 2);
            if (cssStyle === "" && !potentialClassifier.match(noClassifierRe)) {
                cssStyle = $f6555377bd3b71eb$var$parseClassifier(potentialClassifier);
                returnType = text.substring(methodEnd + 2).trim();
            } else returnType = text.substring(methodEnd + 1).trim();
            if (returnType !== "") {
                if (returnType.charAt(0) === ":") returnType = returnType.substring(1).trim();
                returnType = " : " + (0, $8ZZbk.x)(returnType);
                displayText += returnType;
            }
        }
    } else displayText = visibility + (0, $8ZZbk.x)(text);
    return {
        displayText: displayText,
        cssStyle: cssStyle
    };
};
const $f6555377bd3b71eb$var$addTspan = function(textEl, txt, isFirst, conf) {
    let member = $f6555377bd3b71eb$export$ffb5f4729a158638(txt);
    const tSpan = textEl.append("tspan").attr("x", conf.padding).text(member.displayText);
    if (member.cssStyle !== "") tSpan.attr("style", member.cssStyle);
    if (!isFirst) tSpan.attr("dy", conf.textHeight);
};
const $f6555377bd3b71eb$var$parseClassifier = function(classifier) {
    switch(classifier){
        case "*":
            return "font-style:italic;";
        case "$":
            return "text-decoration:underline;";
        default:
            return "";
    }
};
const $f6555377bd3b71eb$export$2408f22a0fab9ae5 = {
    getClassTitleString: $f6555377bd3b71eb$var$getClassTitleString,
    drawClass: $f6555377bd3b71eb$var$drawClass,
    drawEdge: $f6555377bd3b71eb$var$drawEdge,
    drawNote: $f6555377bd3b71eb$var$drawNote,
    parseMember: $f6555377bd3b71eb$export$ffb5f4729a158638
};

});


//# sourceMappingURL=flowDiagram-v2-476db779.74a5ad5c.js.map
