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
parcelRequire.register("hp6PI", function(module, exports) {

$parcel$export(module.exports, "Graph", () => (parcelRequire("8ZhJ2")).Graph);
// Includes only the "core" of graphlib

var $8ZhJ2 = parcelRequire("8ZhJ2");
const $caba125c7a92af72$export$83d89fbfd8236492 = "2.1.9-pre";

});
parcelRequire.register("8ZhJ2", function(module, exports) {

$parcel$export(module.exports, "Graph", () => $68b1c521923d213c$export$614db49f3febe941);

var $cojSg = parcelRequire("cojSg");
var $68b1c521923d213c$var$DEFAULT_EDGE_NAME = "\x00";
var $68b1c521923d213c$var$GRAPH_NODE = "\x00";
var $68b1c521923d213c$var$EDGE_KEY_DELIM = "\x01";
class $68b1c521923d213c$export$614db49f3febe941 {
    constructor(opts = {}){
        this._isDirected = $cojSg.has(opts, "directed") ? opts.directed : true;
        this._isMultigraph = $cojSg.has(opts, "multigraph") ? opts.multigraph : false;
        this._isCompound = $cojSg.has(opts, "compound") ? opts.compound : false;
        // Label for the graph itself
        this._label = undefined;
        // Defaults to be set when creating a new node
        this._defaultNodeLabelFn = $cojSg.constant(undefined);
        // Defaults to be set when creating a new edge
        this._defaultEdgeLabelFn = $cojSg.constant(undefined);
        // v -> label
        this._nodes = {};
        if (this._isCompound) {
            // v -> parent
            this._parent = {};
            // v -> children
            this._children = {};
            this._children[$68b1c521923d213c$var$GRAPH_NODE] = {};
        }
        // v -> edgeObj
        this._in = {};
        // u -> v -> Number
        this._preds = {};
        // v -> edgeObj
        this._out = {};
        // v -> w -> Number
        this._sucs = {};
        // e -> edgeObj
        this._edgeObjs = {};
        // e -> label
        this._edgeLabels = {};
    }
    /* === Graph functions ========= */ isDirected() {
        return this._isDirected;
    }
    isMultigraph() {
        return this._isMultigraph;
    }
    isCompound() {
        return this._isCompound;
    }
    setGraph(label) {
        this._label = label;
        return this;
    }
    graph() {
        return this._label;
    }
    /* === Node functions ========== */ setDefaultNodeLabel(newDefault) {
        if (!$cojSg.isFunction(newDefault)) newDefault = $cojSg.constant(newDefault);
        this._defaultNodeLabelFn = newDefault;
        return this;
    }
    nodeCount() {
        return this._nodeCount;
    }
    nodes() {
        return $cojSg.keys(this._nodes);
    }
    sources() {
        var self = this;
        return $cojSg.filter(this.nodes(), function(v) {
            return $cojSg.isEmpty(self._in[v]);
        });
    }
    sinks() {
        var self = this;
        return $cojSg.filter(this.nodes(), function(v) {
            return $cojSg.isEmpty(self._out[v]);
        });
    }
    setNodes(vs, value) {
        var args = arguments;
        var self = this;
        $cojSg.each(vs, function(v) {
            if (args.length > 1) self.setNode(v, value);
            else self.setNode(v);
        });
        return this;
    }
    setNode(v, value) {
        if ($cojSg.has(this._nodes, v)) {
            if (arguments.length > 1) this._nodes[v] = value;
            return this;
        }
        // @ts-expect-error
        this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
        if (this._isCompound) {
            this._parent[v] = $68b1c521923d213c$var$GRAPH_NODE;
            this._children[v] = {};
            this._children[$68b1c521923d213c$var$GRAPH_NODE][v] = true;
        }
        this._in[v] = {};
        this._preds[v] = {};
        this._out[v] = {};
        this._sucs[v] = {};
        ++this._nodeCount;
        return this;
    }
    node(v) {
        return this._nodes[v];
    }
    hasNode(v) {
        return $cojSg.has(this._nodes, v);
    }
    removeNode(v) {
        var self = this;
        if ($cojSg.has(this._nodes, v)) {
            var removeEdge = function(e) {
                self.removeEdge(self._edgeObjs[e]);
            };
            delete this._nodes[v];
            if (this._isCompound) {
                this._removeFromParentsChildList(v);
                delete this._parent[v];
                $cojSg.each(this.children(v), function(child) {
                    self.setParent(child);
                });
                delete this._children[v];
            }
            $cojSg.each($cojSg.keys(this._in[v]), removeEdge);
            delete this._in[v];
            delete this._preds[v];
            $cojSg.each($cojSg.keys(this._out[v]), removeEdge);
            delete this._out[v];
            delete this._sucs[v];
            --this._nodeCount;
        }
        return this;
    }
    setParent(v, parent) {
        if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
        if ($cojSg.isUndefined(parent)) parent = $68b1c521923d213c$var$GRAPH_NODE;
        else {
            // Coerce parent to string
            parent += "";
            for(var ancestor = parent; !$cojSg.isUndefined(ancestor); ancestor = this.parent(ancestor)){
                if (ancestor === v) throw new Error("Setting " + parent + " as parent of " + v + " would create a cycle");
            }
            this.setNode(parent);
        }
        this.setNode(v);
        this._removeFromParentsChildList(v);
        this._parent[v] = parent;
        this._children[parent][v] = true;
        return this;
    }
    _removeFromParentsChildList(v) {
        delete this._children[this._parent[v]][v];
    }
    parent(v) {
        if (this._isCompound) {
            var parent = this._parent[v];
            if (parent !== $68b1c521923d213c$var$GRAPH_NODE) return parent;
        }
    }
    children(v) {
        if ($cojSg.isUndefined(v)) v = $68b1c521923d213c$var$GRAPH_NODE;
        if (this._isCompound) {
            var children = this._children[v];
            if (children) return $cojSg.keys(children);
        } else if (v === $68b1c521923d213c$var$GRAPH_NODE) return this.nodes();
        else if (this.hasNode(v)) return [];
    }
    predecessors(v) {
        var predsV = this._preds[v];
        if (predsV) return $cojSg.keys(predsV);
    }
    successors(v) {
        var sucsV = this._sucs[v];
        if (sucsV) return $cojSg.keys(sucsV);
    }
    neighbors(v) {
        var preds = this.predecessors(v);
        if (preds) return $cojSg.union(preds, this.successors(v));
    }
    isLeaf(v) {
        var neighbors;
        if (this.isDirected()) neighbors = this.successors(v);
        else neighbors = this.neighbors(v);
        return neighbors.length === 0;
    }
    filterNodes(filter) {
        // @ts-expect-error
        var copy = new this.constructor({
            directed: this._isDirected,
            multigraph: this._isMultigraph,
            compound: this._isCompound
        });
        copy.setGraph(this.graph());
        var self = this;
        $cojSg.each(this._nodes, function(value, v) {
            if (filter(v)) copy.setNode(v, value);
        });
        $cojSg.each(this._edgeObjs, function(e) {
            // @ts-expect-error
            if (copy.hasNode(e.v) && copy.hasNode(e.w)) copy.setEdge(e, self.edge(e));
        });
        var parents = {};
        function findParent(v) {
            var parent = self.parent(v);
            if (parent === undefined || copy.hasNode(parent)) {
                parents[v] = parent;
                return parent;
            } else if (parent in parents) return parents[parent];
            else return findParent(parent);
        }
        if (this._isCompound) $cojSg.each(copy.nodes(), function(v) {
            copy.setParent(v, findParent(v));
        });
        return copy;
    }
    /* === Edge functions ========== */ setDefaultEdgeLabel(newDefault) {
        if (!$cojSg.isFunction(newDefault)) newDefault = $cojSg.constant(newDefault);
        this._defaultEdgeLabelFn = newDefault;
        return this;
    }
    edgeCount() {
        return this._edgeCount;
    }
    edges() {
        return $cojSg.values(this._edgeObjs);
    }
    setPath(vs, value) {
        var self = this;
        var args = arguments;
        $cojSg.reduce(vs, function(v, w) {
            if (args.length > 1) self.setEdge(v, w, value);
            else self.setEdge(v, w);
            return w;
        });
        return this;
    }
    /*
   * setEdge(v, w, [value, [name]])
   * setEdge({ v, w, [name] }, [value])
   */ setEdge() {
        var v, w, name, value;
        var valueSpecified = false;
        var arg0 = arguments[0];
        if (typeof arg0 === "object" && arg0 !== null && "v" in arg0) {
            v = arg0.v;
            w = arg0.w;
            name = arg0.name;
            if (arguments.length === 2) {
                value = arguments[1];
                valueSpecified = true;
            }
        } else {
            v = arg0;
            w = arguments[1];
            name = arguments[3];
            if (arguments.length > 2) {
                value = arguments[2];
                valueSpecified = true;
            }
        }
        v = "" + v;
        w = "" + w;
        if (!$cojSg.isUndefined(name)) name = "" + name;
        var e = $68b1c521923d213c$var$edgeArgsToId(this._isDirected, v, w, name);
        if ($cojSg.has(this._edgeLabels, e)) {
            if (valueSpecified) this._edgeLabels[e] = value;
            return this;
        }
        if (!$cojSg.isUndefined(name) && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
        // It didn't exist, so we need to create it.
        // First ensure the nodes exist.
        this.setNode(v);
        this.setNode(w);
        // @ts-expect-error
        this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);
        var edgeObj = $68b1c521923d213c$var$edgeArgsToObj(this._isDirected, v, w, name);
        // Ensure we add undirected edges in a consistent way.
        v = edgeObj.v;
        w = edgeObj.w;
        Object.freeze(edgeObj);
        this._edgeObjs[e] = edgeObj;
        $68b1c521923d213c$var$incrementOrInitEntry(this._preds[w], v);
        $68b1c521923d213c$var$incrementOrInitEntry(this._sucs[v], w);
        this._in[w][e] = edgeObj;
        this._out[v][e] = edgeObj;
        this._edgeCount++;
        return this;
    }
    edge(v, w, name) {
        var e = arguments.length === 1 ? $68b1c521923d213c$var$edgeObjToId(this._isDirected, arguments[0]) : $68b1c521923d213c$var$edgeArgsToId(this._isDirected, v, w, name);
        return this._edgeLabels[e];
    }
    hasEdge(v, w, name) {
        var e = arguments.length === 1 ? $68b1c521923d213c$var$edgeObjToId(this._isDirected, arguments[0]) : $68b1c521923d213c$var$edgeArgsToId(this._isDirected, v, w, name);
        return $cojSg.has(this._edgeLabels, e);
    }
    removeEdge(v, w, name) {
        var e = arguments.length === 1 ? $68b1c521923d213c$var$edgeObjToId(this._isDirected, arguments[0]) : $68b1c521923d213c$var$edgeArgsToId(this._isDirected, v, w, name);
        var edge = this._edgeObjs[e];
        if (edge) {
            v = edge.v;
            w = edge.w;
            delete this._edgeLabels[e];
            delete this._edgeObjs[e];
            $68b1c521923d213c$var$decrementOrRemoveEntry(this._preds[w], v);
            $68b1c521923d213c$var$decrementOrRemoveEntry(this._sucs[v], w);
            delete this._in[w][e];
            delete this._out[v][e];
            this._edgeCount--;
        }
        return this;
    }
    inEdges(v, u) {
        var inV = this._in[v];
        if (inV) {
            var edges = $cojSg.values(inV);
            if (!u) return edges;
            return $cojSg.filter(edges, function(edge) {
                return edge.v === u;
            });
        }
    }
    outEdges(v, w) {
        var outV = this._out[v];
        if (outV) {
            var edges = $cojSg.values(outV);
            if (!w) return edges;
            return $cojSg.filter(edges, function(edge) {
                return edge.w === w;
            });
        }
    }
    nodeEdges(v, w) {
        var inEdges = this.inEdges(v, w);
        if (inEdges) return inEdges.concat(this.outEdges(v, w));
    }
}
/* Number of nodes in the graph. Should only be changed by the implementation. */ $68b1c521923d213c$export$614db49f3febe941.prototype._nodeCount = 0;
/* Number of edges in the graph. Should only be changed by the implementation. */ $68b1c521923d213c$export$614db49f3febe941.prototype._edgeCount = 0;
function $68b1c521923d213c$var$incrementOrInitEntry(map, k) {
    if (map[k]) map[k]++;
    else map[k] = 1;
}
function $68b1c521923d213c$var$decrementOrRemoveEntry(map, k) {
    if (!--map[k]) delete map[k];
}
function $68b1c521923d213c$var$edgeArgsToId(isDirected, v_, w_, name) {
    var v = "" + v_;
    var w = "" + w_;
    if (!isDirected && v > w) {
        var tmp = v;
        v = w;
        w = tmp;
    }
    return v + $68b1c521923d213c$var$EDGE_KEY_DELIM + w + $68b1c521923d213c$var$EDGE_KEY_DELIM + ($cojSg.isUndefined(name) ? $68b1c521923d213c$var$DEFAULT_EDGE_NAME : name);
}
function $68b1c521923d213c$var$edgeArgsToObj(isDirected, v_, w_, name) {
    var v = "" + v_;
    var w = "" + w_;
    if (!isDirected && v > w) {
        var tmp = v;
        v = w;
        w = tmp;
    }
    var edgeObj = {
        v: v,
        w: w
    };
    if (name) edgeObj.name = name;
    return edgeObj;
}
function $68b1c521923d213c$var$edgeObjToId(isDirected, edgeObj) {
    return $68b1c521923d213c$var$edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}

});


parcelRequire.register("5Nl7d", function(module, exports) {

$parcel$export(module.exports, "layout", () => (parcelRequire("2y5tz")).layout);

var $6JWTk = parcelRequire("6JWTk");

var $2y5tz = parcelRequire("2y5tz");

var $fjyV1 = parcelRequire("fjyV1");

var $j4EWQ = parcelRequire("j4EWQ");

});
parcelRequire.register("6JWTk", function(module, exports) {

$parcel$export(module.exports, "run", () => $4e84a0a67fe8bb9b$export$889ea624f2cb2c57);
$parcel$export(module.exports, "undo", () => $4e84a0a67fe8bb9b$export$21f930c44940fd98);

var $cojSg = parcelRequire("cojSg");

var $6RKfO = parcelRequire("6RKfO");
function $4e84a0a67fe8bb9b$export$889ea624f2cb2c57(g) {
    var fas = g.graph().acyclicer === "greedy" ? (0, $6RKfO.greedyFAS)(g, weightFn(g)) : $4e84a0a67fe8bb9b$var$dfsFAS(g);
    $cojSg.forEach(fas, function(e) {
        var label = g.edge(e);
        g.removeEdge(e);
        label.forwardName = e.name;
        label.reversed = true;
        g.setEdge(e.w, e.v, label, $cojSg.uniqueId("rev"));
    });
    function weightFn(g) {
        return function(e) {
            return g.edge(e).weight;
        };
    }
}
function $4e84a0a67fe8bb9b$var$dfsFAS(g) {
    var fas = [];
    var stack = {};
    var visited = {};
    function dfs(v) {
        if ($cojSg.has(visited, v)) return;
        visited[v] = true;
        stack[v] = true;
        $cojSg.forEach(g.outEdges(v), function(e) {
            if ($cojSg.has(stack, e.w)) fas.push(e);
            else dfs(e.w);
        });
        delete stack[v];
    }
    $cojSg.forEach(g.nodes(), dfs);
    return fas;
}
function $4e84a0a67fe8bb9b$export$21f930c44940fd98(g) {
    $cojSg.forEach(g.edges(), function(e) {
        var label = g.edge(e);
        if (label.reversed) {
            g.removeEdge(e);
            var forwardName = label.forwardName;
            delete label.reversed;
            delete label.forwardName;
            g.setEdge(e.w, e.v, label, forwardName);
        }
    });
}

});
parcelRequire.register("6RKfO", function(module, exports) {

$parcel$export(module.exports, "greedyFAS", () => $4ffb92613e6da71d$export$b96a088aeac42554);

var $cojSg = parcelRequire("cojSg");
parcelRequire("hp6PI");
var $8ZhJ2 = parcelRequire("8ZhJ2");

var $bm2fA = parcelRequire("bm2fA");
var $4ffb92613e6da71d$var$DEFAULT_WEIGHT_FN = $cojSg.constant(1);
function $4ffb92613e6da71d$export$b96a088aeac42554(g, weightFn) {
    if (g.nodeCount() <= 1) return [];
    var state = $4ffb92613e6da71d$var$buildState(g, weightFn || $4ffb92613e6da71d$var$DEFAULT_WEIGHT_FN);
    var results = $4ffb92613e6da71d$var$doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
    // Expand multi-edges
    return $cojSg.flatten($cojSg.map(results, function(e) {
        return g.outEdges(e.v, e.w);
    }));
}
function $4ffb92613e6da71d$var$doGreedyFAS(g, buckets, zeroIdx) {
    var results = [];
    var sources = buckets[buckets.length - 1];
    var sinks = buckets[0];
    var entry;
    while(g.nodeCount()){
        while(entry = sinks.dequeue())$4ffb92613e6da71d$var$removeNode(g, buckets, zeroIdx, entry);
        while(entry = sources.dequeue())$4ffb92613e6da71d$var$removeNode(g, buckets, zeroIdx, entry);
        if (g.nodeCount()) for(var i = buckets.length - 2; i > 0; --i){
            entry = buckets[i].dequeue();
            if (entry) {
                results = results.concat($4ffb92613e6da71d$var$removeNode(g, buckets, zeroIdx, entry, true));
                break;
            }
        }
    }
    return results;
}
function $4ffb92613e6da71d$var$removeNode(g, buckets, zeroIdx, entry, collectPredecessors) {
    var results = collectPredecessors ? [] : undefined;
    $cojSg.forEach(g.inEdges(entry.v), function(edge) {
        var weight = g.edge(edge);
        var uEntry = g.node(edge.v);
        if (collectPredecessors) results.push({
            v: edge.v,
            w: edge.w
        });
        uEntry.out -= weight;
        $4ffb92613e6da71d$var$assignBucket(buckets, zeroIdx, uEntry);
    });
    $cojSg.forEach(g.outEdges(entry.v), function(edge) {
        var weight = g.edge(edge);
        var w = edge.w;
        var wEntry = g.node(w);
        wEntry["in"] -= weight;
        $4ffb92613e6da71d$var$assignBucket(buckets, zeroIdx, wEntry);
    });
    g.removeNode(entry.v);
    return results;
}
function $4ffb92613e6da71d$var$buildState(g, weightFn) {
    var fasGraph = new (0, $8ZhJ2.Graph)();
    var maxIn = 0;
    var maxOut = 0;
    $cojSg.forEach(g.nodes(), function(v) {
        fasGraph.setNode(v, {
            v: v,
            in: 0,
            out: 0
        });
    });
    // Aggregate weights on nodes, but also sum the weights across multi-edges
    // into a single edge for the fasGraph.
    $cojSg.forEach(g.edges(), function(e) {
        var prevWeight = fasGraph.edge(e.v, e.w) || 0;
        var weight = weightFn(e);
        var edgeWeight = prevWeight + weight;
        fasGraph.setEdge(e.v, e.w, edgeWeight);
        maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
        maxIn = Math.max(maxIn, fasGraph.node(e.w)["in"] += weight);
    });
    var buckets = $cojSg.range(maxOut + maxIn + 3).map(function() {
        return new (0, $bm2fA.List)();
    });
    var zeroIdx = maxIn + 1;
    $cojSg.forEach(fasGraph.nodes(), function(v) {
        $4ffb92613e6da71d$var$assignBucket(buckets, zeroIdx, fasGraph.node(v));
    });
    return {
        graph: fasGraph,
        buckets: buckets,
        zeroIdx: zeroIdx
    };
}
function $4ffb92613e6da71d$var$assignBucket(buckets, zeroIdx, entry) {
    if (!entry.out) buckets[0].enqueue(entry);
    else if (!entry["in"]) buckets[buckets.length - 1].enqueue(entry);
    else buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
}

});
parcelRequire.register("bm2fA", function(module, exports) {

$parcel$export(module.exports, "List", () => $84437eae8a69803d$export$54c2e3dc7acea9f5);
/*
 * Simple doubly linked list implementation derived from Cormen, et al.,
 * "Introduction to Algorithms".
 */ class $84437eae8a69803d$export$54c2e3dc7acea9f5 {
    constructor(){
        var sentinel = {};
        sentinel._next = sentinel._prev = sentinel;
        this._sentinel = sentinel;
    }
    dequeue() {
        var sentinel = this._sentinel;
        var entry = sentinel._prev;
        if (entry !== sentinel) {
            $84437eae8a69803d$var$unlink(entry);
            return entry;
        }
    }
    enqueue(entry) {
        var sentinel = this._sentinel;
        if (entry._prev && entry._next) $84437eae8a69803d$var$unlink(entry);
        entry._next = sentinel._next;
        sentinel._next._prev = entry;
        sentinel._next = entry;
        entry._prev = sentinel;
    }
    toString() {
        var strs = [];
        var sentinel = this._sentinel;
        var curr = sentinel._prev;
        while(curr !== sentinel){
            strs.push(JSON.stringify(curr, $84437eae8a69803d$var$filterOutLinks));
            curr = curr._prev;
        }
        return "[" + strs.join(", ") + "]";
    }
}
function $84437eae8a69803d$var$unlink(entry) {
    entry._prev._next = entry._next;
    entry._next._prev = entry._prev;
    delete entry._next;
    delete entry._prev;
}
function $84437eae8a69803d$var$filterOutLinks(k, v) {
    if (k !== "_next" && k !== "_prev") return v;
}

});



parcelRequire.register("2y5tz", function(module, exports) {

$parcel$export(module.exports, "layout", () => $1db3012bf36fe6a0$export$b3219800bda33a1f);

var $cojSg = parcelRequire("cojSg");
parcelRequire("hp6PI");
var $8ZhJ2 = parcelRequire("8ZhJ2");

var $ivrbO = parcelRequire("ivrbO");

var $1xXPL = parcelRequire("1xXPL");

var $6JWTk = parcelRequire("6JWTk");

var $fjyV1 = parcelRequire("fjyV1");

var $j4EWQ = parcelRequire("j4EWQ");

var $44uXf = parcelRequire("44uXf");

var $65kmU = parcelRequire("65kmU");

var $6DMuV = parcelRequire("6DMuV");

var $gxDHH = parcelRequire("gxDHH");

var $dKITw = parcelRequire("dKITw");
function $1db3012bf36fe6a0$export$b3219800bda33a1f(g, opts) {
    var time = opts && opts.debugTiming ? $dKITw.time : $dKITw.notime;
    time("layout", function() {
        var layoutGraph = time("  buildLayoutGraph", function() {
            return $1db3012bf36fe6a0$var$buildLayoutGraph(g);
        });
        time("  runLayout", function() {
            $1db3012bf36fe6a0$var$runLayout(layoutGraph, time);
        });
        time("  updateInputGraph", function() {
            $1db3012bf36fe6a0$var$updateInputGraph(g, layoutGraph);
        });
    });
}
function $1db3012bf36fe6a0$var$runLayout(g, time) {
    time("    makeSpaceForEdgeLabels", function() {
        $1db3012bf36fe6a0$var$makeSpaceForEdgeLabels(g);
    });
    time("    removeSelfEdges", function() {
        $1db3012bf36fe6a0$var$removeSelfEdges(g);
    });
    time("    acyclic", function() {
        $6JWTk.run(g);
    });
    time("    nestingGraph.run", function() {
        $44uXf.run(g);
    });
    time("    rank", function() {
        (0, $j4EWQ.rank)($dKITw.asNonCompoundGraph(g));
    });
    time("    injectEdgeLabelProxies", function() {
        $1db3012bf36fe6a0$var$injectEdgeLabelProxies(g);
    });
    time("    removeEmptyRanks", function() {
        $dKITw.removeEmptyRanks(g);
    });
    time("    nestingGraph.cleanup", function() {
        $44uXf.cleanup(g);
    });
    time("    normalizeRanks", function() {
        $dKITw.normalizeRanks(g);
    });
    time("    assignRankMinMax", function() {
        $1db3012bf36fe6a0$var$assignRankMinMax(g);
    });
    time("    removeEdgeLabelProxies", function() {
        $1db3012bf36fe6a0$var$removeEdgeLabelProxies(g);
    });
    time("    normalize.run", function() {
        $fjyV1.run(g);
    });
    time("    parentDummyChains", function() {
        (0, $6DMuV.parentDummyChains)(g);
    });
    time("    addBorderSegments", function() {
        (0, $ivrbO.addBorderSegments)(g);
    });
    time("    order", function() {
        (0, $65kmU.order)(g);
    });
    time("    insertSelfEdges", function() {
        $1db3012bf36fe6a0$var$insertSelfEdges(g);
    });
    time("    adjustCoordinateSystem", function() {
        $1xXPL.adjust(g);
    });
    time("    position", function() {
        (0, $gxDHH.position)(g);
    });
    time("    positionSelfEdges", function() {
        $1db3012bf36fe6a0$var$positionSelfEdges(g);
    });
    time("    removeBorderNodes", function() {
        $1db3012bf36fe6a0$var$removeBorderNodes(g);
    });
    time("    normalize.undo", function() {
        $fjyV1.undo(g);
    });
    time("    fixupEdgeLabelCoords", function() {
        $1db3012bf36fe6a0$var$fixupEdgeLabelCoords(g);
    });
    time("    undoCoordinateSystem", function() {
        $1xXPL.undo(g);
    });
    time("    translateGraph", function() {
        $1db3012bf36fe6a0$var$translateGraph(g);
    });
    time("    assignNodeIntersects", function() {
        $1db3012bf36fe6a0$var$assignNodeIntersects(g);
    });
    time("    reversePoints", function() {
        $1db3012bf36fe6a0$var$reversePointsForReversedEdges(g);
    });
    time("    acyclic.undo", function() {
        $6JWTk.undo(g);
    });
}
/*
 * Copies final layout information from the layout graph back to the input
 * graph. This process only copies whitelisted attributes from the layout graph
 * to the input graph, so it serves as a good place to determine what
 * attributes can influence layout.
 */ function $1db3012bf36fe6a0$var$updateInputGraph(inputGraph, layoutGraph) {
    $cojSg.forEach(inputGraph.nodes(), function(v) {
        var inputLabel = inputGraph.node(v);
        var layoutLabel = layoutGraph.node(v);
        if (inputLabel) {
            inputLabel.x = layoutLabel.x;
            inputLabel.y = layoutLabel.y;
            if (layoutGraph.children(v).length) {
                inputLabel.width = layoutLabel.width;
                inputLabel.height = layoutLabel.height;
            }
        }
    });
    $cojSg.forEach(inputGraph.edges(), function(e) {
        var inputLabel = inputGraph.edge(e);
        var layoutLabel = layoutGraph.edge(e);
        inputLabel.points = layoutLabel.points;
        if ($cojSg.has(layoutLabel, "x")) {
            inputLabel.x = layoutLabel.x;
            inputLabel.y = layoutLabel.y;
        }
    });
    inputGraph.graph().width = layoutGraph.graph().width;
    inputGraph.graph().height = layoutGraph.graph().height;
}
var $1db3012bf36fe6a0$var$graphNumAttrs = [
    "nodesep",
    "edgesep",
    "ranksep",
    "marginx",
    "marginy"
];
var $1db3012bf36fe6a0$var$graphDefaults = {
    ranksep: 50,
    edgesep: 20,
    nodesep: 50,
    rankdir: "tb"
};
var $1db3012bf36fe6a0$var$graphAttrs = [
    "acyclicer",
    "ranker",
    "rankdir",
    "align"
];
var $1db3012bf36fe6a0$var$nodeNumAttrs = [
    "width",
    "height"
];
var $1db3012bf36fe6a0$var$nodeDefaults = {
    width: 0,
    height: 0
};
var $1db3012bf36fe6a0$var$edgeNumAttrs = [
    "minlen",
    "weight",
    "width",
    "height",
    "labeloffset"
];
var $1db3012bf36fe6a0$var$edgeDefaults = {
    minlen: 1,
    weight: 1,
    width: 0,
    height: 0,
    labeloffset: 10,
    labelpos: "r"
};
var $1db3012bf36fe6a0$var$edgeAttrs = [
    "labelpos"
];
/*
 * Constructs a new graph from the input graph, which can be used for layout.
 * This process copies only whitelisted attributes from the input graph to the
 * layout graph. Thus this function serves as a good place to determine what
 * attributes can influence layout.
 */ function $1db3012bf36fe6a0$var$buildLayoutGraph(inputGraph) {
    var g = new (0, $8ZhJ2.Graph)({
        multigraph: true,
        compound: true
    });
    var graph = $1db3012bf36fe6a0$var$canonicalize(inputGraph.graph());
    g.setGraph($cojSg.merge({}, $1db3012bf36fe6a0$var$graphDefaults, $1db3012bf36fe6a0$var$selectNumberAttrs(graph, $1db3012bf36fe6a0$var$graphNumAttrs), $cojSg.pick(graph, $1db3012bf36fe6a0$var$graphAttrs)));
    $cojSg.forEach(inputGraph.nodes(), function(v) {
        var node = $1db3012bf36fe6a0$var$canonicalize(inputGraph.node(v));
        g.setNode(v, $cojSg.defaults($1db3012bf36fe6a0$var$selectNumberAttrs(node, $1db3012bf36fe6a0$var$nodeNumAttrs), $1db3012bf36fe6a0$var$nodeDefaults));
        g.setParent(v, inputGraph.parent(v));
    });
    $cojSg.forEach(inputGraph.edges(), function(e) {
        var edge = $1db3012bf36fe6a0$var$canonicalize(inputGraph.edge(e));
        g.setEdge(e, $cojSg.merge({}, $1db3012bf36fe6a0$var$edgeDefaults, $1db3012bf36fe6a0$var$selectNumberAttrs(edge, $1db3012bf36fe6a0$var$edgeNumAttrs), $cojSg.pick(edge, $1db3012bf36fe6a0$var$edgeAttrs)));
    });
    return g;
}
/*
 * This idea comes from the Gansner paper: to account for edge labels in our
 * layout we split each rank in half by doubling minlen and halving ranksep.
 * Then we can place labels at these mid-points between nodes.
 *
 * We also add some minimal padding to the width to push the label for the edge
 * away from the edge itself a bit.
 */ function $1db3012bf36fe6a0$var$makeSpaceForEdgeLabels(g) {
    var graph = g.graph();
    graph.ranksep /= 2;
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        edge.minlen *= 2;
        if (edge.labelpos.toLowerCase() !== "c") {
            if (graph.rankdir === "TB" || graph.rankdir === "BT") edge.width += edge.labeloffset;
            else edge.height += edge.labeloffset;
        }
    });
}
/*
 * Creates temporary dummy nodes that capture the rank in which each edge's
 * label is going to, if it has one of non-zero width and height. We do this
 * so that we can safely remove empty ranks while preserving balance for the
 * label's position.
 */ function $1db3012bf36fe6a0$var$injectEdgeLabelProxies(g) {
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if (edge.width && edge.height) {
            var v = g.node(e.v);
            var w = g.node(e.w);
            var label = {
                rank: (w.rank - v.rank) / 2 + v.rank,
                e: e
            };
            $dKITw.addDummyNode(g, "edge-proxy", label, "_ep");
        }
    });
}
function $1db3012bf36fe6a0$var$assignRankMinMax(g) {
    var maxRank = 0;
    $cojSg.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        if (node.borderTop) {
            node.minRank = g.node(node.borderTop).rank;
            node.maxRank = g.node(node.borderBottom).rank;
            // @ts-expect-error
            maxRank = $cojSg.max(maxRank, node.maxRank);
        }
    });
    g.graph().maxRank = maxRank;
}
function $1db3012bf36fe6a0$var$removeEdgeLabelProxies(g) {
    $cojSg.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        if (node.dummy === "edge-proxy") {
            g.edge(node.e).labelRank = node.rank;
            g.removeNode(v);
        }
    });
}
function $1db3012bf36fe6a0$var$translateGraph(g) {
    var minX = Number.POSITIVE_INFINITY;
    var maxX = 0;
    var minY = Number.POSITIVE_INFINITY;
    var maxY = 0;
    var graphLabel = g.graph();
    var marginX = graphLabel.marginx || 0;
    var marginY = graphLabel.marginy || 0;
    function getExtremes(attrs) {
        var x = attrs.x;
        var y = attrs.y;
        var w = attrs.width;
        var h = attrs.height;
        minX = Math.min(minX, x - w / 2);
        maxX = Math.max(maxX, x + w / 2);
        minY = Math.min(minY, y - h / 2);
        maxY = Math.max(maxY, y + h / 2);
    }
    $cojSg.forEach(g.nodes(), function(v) {
        getExtremes(g.node(v));
    });
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if ($cojSg.has(edge, "x")) getExtremes(edge);
    });
    minX -= marginX;
    minY -= marginY;
    $cojSg.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        node.x -= minX;
        node.y -= minY;
    });
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        $cojSg.forEach(edge.points, function(p) {
            p.x -= minX;
            p.y -= minY;
        });
        if ($cojSg.has(edge, "x")) edge.x -= minX;
        if ($cojSg.has(edge, "y")) edge.y -= minY;
    });
    graphLabel.width = maxX - minX + marginX;
    graphLabel.height = maxY - minY + marginY;
}
function $1db3012bf36fe6a0$var$assignNodeIntersects(g) {
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        var nodeV = g.node(e.v);
        var nodeW = g.node(e.w);
        var p1, p2;
        if (!edge.points) {
            edge.points = [];
            p1 = nodeW;
            p2 = nodeV;
        } else {
            p1 = edge.points[0];
            p2 = edge.points[edge.points.length - 1];
        }
        edge.points.unshift($dKITw.intersectRect(nodeV, p1));
        edge.points.push($dKITw.intersectRect(nodeW, p2));
    });
}
function $1db3012bf36fe6a0$var$fixupEdgeLabelCoords(g) {
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if ($cojSg.has(edge, "x")) {
            if (edge.labelpos === "l" || edge.labelpos === "r") edge.width -= edge.labeloffset;
            switch(edge.labelpos){
                case "l":
                    edge.x -= edge.width / 2 + edge.labeloffset;
                    break;
                case "r":
                    edge.x += edge.width / 2 + edge.labeloffset;
                    break;
            }
        }
    });
}
function $1db3012bf36fe6a0$var$reversePointsForReversedEdges(g) {
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if (edge.reversed) edge.points.reverse();
    });
}
function $1db3012bf36fe6a0$var$removeBorderNodes(g) {
    $cojSg.forEach(g.nodes(), function(v) {
        if (g.children(v).length) {
            var node = g.node(v);
            var t = g.node(node.borderTop);
            var b = g.node(node.borderBottom);
            var l = g.node($cojSg.last(node.borderLeft));
            var r = g.node($cojSg.last(node.borderRight));
            node.width = Math.abs(r.x - l.x);
            node.height = Math.abs(b.y - t.y);
            node.x = l.x + node.width / 2;
            node.y = t.y + node.height / 2;
        }
    });
    $cojSg.forEach(g.nodes(), function(v) {
        if (g.node(v).dummy === "border") g.removeNode(v);
    });
}
function $1db3012bf36fe6a0$var$removeSelfEdges(g) {
    $cojSg.forEach(g.edges(), function(e) {
        if (e.v === e.w) {
            var node = g.node(e.v);
            if (!node.selfEdges) node.selfEdges = [];
            node.selfEdges.push({
                e: e,
                label: g.edge(e)
            });
            g.removeEdge(e);
        }
    });
}
function $1db3012bf36fe6a0$var$insertSelfEdges(g) {
    var layers = $dKITw.buildLayerMatrix(g);
    $cojSg.forEach(layers, function(layer) {
        var orderShift = 0;
        $cojSg.forEach(layer, function(v, i) {
            var node = g.node(v);
            node.order = i + orderShift;
            $cojSg.forEach(node.selfEdges, function(selfEdge) {
                $dKITw.addDummyNode(g, "selfedge", {
                    width: selfEdge.label.width,
                    height: selfEdge.label.height,
                    rank: node.rank,
                    order: i + ++orderShift,
                    e: selfEdge.e,
                    label: selfEdge.label
                }, "_se");
            });
            delete node.selfEdges;
        });
    });
}
function $1db3012bf36fe6a0$var$positionSelfEdges(g) {
    $cojSg.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        if (node.dummy === "selfedge") {
            var selfNode = g.node(node.e.v);
            var x = selfNode.x + selfNode.width / 2;
            var y = selfNode.y;
            var dx = node.x - x;
            var dy = selfNode.height / 2;
            g.setEdge(node.e, node.label);
            g.removeNode(v);
            node.label.points = [
                {
                    x: x + 2 * dx / 3,
                    y: y - dy
                },
                {
                    x: x + 5 * dx / 6,
                    y: y - dy
                },
                {
                    x: x + dx,
                    y: y
                },
                {
                    x: x + 5 * dx / 6,
                    y: y + dy
                },
                {
                    x: x + 2 * dx / 3,
                    y: y + dy
                }
            ];
            node.label.x = node.x;
            node.label.y = node.y;
        }
    });
}
function $1db3012bf36fe6a0$var$selectNumberAttrs(obj, attrs) {
    return $cojSg.mapValues($cojSg.pick(obj, attrs), Number);
}
function $1db3012bf36fe6a0$var$canonicalize(attrs) {
    var newAttrs = {};
    $cojSg.forEach(attrs, function(v, k) {
        newAttrs[k.toLowerCase()] = v;
    });
    return newAttrs;
}

});
parcelRequire.register("ivrbO", function(module, exports) {

$parcel$export(module.exports, "addBorderSegments", () => $d790367eb89da57e$export$9a52541ba49edb51);

var $cojSg = parcelRequire("cojSg");

var $dKITw = parcelRequire("dKITw");
function $d790367eb89da57e$export$9a52541ba49edb51(g) {
    function dfs(v) {
        var children = g.children(v);
        var node = g.node(v);
        if (children.length) $cojSg.forEach(children, dfs);
        if ($cojSg.has(node, "minRank")) {
            node.borderLeft = [];
            node.borderRight = [];
            for(var rank = node.minRank, maxRank = node.maxRank + 1; rank < maxRank; ++rank){
                $d790367eb89da57e$var$addBorderNode(g, "borderLeft", "_bl", v, node, rank);
                $d790367eb89da57e$var$addBorderNode(g, "borderRight", "_br", v, node, rank);
            }
        }
    }
    $cojSg.forEach(g.children(), dfs);
}
function $d790367eb89da57e$var$addBorderNode(g, prop, prefix, sg, sgNode, rank) {
    var label = {
        width: 0,
        height: 0,
        rank: rank,
        borderType: prop
    };
    var prev = sgNode[prop][rank - 1];
    var curr = $dKITw.addDummyNode(g, "border", label, prefix);
    sgNode[prop][rank] = curr;
    g.setParent(curr, sg);
    if (prev) g.setEdge(prev, curr, {
        weight: 1
    });
}

});
parcelRequire.register("dKITw", function(module, exports) {

$parcel$export(module.exports, "addDummyNode", () => $a032655ebdca8a23$export$ecf34c2268abf7a0);
$parcel$export(module.exports, "simplify", () => $a032655ebdca8a23$export$798b53621063651);
$parcel$export(module.exports, "asNonCompoundGraph", () => $a032655ebdca8a23$export$556dc3686e4a2bd5);
$parcel$export(module.exports, "intersectRect", () => $a032655ebdca8a23$export$4a227323f5de0b79);
$parcel$export(module.exports, "buildLayerMatrix", () => $a032655ebdca8a23$export$aca89c9d4c6bb8ae);
$parcel$export(module.exports, "normalizeRanks", () => $a032655ebdca8a23$export$5747adf39cbd8007);
$parcel$export(module.exports, "removeEmptyRanks", () => $a032655ebdca8a23$export$45a0c732a9a44b01);
$parcel$export(module.exports, "addBorderNode", () => $a032655ebdca8a23$export$6589834e22e3d497);
$parcel$export(module.exports, "maxRank", () => $a032655ebdca8a23$export$978bfc7f0ad7d28e);
$parcel$export(module.exports, "partition", () => $a032655ebdca8a23$export$b29f828819edca8d);
$parcel$export(module.exports, "time", () => $a032655ebdca8a23$export$2da9be4cfdb689b1);
$parcel$export(module.exports, "notime", () => $a032655ebdca8a23$export$7f2cf532350145c2);

var $cojSg = parcelRequire("cojSg");
parcelRequire("hp6PI");
var $8ZhJ2 = parcelRequire("8ZhJ2");
/*
 * Adds a dummy node to the graph and return v.
 */ function $a032655ebdca8a23$export$ecf34c2268abf7a0(g, type, attrs, name) {
    var v;
    do v = $cojSg.uniqueId(name);
    while (g.hasNode(v));
    attrs.dummy = type;
    g.setNode(v, attrs);
    return v;
}
/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */ function $a032655ebdca8a23$export$798b53621063651(g) {
    var simplified = new (0, $8ZhJ2.Graph)().setGraph(g.graph());
    $cojSg.forEach(g.nodes(), function(v) {
        simplified.setNode(v, g.node(v));
    });
    $cojSg.forEach(g.edges(), function(e) {
        var simpleLabel = simplified.edge(e.v, e.w) || {
            weight: 0,
            minlen: 1
        };
        var label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
            weight: simpleLabel.weight + label.weight,
            minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
    });
    return simplified;
}
function $a032655ebdca8a23$export$556dc3686e4a2bd5(g) {
    var simplified = new (0, $8ZhJ2.Graph)({
        multigraph: g.isMultigraph()
    }).setGraph(g.graph());
    $cojSg.forEach(g.nodes(), function(v) {
        if (!g.children(v).length) simplified.setNode(v, g.node(v));
    });
    $cojSg.forEach(g.edges(), function(e) {
        simplified.setEdge(e, g.edge(e));
    });
    return simplified;
}
function $a032655ebdca8a23$export$c5a5d928abe0f9b5(g) {
    var weightMap = $cojSg.map(g.nodes(), function(v) {
        var sucs = {};
        $cojSg.forEach(g.outEdges(v), function(e) {
            sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
        });
        return sucs;
    });
    return $cojSg.zipObject(g.nodes(), weightMap);
}
function $a032655ebdca8a23$export$26130937b5f6ca22(g) {
    var weightMap = $cojSg.map(g.nodes(), function(v) {
        var preds = {};
        $cojSg.forEach(g.inEdges(v), function(e) {
            preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
        });
        return preds;
    });
    return $cojSg.zipObject(g.nodes(), weightMap);
}
/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */ function $a032655ebdca8a23$export$4a227323f5de0b79(rect, point) {
    var x = rect.x;
    var y = rect.y;
    // Rectangle intersection algorithm from:
    // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
    var dx = point.x - x;
    var dy = point.y - y;
    var w = rect.width / 2;
    var h = rect.height / 2;
    if (!dx && !dy) throw new Error("Not possible to find intersection inside of the rectangle");
    var sx, sy;
    if (Math.abs(dy) * w > Math.abs(dx) * h) {
        // Intersection is top or bottom of rect.
        if (dy < 0) h = -h;
        sx = h * dx / dy;
        sy = h;
    } else {
        // Intersection is left or right of rect.
        if (dx < 0) w = -w;
        sx = w;
        sy = w * dy / dx;
    }
    return {
        x: x + sx,
        y: y + sy
    };
}
/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * function will produce a matrix with the ids of each node.
 */ function $a032655ebdca8a23$export$aca89c9d4c6bb8ae(g) {
    var layering = $cojSg.map($cojSg.range($a032655ebdca8a23$export$978bfc7f0ad7d28e(g) + 1), function() {
        return [];
    });
    $cojSg.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        var rank = node.rank;
        if (!$cojSg.isUndefined(rank)) layering[rank][node.order] = v;
    });
    return layering;
}
/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */ function $a032655ebdca8a23$export$5747adf39cbd8007(g) {
    var min = $cojSg.min($cojSg.map(g.nodes(), function(v) {
        return g.node(v).rank;
    }));
    $cojSg.forEach(g.nodes(), function(v) {
        var node = g.node(v);
        if ($cojSg.has(node, "rank")) node.rank -= min;
    });
}
function $a032655ebdca8a23$export$45a0c732a9a44b01(g) {
    // Ranks may not start at 0, so we need to offset them
    var offset = $cojSg.min($cojSg.map(g.nodes(), function(v) {
        return g.node(v).rank;
    }));
    var layers = [];
    $cojSg.forEach(g.nodes(), function(v) {
        var rank = g.node(v).rank - offset;
        if (!layers[rank]) layers[rank] = [];
        layers[rank].push(v);
    });
    var delta = 0;
    var nodeRankFactor = g.graph().nodeRankFactor;
    $cojSg.forEach(layers, function(vs, i) {
        if ($cojSg.isUndefined(vs) && i % nodeRankFactor !== 0) --delta;
        else if (delta) $cojSg.forEach(vs, function(v) {
            g.node(v).rank += delta;
        });
    });
}
function $a032655ebdca8a23$export$6589834e22e3d497(g, prefix, rank, order) {
    var node = {
        width: 0,
        height: 0
    };
    if (arguments.length >= 4) {
        node.rank = rank;
        node.order = order;
    }
    return $a032655ebdca8a23$export$ecf34c2268abf7a0(g, "border", node, prefix);
}
function $a032655ebdca8a23$export$978bfc7f0ad7d28e(g) {
    return $cojSg.max($cojSg.map(g.nodes(), function(v) {
        var rank = g.node(v).rank;
        if (!$cojSg.isUndefined(rank)) return rank;
    }));
}
/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * function returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */ function $a032655ebdca8a23$export$b29f828819edca8d(collection, fn) {
    var result = {
        lhs: [],
        rhs: []
    };
    $cojSg.forEach(collection, function(value) {
        if (fn(value)) result.lhs.push(value);
        else result.rhs.push(value);
    });
    return result;
}
/*
 * Returns a new function that wraps `fn` with a timer. The wrapper logs the
 * time it takes to execute the function.
 */ function $a032655ebdca8a23$export$2da9be4cfdb689b1(name, fn) {
    var start = $cojSg.now();
    try {
        return fn();
    } finally{
        console.log(name + " time: " + ($cojSg.now() - start) + "ms");
    }
}
function $a032655ebdca8a23$export$7f2cf532350145c2(name, fn) {
    return fn();
}

});


parcelRequire.register("1xXPL", function(module, exports) {

$parcel$export(module.exports, "adjust", () => $1207494bd4cf9a3c$export$2c0e788bcc82013);
$parcel$export(module.exports, "undo", () => $1207494bd4cf9a3c$export$21f930c44940fd98);

var $cojSg = parcelRequire("cojSg");
function $1207494bd4cf9a3c$export$2c0e788bcc82013(g) {
    var rankDir = g.graph().rankdir.toLowerCase();
    if (rankDir === "lr" || rankDir === "rl") $1207494bd4cf9a3c$var$swapWidthHeight(g);
}
function $1207494bd4cf9a3c$export$21f930c44940fd98(g) {
    var rankDir = g.graph().rankdir.toLowerCase();
    if (rankDir === "bt" || rankDir === "rl") $1207494bd4cf9a3c$var$reverseY(g);
    if (rankDir === "lr" || rankDir === "rl") {
        $1207494bd4cf9a3c$var$swapXY(g);
        $1207494bd4cf9a3c$var$swapWidthHeight(g);
    }
}
function $1207494bd4cf9a3c$var$swapWidthHeight(g) {
    $cojSg.forEach(g.nodes(), function(v) {
        $1207494bd4cf9a3c$var$swapWidthHeightOne(g.node(v));
    });
    $cojSg.forEach(g.edges(), function(e) {
        $1207494bd4cf9a3c$var$swapWidthHeightOne(g.edge(e));
    });
}
function $1207494bd4cf9a3c$var$swapWidthHeightOne(attrs) {
    var w = attrs.width;
    attrs.width = attrs.height;
    attrs.height = w;
}
function $1207494bd4cf9a3c$var$reverseY(g) {
    $cojSg.forEach(g.nodes(), function(v) {
        $1207494bd4cf9a3c$var$reverseYOne(g.node(v));
    });
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        $cojSg.forEach(edge.points, $1207494bd4cf9a3c$var$reverseYOne);
        if ($cojSg.has(edge, "y")) $1207494bd4cf9a3c$var$reverseYOne(edge);
    });
}
function $1207494bd4cf9a3c$var$reverseYOne(attrs) {
    attrs.y = -attrs.y;
}
function $1207494bd4cf9a3c$var$swapXY(g) {
    $cojSg.forEach(g.nodes(), function(v) {
        $1207494bd4cf9a3c$var$swapXYOne(g.node(v));
    });
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        $cojSg.forEach(edge.points, $1207494bd4cf9a3c$var$swapXYOne);
        if ($cojSg.has(edge, "x")) $1207494bd4cf9a3c$var$swapXYOne(edge);
    });
}
function $1207494bd4cf9a3c$var$swapXYOne(attrs) {
    var x = attrs.x;
    attrs.x = attrs.y;
    attrs.y = x;
}

});

parcelRequire.register("fjyV1", function(module, exports) {

$parcel$export(module.exports, "run", () => $b263b779a0664894$export$889ea624f2cb2c57);
$parcel$export(module.exports, "undo", () => $b263b779a0664894$export$21f930c44940fd98);

var $cojSg = parcelRequire("cojSg");

var $dKITw = parcelRequire("dKITw");
/*
 * Breaks any long edges in the graph into short segments that span 1 layer
 * each. This operation is undoable with the denormalize function.
 *
 * Pre-conditions:
 *
 *    1. The input graph is a DAG.
 *    2. Each node in the graph has a "rank" property.
 *
 * Post-condition:
 *
 *    1. All edges in the graph have a length of 1.
 *    2. Dummy nodes are added where edges have been split into segments.
 *    3. The graph is augmented with a "dummyChains" attribute which contains
 *       the first dummy in each chain of dummy nodes produced.
 */ function $b263b779a0664894$export$889ea624f2cb2c57(g) {
    g.graph().dummyChains = [];
    $cojSg.forEach(g.edges(), function(edge) {
        $b263b779a0664894$var$normalizeEdge(g, edge);
    });
}
function $b263b779a0664894$var$normalizeEdge(g, e) {
    var v = e.v;
    var vRank = g.node(v).rank;
    var w = e.w;
    var wRank = g.node(w).rank;
    var name = e.name;
    var edgeLabel = g.edge(e);
    var labelRank = edgeLabel.labelRank;
    if (wRank === vRank + 1) return;
    g.removeEdge(e);
    var dummy, attrs, i;
    for(i = 0, ++vRank; vRank < wRank; ++i, ++vRank){
        edgeLabel.points = [];
        attrs = {
            width: 0,
            height: 0,
            edgeLabel: edgeLabel,
            edgeObj: e,
            rank: vRank
        };
        dummy = $dKITw.addDummyNode(g, "edge", attrs, "_d");
        if (vRank === labelRank) {
            attrs.width = edgeLabel.width;
            attrs.height = edgeLabel.height;
            // @ts-expect-error
            attrs.dummy = "edge-label";
            // @ts-expect-error
            attrs.labelpos = edgeLabel.labelpos;
        }
        g.setEdge(v, dummy, {
            weight: edgeLabel.weight
        }, name);
        if (i === 0) g.graph().dummyChains.push(dummy);
        v = dummy;
    }
    g.setEdge(v, w, {
        weight: edgeLabel.weight
    }, name);
}
function $b263b779a0664894$export$21f930c44940fd98(g) {
    $cojSg.forEach(g.graph().dummyChains, function(v) {
        var node = g.node(v);
        var origLabel = node.edgeLabel;
        var w;
        g.setEdge(node.edgeObj, origLabel);
        while(node.dummy){
            w = g.successors(v)[0];
            g.removeNode(v);
            origLabel.points.push({
                x: node.x,
                y: node.y
            });
            if (node.dummy === "edge-label") {
                origLabel.x = node.x;
                origLabel.y = node.y;
                origLabel.width = node.width;
                origLabel.height = node.height;
            }
            v = w;
            node = g.node(v);
        }
    });
}

});

parcelRequire.register("j4EWQ", function(module, exports) {

$parcel$export(module.exports, "rank", () => $de2e277db8fc2b8b$export$fbc8bcd33b574fbc);

var $jxAHX = parcelRequire("jxAHX");

var $lLrDK = parcelRequire("lLrDK");

var $3t488 = parcelRequire("3t488");
/*
 * Assigns a rank to each node in the input graph that respects the "minlen"
 * constraint specified on edges between nodes.
 *
 * This basic structure is derived from Gansner, et al., "A Technique for
 * Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a connected DAG
 *    2. Graph nodes must be objects
 *    3. Graph edges must have "weight" and "minlen" attributes
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have a "rank" attribute based on the results of the
 *       algorithm. Ranks can start at any index (including negative), we'll
 *       fix them up later.
 */ function $de2e277db8fc2b8b$export$fbc8bcd33b574fbc(g) {
    switch(g.graph().ranker){
        case "network-simplex":
            $de2e277db8fc2b8b$var$networkSimplexRanker(g);
            break;
        case "tight-tree":
            $de2e277db8fc2b8b$var$tightTreeRanker(g);
            break;
        case "longest-path":
            $de2e277db8fc2b8b$var$longestPathRanker(g);
            break;
        default:
            $de2e277db8fc2b8b$var$networkSimplexRanker(g);
    }
}
// A fast and simple ranker, but results are far from optimal.
var $de2e277db8fc2b8b$var$longestPathRanker = (0, $3t488.longestPath);
function $de2e277db8fc2b8b$var$tightTreeRanker(g) {
    (0, $3t488.longestPath)(g);
    (0, $jxAHX.feasibleTree)(g);
}
function $de2e277db8fc2b8b$var$networkSimplexRanker(g) {
    (0, $lLrDK.networkSimplex)(g);
}

});
parcelRequire.register("jxAHX", function(module, exports) {

$parcel$export(module.exports, "feasibleTree", () => $e39d92d053668ec7$export$1d03f990b5f20c77);

var $cojSg = parcelRequire("cojSg");
parcelRequire("hp6PI");
var $8ZhJ2 = parcelRequire("8ZhJ2");

var $3t488 = parcelRequire("3t488");
/*
 * Constructs a spanning tree with tight edges and adjusted the input node's
 * ranks to achieve this. A tight edge is one that is has a length that matches
 * its "minlen" attribute.
 *
 * The basic structure for this function is derived from Gansner, et al., "A
 * Technique for Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a DAG.
 *    2. Graph must be connected.
 *    3. Graph must have at least one node.
 *    5. Graph nodes must have been previously assigned a "rank" property that
 *       respects the "minlen" property of incident edges.
 *    6. Graph edges must have a "minlen" property.
 *
 * Post-conditions:
 *
 *    - Graph nodes will have their rank adjusted to ensure that all edges are
 *      tight.
 *
 * Returns a tree (undirected graph) that is constructed using only "tight"
 * edges.
 */ function $e39d92d053668ec7$export$1d03f990b5f20c77(g) {
    var t = new (0, $8ZhJ2.Graph)({
        directed: false
    });
    // Choose arbitrary node from which to start our tree
    var start = g.nodes()[0];
    var size = g.nodeCount();
    t.setNode(start, {});
    var edge, delta;
    while($e39d92d053668ec7$var$tightTree(t, g) < size){
        edge = $e39d92d053668ec7$var$findMinSlackEdge(t, g);
        delta = t.hasNode(edge.v) ? (0, $3t488.slack)(g, edge) : -(0, $3t488.slack)(g, edge);
        $e39d92d053668ec7$var$shiftRanks(t, g, delta);
    }
    return t;
}
/*
 * Finds a maximal tree of tight edges and returns the number of nodes in the
 * tree.
 */ function $e39d92d053668ec7$var$tightTree(t, g) {
    function dfs(v) {
        $cojSg.forEach(g.nodeEdges(v), function(e) {
            var edgeV = e.v, w = v === edgeV ? e.w : edgeV;
            if (!t.hasNode(w) && !(0, $3t488.slack)(g, e)) {
                t.setNode(w, {});
                t.setEdge(v, w, {});
                dfs(w);
            }
        });
    }
    $cojSg.forEach(t.nodes(), dfs);
    return t.nodeCount();
}
/*
 * Finds the edge with the smallest slack that is incident on tree and returns
 * it.
 */ function $e39d92d053668ec7$var$findMinSlackEdge(t, g) {
    return $cojSg.minBy(g.edges(), function(e) {
        if (t.hasNode(e.v) !== t.hasNode(e.w)) return (0, $3t488.slack)(g, e);
    });
}
function $e39d92d053668ec7$var$shiftRanks(t, g, delta) {
    $cojSg.forEach(t.nodes(), function(v) {
        g.node(v).rank += delta;
    });
}

});
parcelRequire.register("3t488", function(module, exports) {

$parcel$export(module.exports, "longestPath", () => $286748b4dfdbbf38$export$cebe150c9dd2da2e);
$parcel$export(module.exports, "slack", () => $286748b4dfdbbf38$export$3748e8b0e9529e9c);

var $cojSg = parcelRequire("cojSg");
/*
 * Initializes ranks for the input graph using the longest path algorithm. This
 * algorithm scales well and is fast in practice, it yields rather poor
 * solutions. Nodes are pushed to the lowest layer possible, leaving the bottom
 * ranks wide and leaving edges longer than necessary. However, due to its
 * speed, this algorithm is good for getting an initial ranking that can be fed
 * into other algorithms.
 *
 * This algorithm does not normalize layers because it will be used by other
 * algorithms in most cases. If using this algorithm directly, be sure to
 * run normalize at the end.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG.
 *    2. Input graph node labels can be assigned properties.
 *
 * Post-conditions:
 *
 *    1. Each node will be assign an (unnormalized) "rank" property.
 */ function $286748b4dfdbbf38$export$cebe150c9dd2da2e(g) {
    var visited = {};
    function dfs(v) {
        var label = g.node(v);
        if ($cojSg.has(visited, v)) return label.rank;
        visited[v] = true;
        var rank = $cojSg.min($cojSg.map(g.outEdges(v), function(e) {
            return dfs(e.w) - g.edge(e).minlen;
        }));
        if (rank === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
        rank === undefined || // return value of _.map([]) for Lodash 4
        rank === null) // return value of _.map([null])
        rank = 0;
        return label.rank = rank;
    }
    $cojSg.forEach(g.sources(), dfs);
}
/*
 * Returns the amount of slack for the given edge. The slack is defined as the
 * difference between the length of the edge and its minimum length.
 */ function $286748b4dfdbbf38$export$3748e8b0e9529e9c(g, e) {
    return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
}

});


parcelRequire.register("lLrDK", function(module, exports) {

$parcel$export(module.exports, "networkSimplex", () => $fd836d7f8b254d73$export$fb928ed1fa9faa94);

var $cojSg = parcelRequire("cojSg");
parcelRequire("2LCOM");
var $iKPzt = parcelRequire("iKPzt");
var $1oBWU = parcelRequire("1oBWU");

var $dKITw = parcelRequire("dKITw");

var $jxAHX = parcelRequire("jxAHX");

var $3t488 = parcelRequire("3t488");
// Expose some internals for testing purposes
$fd836d7f8b254d73$export$fb928ed1fa9faa94.initLowLimValues = $fd836d7f8b254d73$var$initLowLimValues;
$fd836d7f8b254d73$export$fb928ed1fa9faa94.initCutValues = $fd836d7f8b254d73$var$initCutValues;
$fd836d7f8b254d73$export$fb928ed1fa9faa94.calcCutValue = $fd836d7f8b254d73$var$calcCutValue;
$fd836d7f8b254d73$export$fb928ed1fa9faa94.leaveEdge = $fd836d7f8b254d73$var$leaveEdge;
$fd836d7f8b254d73$export$fb928ed1fa9faa94.enterEdge = $fd836d7f8b254d73$var$enterEdge;
$fd836d7f8b254d73$export$fb928ed1fa9faa94.exchangeEdges = $fd836d7f8b254d73$var$exchangeEdges;
/*
 * The network simplex algorithm assigns ranks to each node in the input graph
 * and iteratively improves the ranking to reduce the length of edges.
 *
 * Preconditions:
 *
 *    1. The input graph must be a DAG.
 *    2. All nodes in the graph must have an object value.
 *    3. All edges in the graph must have "minlen" and "weight" attributes.
 *
 * Postconditions:
 *
 *    1. All nodes in the graph will have an assigned "rank" attribute that has
 *       been optimized by the network simplex algorithm. Ranks start at 0.
 *
 *
 * A rough sketch of the algorithm is as follows:
 *
 *    1. Assign initial ranks to each node. We use the longest path algorithm,
 *       which assigns ranks to the lowest position possible. In general this
 *       leads to very wide bottom ranks and unnecessarily long edges.
 *    2. Construct a feasible tight tree. A tight tree is one such that all
 *       edges in the tree have no slack (difference between length of edge
 *       and minlen for the edge). This by itself greatly improves the assigned
 *       rankings by shorting edges.
 *    3. Iteratively find edges that have negative cut values. Generally a
 *       negative cut value indicates that the edge could be removed and a new
 *       tree edge could be added to produce a more compact graph.
 *
 * Much of the algorithms here are derived from Gansner, et al., "A Technique
 * for Drawing Directed Graphs." The structure of the file roughly follows the
 * structure of the overall algorithm.
 */ function $fd836d7f8b254d73$export$fb928ed1fa9faa94(g) {
    g = (0, $dKITw.simplify)(g);
    (0, $3t488.longestPath)(g);
    var t = (0, $jxAHX.feasibleTree)(g);
    $fd836d7f8b254d73$var$initLowLimValues(t);
    $fd836d7f8b254d73$var$initCutValues(t, g);
    var e, f;
    while(e = $fd836d7f8b254d73$var$leaveEdge(t)){
        f = $fd836d7f8b254d73$var$enterEdge(t, g, e);
        $fd836d7f8b254d73$var$exchangeEdges(t, g, e, f);
    }
}
/*
 * Initializes cut values for all edges in the tree.
 */ function $fd836d7f8b254d73$var$initCutValues(t, g) {
    var vs = $iKPzt.postorder(t, t.nodes());
    vs = vs.slice(0, vs.length - 1);
    $cojSg.forEach(vs, function(v) {
        $fd836d7f8b254d73$var$assignCutValue(t, g, v);
    });
}
function $fd836d7f8b254d73$var$assignCutValue(t, g, child) {
    var childLab = t.node(child);
    var parent = childLab.parent;
    t.edge(child, parent).cutvalue = $fd836d7f8b254d73$var$calcCutValue(t, g, child);
}
/*
 * Given the tight tree, its graph, and a child in the graph calculate and
 * return the cut value for the edge between the child and its parent.
 */ function $fd836d7f8b254d73$var$calcCutValue(t, g, child) {
    var childLab = t.node(child);
    var parent = childLab.parent;
    // True if the child is on the tail end of the edge in the directed graph
    var childIsTail = true;
    // The graph's view of the tree edge we're inspecting
    var graphEdge = g.edge(child, parent);
    // The accumulated cut value for the edge between this node and its parent
    var cutValue = 0;
    if (!graphEdge) {
        childIsTail = false;
        graphEdge = g.edge(parent, child);
    }
    cutValue = graphEdge.weight;
    $cojSg.forEach(g.nodeEdges(child), function(e) {
        var isOutEdge = e.v === child, other = isOutEdge ? e.w : e.v;
        if (other !== parent) {
            var pointsToHead = isOutEdge === childIsTail, otherWeight = g.edge(e).weight;
            cutValue += pointsToHead ? otherWeight : -otherWeight;
            if ($fd836d7f8b254d73$var$isTreeEdge(t, child, other)) {
                var otherCutValue = t.edge(child, other).cutvalue;
                cutValue += pointsToHead ? -otherCutValue : otherCutValue;
            }
        }
    });
    return cutValue;
}
function $fd836d7f8b254d73$var$initLowLimValues(tree, root) {
    if (arguments.length < 2) root = tree.nodes()[0];
    $fd836d7f8b254d73$var$dfsAssignLowLim(tree, {}, 1, root);
}
function $fd836d7f8b254d73$var$dfsAssignLowLim(tree, visited, nextLim, v, parent) {
    var low = nextLim;
    var label = tree.node(v);
    visited[v] = true;
    $cojSg.forEach(tree.neighbors(v), function(w) {
        if (!$cojSg.has(visited, w)) nextLim = $fd836d7f8b254d73$var$dfsAssignLowLim(tree, visited, nextLim, w, v);
    });
    label.low = low;
    label.lim = nextLim++;
    if (parent) label.parent = parent;
    else // TODO should be able to remove this when we incrementally update low lim
    delete label.parent;
    return nextLim;
}
function $fd836d7f8b254d73$var$leaveEdge(tree) {
    return $cojSg.find(tree.edges(), function(e) {
        return tree.edge(e).cutvalue < 0;
    });
}
function $fd836d7f8b254d73$var$enterEdge(t, g, edge) {
    var v = edge.v;
    var w = edge.w;
    // For the rest of this function we assume that v is the tail and w is the
    // head, so if we don't have this edge in the graph we should flip it to
    // match the correct orientation.
    if (!g.hasEdge(v, w)) {
        v = edge.w;
        w = edge.v;
    }
    var vLabel = t.node(v);
    var wLabel = t.node(w);
    var tailLabel = vLabel;
    var flip = false;
    // If the root is in the tail of the edge then we need to flip the logic that
    // checks for the head and tail nodes in the candidates function below.
    if (vLabel.lim > wLabel.lim) {
        tailLabel = wLabel;
        flip = true;
    }
    var candidates = $cojSg.filter(g.edges(), function(edge) {
        return flip === $fd836d7f8b254d73$var$isDescendant(t, t.node(edge.v), tailLabel) && flip !== $fd836d7f8b254d73$var$isDescendant(t, t.node(edge.w), tailLabel);
    });
    return $cojSg.minBy(candidates, function(edge) {
        return (0, $3t488.slack)(g, edge);
    });
}
function $fd836d7f8b254d73$var$exchangeEdges(t, g, e, f) {
    var v = e.v;
    var w = e.w;
    t.removeEdge(v, w);
    t.setEdge(f.v, f.w, {});
    $fd836d7f8b254d73$var$initLowLimValues(t);
    $fd836d7f8b254d73$var$initCutValues(t, g);
    $fd836d7f8b254d73$var$updateRanks(t, g);
}
function $fd836d7f8b254d73$var$updateRanks(t, g) {
    var root = $cojSg.find(t.nodes(), function(v) {
        return !g.node(v).parent;
    });
    var vs = $1oBWU.preorder(t, root);
    vs = vs.slice(1);
    $cojSg.forEach(vs, function(v) {
        var parent = t.node(v).parent, edge = g.edge(v, parent), flipped = false;
        if (!edge) {
            edge = g.edge(parent, v);
            flipped = true;
        }
        g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
    });
}
/*
 * Returns true if the edge is in the tree.
 */ function $fd836d7f8b254d73$var$isTreeEdge(tree, u, v) {
    return tree.hasEdge(u, v);
}
/*
 * Returns true if the specified node is descendant of the root node per the
 * assigned low and lim attributes in the tree.
 */ function $fd836d7f8b254d73$var$isDescendant(tree, vLabel, rootLabel) {
    return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
}

});
parcelRequire.register("2LCOM", function(module, exports) {

$parcel$export(module.exports, "postorder", () => (parcelRequire("iKPzt")).postorder);
$parcel$export(module.exports, "preorder", () => (parcelRequire("1oBWU")).preorder);

var $9uKJG = parcelRequire("9uKJG");

var $7WT3A = parcelRequire("7WT3A");

var $2HKtV = parcelRequire("2HKtV");

var $jrlBx = parcelRequire("jrlBx");

var $h0TVk = parcelRequire("h0TVk");

var $kO0Ds = parcelRequire("kO0Ds");

var $iKPzt = parcelRequire("iKPzt");

var $1oBWU = parcelRequire("1oBWU");

var $jFRiS = parcelRequire("jFRiS");

var $jPSur = parcelRequire("jPSur");

var $bev84 = parcelRequire("bev84");

});
parcelRequire.register("9uKJG", function(module, exports) {

var $cojSg = parcelRequire("cojSg");
function $6e9b2b27f2c6f750$export$9b5ac10f59f76296(g) {
    var visited = {};
    var cmpts = [];
    var cmpt;
    function dfs(v) {
        if ($cojSg.has(visited, v)) return;
        visited[v] = true;
        cmpt.push(v);
        $cojSg.each(g.successors(v), dfs);
        $cojSg.each(g.predecessors(v), dfs);
    }
    $cojSg.each(g.nodes(), function(v) {
        cmpt = [];
        dfs(v);
        if (cmpt.length) cmpts.push(cmpt);
    });
    return cmpts;
}

});

parcelRequire.register("7WT3A", function(module, exports) {

$parcel$export(module.exports, "dijkstra", () => $5c98a84e4695886e$export$1c27361af35e8f2);

var $cojSg = parcelRequire("cojSg");

var $5dQx4 = parcelRequire("5dQx4");
var $5c98a84e4695886e$var$DEFAULT_WEIGHT_FUNC = $cojSg.constant(1);
function $5c98a84e4695886e$export$1c27361af35e8f2(g, source, weightFn, edgeFn) {
    return $5c98a84e4695886e$var$runDijkstra(g, String(source), weightFn || $5c98a84e4695886e$var$DEFAULT_WEIGHT_FUNC, edgeFn || function(v) {
        return g.outEdges(v);
    });
}
function $5c98a84e4695886e$var$runDijkstra(g, source, weightFn, edgeFn) {
    var results = {};
    var pq = new (0, $5dQx4.PriorityQueue)();
    var v, vEntry;
    var updateNeighbors = function(edge) {
        var w = edge.v !== v ? edge.v : edge.w;
        var wEntry = results[w];
        var weight = weightFn(edge);
        var distance = vEntry.distance + weight;
        if (weight < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + edge + " Weight: " + weight);
        if (distance < wEntry.distance) {
            wEntry.distance = distance;
            wEntry.predecessor = v;
            pq.decrease(w, distance);
        }
    };
    g.nodes().forEach(function(v) {
        var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
        results[v] = {
            distance: distance
        };
        pq.add(v, distance);
    });
    while(pq.size() > 0){
        v = pq.removeMin();
        vEntry = results[v];
        if (vEntry.distance === Number.POSITIVE_INFINITY) break;
        edgeFn(v).forEach(updateNeighbors);
    }
    return results;
}

});
parcelRequire.register("5dQx4", function(module, exports) {

$parcel$export(module.exports, "PriorityQueue", () => $3cd6ea7dd93a387d$export$8fbd1ac8e83536df);

var $cojSg = parcelRequire("cojSg");
/**
 * A min-priority queue data structure. This algorithm is derived from Cormen,
 * et al., "Introduction to Algorithms". The basic idea of a min-priority
 * queue is that you can efficiently (in O(1) time) get the smallest key in
 * the queue. Adding and removing elements takes O(log n) time. A key can
 * have its priority decreased in O(log n) time.
 */ class $3cd6ea7dd93a387d$export$8fbd1ac8e83536df {
    constructor(){
        this._arr = [];
        this._keyIndices = {};
    }
    /**
   * Returns the number of elements in the queue. Takes `O(1)` time.
   */ size() {
        return this._arr.length;
    }
    /**
   * Returns the keys that are in the queue. Takes `O(n)` time.
   */ keys() {
        return this._arr.map(function(x) {
            return x.key;
        });
    }
    /**
   * Returns `true` if **key** is in the queue and `false` if not.
   */ has(key) {
        return $cojSg.has(this._keyIndices, key);
    }
    /**
   * Returns the priority for **key**. If **key** is not present in the queue
   * then this function returns `undefined`. Takes `O(1)` time.
   *
   * @param {Object} key
   */ priority(key) {
        var index = this._keyIndices[key];
        if (index !== undefined) return this._arr[index].priority;
    }
    /**
   * Returns the key for the minimum element in this queue. If the queue is
   * empty this function throws an Error. Takes `O(1)` time.
   */ min() {
        if (this.size() === 0) throw new Error("Queue underflow");
        return this._arr[0].key;
    }
    /**
   * Inserts a new key into the priority queue. If the key already exists in
   * the queue this function returns `false`; otherwise it will return `true`.
   * Takes `O(n)` time.
   *
   * @param {Object} key the key to add
   * @param {Number} priority the initial priority for the key
   */ add(key, priority) {
        var keyIndices = this._keyIndices;
        key = String(key);
        if (!$cojSg.has(keyIndices, key)) {
            var arr = this._arr;
            var index = arr.length;
            keyIndices[key] = index;
            arr.push({
                key: key,
                priority: priority
            });
            this._decrease(index);
            return true;
        }
        return false;
    }
    /**
   * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
   */ removeMin() {
        this._swap(0, this._arr.length - 1);
        var min = this._arr.pop();
        delete this._keyIndices[min.key];
        this._heapify(0);
        return min.key;
    }
    /**
   * Decreases the priority for **key** to **priority**. If the new priority is
   * greater than the previous priority, this function will throw an Error.
   *
   * @param {Object} key the key for which to raise priority
   * @param {Number} priority the new priority for the key
   */ decrease(key, priority) {
        var index = this._keyIndices[key];
        if (priority > this._arr[index].priority) throw new Error("New priority is greater than current priority. Key: " + key + " Old: " + this._arr[index].priority + " New: " + priority);
        this._arr[index].priority = priority;
        this._decrease(index);
    }
    _heapify(i) {
        var arr = this._arr;
        var l = 2 * i;
        var r = l + 1;
        var largest = i;
        if (l < arr.length) {
            largest = arr[l].priority < arr[largest].priority ? l : largest;
            if (r < arr.length) largest = arr[r].priority < arr[largest].priority ? r : largest;
            if (largest !== i) {
                this._swap(i, largest);
                this._heapify(largest);
            }
        }
    }
    _decrease(index) {
        var arr = this._arr;
        var priority = arr[index].priority;
        var parent;
        while(index !== 0){
            parent = index >> 1;
            if (arr[parent].priority < priority) break;
            this._swap(index, parent);
            index = parent;
        }
    }
    _swap(i, j) {
        var arr = this._arr;
        var keyIndices = this._keyIndices;
        var origArrI = arr[i];
        var origArrJ = arr[j];
        arr[i] = origArrJ;
        arr[j] = origArrI;
        keyIndices[origArrJ.key] = i;
        keyIndices[origArrI.key] = j;
    }
}

});


parcelRequire.register("2HKtV", function(module, exports) {

var $cojSg = parcelRequire("cojSg");

var $7WT3A = parcelRequire("7WT3A");
function $1f83a733f84c63c8$export$188e2982c83b73c9(g, weightFunc, edgeFunc) {
    return $cojSg.transform(g.nodes(), function(acc, v) {
        acc[v] = (0, $7WT3A.dijkstra)(g, v, weightFunc, edgeFunc);
    }, {});
}

});

parcelRequire.register("jrlBx", function(module, exports) {

var $cojSg = parcelRequire("cojSg");

var $jPSur = parcelRequire("jPSur");
function $e2714c24b7026c1c$export$6385a1c8ba0e03b9(g) {
    return $cojSg.filter((0, $jPSur.tarjan)(g), function(cmpt) {
        return cmpt.length > 1 || cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]);
    });
}

});
parcelRequire.register("jPSur", function(module, exports) {

$parcel$export(module.exports, "tarjan", () => $e70d0c55967fa1b5$export$5f156e41c20211e5);

var $cojSg = parcelRequire("cojSg");
function $e70d0c55967fa1b5$export$5f156e41c20211e5(g) {
    var index = 0;
    var stack = [];
    var visited = {}; // node id -> { onStack, lowlink, index }
    var results = [];
    function dfs(v) {
        var entry = visited[v] = {
            onStack: true,
            lowlink: index,
            index: index++
        };
        stack.push(v);
        g.successors(v).forEach(function(w) {
            if (!$cojSg.has(visited, w)) {
                dfs(w);
                entry.lowlink = Math.min(entry.lowlink, visited[w].lowlink);
            } else if (visited[w].onStack) entry.lowlink = Math.min(entry.lowlink, visited[w].index);
        });
        if (entry.lowlink === entry.index) {
            var cmpt = [];
            var w;
            do {
                w = stack.pop();
                visited[w].onStack = false;
                cmpt.push(w);
            }while (v !== w);
            results.push(cmpt);
        }
    }
    g.nodes().forEach(function(v) {
        if (!$cojSg.has(visited, v)) dfs(v);
    });
    return results;
}

});


parcelRequire.register("h0TVk", function(module, exports) {

var $cojSg = parcelRequire("cojSg");
var $c62dd107bfbf2f79$var$DEFAULT_WEIGHT_FUNC = $cojSg.constant(1);
function $c62dd107bfbf2f79$export$fbbf4bd85aaff6bd(g, weightFn, edgeFn) {
    return $c62dd107bfbf2f79$var$runFloydWarshall(g, weightFn || $c62dd107bfbf2f79$var$DEFAULT_WEIGHT_FUNC, edgeFn || function(v) {
        return g.outEdges(v);
    });
}
function $c62dd107bfbf2f79$var$runFloydWarshall(g, weightFn, edgeFn) {
    var results = {};
    var nodes = g.nodes();
    nodes.forEach(function(v) {
        results[v] = {};
        results[v][v] = {
            distance: 0
        };
        nodes.forEach(function(w) {
            if (v !== w) results[v][w] = {
                distance: Number.POSITIVE_INFINITY
            };
        });
        edgeFn(v).forEach(function(edge) {
            var w = edge.v === v ? edge.w : edge.v;
            var d = weightFn(edge);
            results[v][w] = {
                distance: d,
                predecessor: v
            };
        });
    });
    nodes.forEach(function(k) {
        var rowK = results[k];
        nodes.forEach(function(i) {
            var rowI = results[i];
            nodes.forEach(function(j) {
                var ik = rowI[k];
                var kj = rowK[j];
                var ij = rowI[j];
                var altDistance = ik.distance + kj.distance;
                if (altDistance < ij.distance) {
                    ij.distance = altDistance;
                    ij.predecessor = kj.predecessor;
                }
            });
        });
    });
    return results;
}

});

parcelRequire.register("kO0Ds", function(module, exports) {

var $bev84 = parcelRequire("bev84");
function $f258f8583c09fb64$export$d455c45725963ce9(g) {
    try {
        (0, $bev84.topsort)(g);
    } catch (e) {
        if (e instanceof (0, $bev84.CycleException)) return false;
        throw e;
    }
    return true;
}

});
parcelRequire.register("bev84", function(module, exports) {

$parcel$export(module.exports, "topsort", () => $82d9261cc5f093cb$export$ddfa0f9cd705ef1d);
$parcel$export(module.exports, "CycleException", () => $82d9261cc5f093cb$export$7dcd3b9aab51459f);

var $cojSg = parcelRequire("cojSg");
$82d9261cc5f093cb$export$ddfa0f9cd705ef1d.CycleException = $82d9261cc5f093cb$export$7dcd3b9aab51459f;
function $82d9261cc5f093cb$export$ddfa0f9cd705ef1d(g) {
    var visited = {};
    var stack = {};
    var results = [];
    function visit(node) {
        if ($cojSg.has(stack, node)) throw new $82d9261cc5f093cb$export$7dcd3b9aab51459f();
        if (!$cojSg.has(visited, node)) {
            stack[node] = true;
            visited[node] = true;
            $cojSg.each(g.predecessors(node), visit);
            delete stack[node];
            results.push(node);
        }
    }
    $cojSg.each(g.sinks(), visit);
    if ($cojSg.size(visited) !== g.nodeCount()) throw new $82d9261cc5f093cb$export$7dcd3b9aab51459f();
    return results;
}
function $82d9261cc5f093cb$export$7dcd3b9aab51459f() {}
$82d9261cc5f093cb$export$7dcd3b9aab51459f.prototype = new Error(); // must be an instance of Error to pass testing

});


parcelRequire.register("iKPzt", function(module, exports) {

$parcel$export(module.exports, "postorder", () => $da7486d375a6267d$export$8d8ae0f94ad35db2);

var $4NyTt = parcelRequire("4NyTt");
function $da7486d375a6267d$export$8d8ae0f94ad35db2(g, vs) {
    return (0, $4NyTt.dfs)(g, vs, "post");
}

});
parcelRequire.register("4NyTt", function(module, exports) {

$parcel$export(module.exports, "dfs", () => $37e6ce35904cd3c3$export$51b654aff22fc5a6);

var $cojSg = parcelRequire("cojSg");
/*
 * A helper that preforms a pre- or post-order traversal on the input graph
 * and returns the nodes in the order they were visited. If the graph is
 * undirected then this algorithm will navigate using neighbors. If the graph
 * is directed then this algorithm will navigate using successors.
 *
 * Order must be one of "pre" or "post".
 */ function $37e6ce35904cd3c3$export$51b654aff22fc5a6(g, vs, order) {
    if (!$cojSg.isArray(vs)) vs = [
        vs
    ];
    var navigation = (g.isDirected() ? g.successors : g.neighbors).bind(g);
    var acc = [];
    var visited = {};
    $cojSg.each(vs, function(v) {
        if (!g.hasNode(v)) throw new Error("Graph does not have node: " + v);
        $37e6ce35904cd3c3$var$doDfs(g, v, order === "post", visited, navigation, acc);
    });
    return acc;
}
function $37e6ce35904cd3c3$var$doDfs(g, v, postorder, visited, navigation, acc) {
    if (!$cojSg.has(visited, v)) {
        visited[v] = true;
        if (!postorder) acc.push(v);
        $cojSg.each(navigation(v), function(w) {
            $37e6ce35904cd3c3$var$doDfs(g, w, postorder, visited, navigation, acc);
        });
        if (postorder) acc.push(v);
    }
}

});


parcelRequire.register("1oBWU", function(module, exports) {

$parcel$export(module.exports, "preorder", () => $1045783e7cb0a514$export$48e957eb03fa4375);

var $4NyTt = parcelRequire("4NyTt");
function $1045783e7cb0a514$export$48e957eb03fa4375(g, vs) {
    return (0, $4NyTt.dfs)(g, vs, "pre");
}

});

parcelRequire.register("jFRiS", function(module, exports) {

var $cojSg = parcelRequire("cojSg");

var $5dQx4 = parcelRequire("5dQx4");

var $8ZhJ2 = parcelRequire("8ZhJ2");
function $e52b31a30a296fa0$export$cf7b21533364217c(g, weightFunc) {
    var result = new (0, $8ZhJ2.Graph)();
    var parents = {};
    var pq = new (0, $5dQx4.PriorityQueue)();
    var v;
    function updateNeighbors(edge) {
        var w = edge.v === v ? edge.w : edge.v;
        var pri = pq.priority(w);
        if (pri !== undefined) {
            var edgeWeight = weightFunc(edge);
            if (edgeWeight < pri) {
                parents[w] = v;
                pq.decrease(w, edgeWeight);
            }
        }
    }
    if (g.nodeCount() === 0) return result;
    $cojSg.each(g.nodes(), function(v) {
        pq.add(v, Number.POSITIVE_INFINITY);
        result.setNode(v);
    });
    // Start from an arbitrary node
    pq.decrease(g.nodes()[0], 0);
    var init = false;
    while(pq.size() > 0){
        v = pq.removeMin();
        if ($cojSg.has(parents, v)) result.setEdge(v, parents[v]);
        else if (init) throw new Error("Input graph is not connected: " + g);
        else init = true;
        g.nodeEdges(v).forEach(updateNeighbors);
    }
    return result;
}

});




parcelRequire.register("44uXf", function(module, exports) {

$parcel$export(module.exports, "run", () => $2f6f8c103ca6c7a7$export$889ea624f2cb2c57);
$parcel$export(module.exports, "cleanup", () => $2f6f8c103ca6c7a7$export$de863c629cb9919d);

var $cojSg = parcelRequire("cojSg");

var $dKITw = parcelRequire("dKITw");
/*
 * A nesting graph creates dummy nodes for the tops and bottoms of subgraphs,
 * adds appropriate edges to ensure that all cluster nodes are placed between
 * these boundries, and ensures that the graph is connected.
 *
 * In addition we ensure, through the use of the minlen property, that nodes
 * and subgraph border nodes to not end up on the same rank.
 *
 * Preconditions:
 *
 *    1. Input graph is a DAG
 *    2. Nodes in the input graph has a minlen attribute
 *
 * Postconditions:
 *
 *    1. Input graph is connected.
 *    2. Dummy nodes are added for the tops and bottoms of subgraphs.
 *    3. The minlen attribute for nodes is adjusted to ensure nodes do not
 *       get placed on the same rank as subgraph border nodes.
 *
 * The nesting graph idea comes from Sander, "Layout of Compound Directed
 * Graphs."
 */ function $2f6f8c103ca6c7a7$export$889ea624f2cb2c57(g) {
    var root = $dKITw.addDummyNode(g, "root", {}, "_root");
    var depths = $2f6f8c103ca6c7a7$var$treeDepths(g);
    var height = $cojSg.max($cojSg.values(depths)) - 1; // Note: depths is an Object not an array
    var nodeSep = 2 * height + 1;
    g.graph().nestingRoot = root;
    // Multiply minlen by nodeSep to align nodes on non-border ranks.
    $cojSg.forEach(g.edges(), function(e) {
        g.edge(e).minlen *= nodeSep;
    });
    // Calculate a weight that is sufficient to keep subgraphs vertically compact
    var weight = $2f6f8c103ca6c7a7$var$sumWeights(g) + 1;
    // Create border nodes and link them up
    $cojSg.forEach(g.children(), function(child) {
        $2f6f8c103ca6c7a7$var$dfs(g, root, nodeSep, weight, height, depths, child);
    });
    // Save the multiplier for node layers for later removal of empty border
    // layers.
    g.graph().nodeRankFactor = nodeSep;
}
function $2f6f8c103ca6c7a7$var$dfs(g, root, nodeSep, weight, height, depths, v) {
    var children = g.children(v);
    if (!children.length) {
        if (v !== root) g.setEdge(root, v, {
            weight: 0,
            minlen: nodeSep
        });
        return;
    }
    var top = $dKITw.addBorderNode(g, "_bt");
    var bottom = $dKITw.addBorderNode(g, "_bb");
    var label = g.node(v);
    g.setParent(top, v);
    label.borderTop = top;
    g.setParent(bottom, v);
    label.borderBottom = bottom;
    $cojSg.forEach(children, function(child) {
        $2f6f8c103ca6c7a7$var$dfs(g, root, nodeSep, weight, height, depths, child);
        var childNode = g.node(child);
        var childTop = childNode.borderTop ? childNode.borderTop : child;
        var childBottom = childNode.borderBottom ? childNode.borderBottom : child;
        var thisWeight = childNode.borderTop ? weight : 2 * weight;
        var minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
        g.setEdge(top, childTop, {
            weight: thisWeight,
            minlen: minlen,
            nestingEdge: true
        });
        g.setEdge(childBottom, bottom, {
            weight: thisWeight,
            minlen: minlen,
            nestingEdge: true
        });
    });
    if (!g.parent(v)) g.setEdge(root, top, {
        weight: 0,
        minlen: height + depths[v]
    });
}
function $2f6f8c103ca6c7a7$var$treeDepths(g) {
    var depths = {};
    function dfs(v, depth) {
        var children = g.children(v);
        if (children && children.length) $cojSg.forEach(children, function(child) {
            dfs(child, depth + 1);
        });
        depths[v] = depth;
    }
    $cojSg.forEach(g.children(), function(v) {
        dfs(v, 1);
    });
    return depths;
}
function $2f6f8c103ca6c7a7$var$sumWeights(g) {
    return $cojSg.reduce(g.edges(), function(acc, e) {
        return acc + g.edge(e).weight;
    }, 0);
}
function $2f6f8c103ca6c7a7$export$de863c629cb9919d(g) {
    var graphLabel = g.graph();
    g.removeNode(graphLabel.nestingRoot);
    delete graphLabel.nestingRoot;
    $cojSg.forEach(g.edges(), function(e) {
        var edge = g.edge(e);
        if (edge.nestingEdge) g.removeEdge(e);
    });
}

});

parcelRequire.register("65kmU", function(module, exports) {

$parcel$export(module.exports, "order", () => $46e30275abe44066$export$aaaeab0fac9a3ccb);

var $cojSg = parcelRequire("cojSg");
parcelRequire("hp6PI");
var $8ZhJ2 = parcelRequire("8ZhJ2");

var $dKITw = parcelRequire("dKITw");

var $l5C25 = parcelRequire("l5C25");

var $6xnFh = parcelRequire("6xnFh");

var $2Sdwj = parcelRequire("2Sdwj");

var $750n9 = parcelRequire("750n9");

var $25t4Z = parcelRequire("25t4Z");
/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */ function $46e30275abe44066$export$aaaeab0fac9a3ccb(g) {
    var maxRank = $dKITw.maxRank(g), downLayerGraphs = $46e30275abe44066$var$buildLayerGraphs(g, $cojSg.range(1, maxRank + 1), "inEdges"), upLayerGraphs = $46e30275abe44066$var$buildLayerGraphs(g, $cojSg.range(maxRank - 1, -1, -1), "outEdges");
    var layering = (0, $750n9.initOrder)(g);
    $46e30275abe44066$var$assignOrder(g, layering);
    var bestCC = Number.POSITIVE_INFINITY, best;
    for(var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest){
        $46e30275abe44066$var$sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);
        layering = $dKITw.buildLayerMatrix(g);
        var cc = (0, $2Sdwj.crossCount)(g, layering);
        if (cc < bestCC) {
            lastBest = 0;
            best = $cojSg.cloneDeep(layering);
            bestCC = cc;
        }
    }
    $46e30275abe44066$var$assignOrder(g, best);
}
function $46e30275abe44066$var$buildLayerGraphs(g, ranks, relationship) {
    return $cojSg.map(ranks, function(rank) {
        return (0, $6xnFh.buildLayerGraph)(g, rank, relationship);
    });
}
function $46e30275abe44066$var$sweepLayerGraphs(layerGraphs, biasRight) {
    var cg = new (0, $8ZhJ2.Graph)();
    $cojSg.forEach(layerGraphs, function(lg) {
        var root = lg.graph().root;
        var sorted = (0, $25t4Z.sortSubgraph)(lg, root, cg, biasRight);
        $cojSg.forEach(sorted.vs, function(v, i) {
            lg.node(v).order = i;
        });
        (0, $l5C25.addSubgraphConstraints)(lg, cg, sorted.vs);
    });
}
function $46e30275abe44066$var$assignOrder(g, layering) {
    $cojSg.forEach(layering, function(layer) {
        $cojSg.forEach(layer, function(v, i) {
            g.node(v).order = i;
        });
    });
}

});
parcelRequire.register("l5C25", function(module, exports) {

$parcel$export(module.exports, "addSubgraphConstraints", () => $f5a791156af84027$export$def0b5ae5036962c);

var $cojSg = parcelRequire("cojSg");
function $f5a791156af84027$export$def0b5ae5036962c(g, cg, vs) {
    var prev = {}, rootPrev;
    $cojSg.forEach(vs, function(v) {
        var child = g.parent(v), parent, prevChild;
        while(child){
            parent = g.parent(child);
            if (parent) {
                prevChild = prev[parent];
                prev[parent] = child;
            } else {
                prevChild = rootPrev;
                rootPrev = child;
            }
            if (prevChild && prevChild !== child) {
                cg.setEdge(prevChild, child);
                return;
            }
            child = parent;
        }
    });
/*
  function dfs(v) {
    var children = v ? g.children(v) : g.children();
    if (children.length) {
      var min = Number.POSITIVE_INFINITY,
          subgraphs = [];
      _.each(children, function(child) {
        var childMin = dfs(child);
        if (g.children(child).length) {
          subgraphs.push({ v: child, order: childMin });
        }
        min = Math.min(min, childMin);
      });
      _.reduce(_.sortBy(subgraphs, "order"), function(prev, curr) {
        cg.setEdge(prev.v, curr.v);
        return curr;
      });
      return min;
    }
    return g.node(v).order;
  }
  dfs(undefined);
  */ }

});

parcelRequire.register("6xnFh", function(module, exports) {

$parcel$export(module.exports, "buildLayerGraph", () => $4c282e817e6d030f$export$eeb2d75ed1ad428);

var $cojSg = parcelRequire("cojSg");
parcelRequire("hp6PI");
var $8ZhJ2 = parcelRequire("8ZhJ2");
/*
 * Constructs a graph that can be used to sort a layer of nodes. The graph will
 * contain all base and subgraph nodes from the request layer in their original
 * hierarchy and any edges that are incident on these nodes and are of the type
 * requested by the "relationship" parameter.
 *
 * Nodes from the requested rank that do not have parents are assigned a root
 * node in the output graph, which is set in the root graph attribute. This
 * makes it easy to walk the hierarchy of movable nodes during ordering.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG
 *    2. Base nodes in the input graph have a rank attribute
 *    3. Subgraph nodes in the input graph has minRank and maxRank attributes
 *    4. Edges have an assigned weight
 *
 * Post-conditions:
 *
 *    1. Output graph has all nodes in the movable rank with preserved
 *       hierarchy.
 *    2. Root nodes in the movable layer are made children of the node
 *       indicated by the root attribute of the graph.
 *    3. Non-movable nodes incident on movable nodes, selected by the
 *       relationship parameter, are included in the graph (without hierarchy).
 *    4. Edges incident on movable nodes, selected by the relationship
 *       parameter, are added to the output graph.
 *    5. The weights for copied edges are aggregated as need, since the output
 *       graph is not a multi-graph.
 */ function $4c282e817e6d030f$export$eeb2d75ed1ad428(g, rank, relationship) {
    var root = $4c282e817e6d030f$var$createRootNode(g), result = new (0, $8ZhJ2.Graph)({
        compound: true
    }).setGraph({
        root: root
    }).setDefaultNodeLabel(function(v) {
        return g.node(v);
    });
    $cojSg.forEach(g.nodes(), function(v) {
        var node = g.node(v), parent = g.parent(v);
        if (node.rank === rank || node.minRank <= rank && rank <= node.maxRank) {
            result.setNode(v);
            result.setParent(v, parent || root);
            // This assumes we have only short edges!
            $cojSg.forEach(g[relationship](v), function(e) {
                var u = e.v === v ? e.w : e.v, edge = result.edge(u, v), weight = !$cojSg.isUndefined(edge) ? edge.weight : 0;
                result.setEdge(u, v, {
                    weight: g.edge(e).weight + weight
                });
            });
            if ($cojSg.has(node, "minRank")) result.setNode(v, {
                borderLeft: node.borderLeft[rank],
                borderRight: node.borderRight[rank]
            });
        }
    });
    return result;
}
function $4c282e817e6d030f$var$createRootNode(g) {
    var v;
    while(g.hasNode(v = $cojSg.uniqueId("_root")));
    return v;
}

});

parcelRequire.register("2Sdwj", function(module, exports) {

$parcel$export(module.exports, "crossCount", () => $217b1cbb2c507cdc$export$4487b4ec3754a783);

var $cojSg = parcelRequire("cojSg");
/*
 * A function that takes a layering (an array of layers, each with an array of
 * ordererd nodes) and a graph and returns a weighted crossing count.
 *
 * Pre-conditions:
 *
 *    1. Input graph must be simple (not a multigraph), directed, and include
 *       only simple edges.
 *    2. Edges in the input graph must have assigned weights.
 *
 * Post-conditions:
 *
 *    1. The graph and layering matrix are left unchanged.
 *
 * This algorithm is derived from Barth, et al., "Bilayer Cross Counting."
 */ function $217b1cbb2c507cdc$export$4487b4ec3754a783(g, layering) {
    var cc = 0;
    for(var i = 1; i < layering.length; ++i)cc += $217b1cbb2c507cdc$var$twoLayerCrossCount(g, layering[i - 1], layering[i]);
    return cc;
}
function $217b1cbb2c507cdc$var$twoLayerCrossCount(g, northLayer, southLayer) {
    // Sort all of the edges between the north and south layers by their position
    // in the north layer and then the south. Map these edges to the position of
    // their head in the south layer.
    var southPos = $cojSg.zipObject(southLayer, $cojSg.map(southLayer, function(v, i) {
        return i;
    }));
    var southEntries = $cojSg.flatten($cojSg.map(northLayer, function(v) {
        return $cojSg.sortBy($cojSg.map(g.outEdges(v), function(e) {
            return {
                pos: southPos[e.w],
                weight: g.edge(e).weight
            };
        }), "pos");
    }));
    // Build the accumulator tree
    var firstIndex = 1;
    while(firstIndex < southLayer.length)firstIndex <<= 1;
    var treeSize = 2 * firstIndex - 1;
    firstIndex -= 1;
    var tree = $cojSg.map(new Array(treeSize), function() {
        return 0;
    });
    // Calculate the weighted crossings
    var cc = 0;
    $cojSg.forEach(// @ts-expect-error
    southEntries.forEach(function(entry) {
        var index = entry.pos + firstIndex;
        tree[index] += entry.weight;
        var weightSum = 0;
        // @ts-expect-error
        while(index > 0){
            // @ts-expect-error
            if (index % 2) weightSum += tree[index + 1];
            // @ts-expect-error
            index = index - 1 >> 1;
            tree[index] += entry.weight;
        }
        cc += entry.weight * weightSum;
    }));
    return cc;
}

});

parcelRequire.register("750n9", function(module, exports) {

$parcel$export(module.exports, "initOrder", () => $527949f8f2feb6cd$export$a68885affb54ae0d);

var $cojSg = parcelRequire("cojSg");
/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */ function $527949f8f2feb6cd$export$a68885affb54ae0d(g) {
    var visited = {};
    var simpleNodes = $cojSg.filter(g.nodes(), function(v) {
        return !g.children(v).length;
    });
    var maxRank = $cojSg.max($cojSg.map(simpleNodes, function(v) {
        return g.node(v).rank;
    }));
    var layers = $cojSg.map($cojSg.range(maxRank + 1), function() {
        return [];
    });
    function dfs(v) {
        if ($cojSg.has(visited, v)) return;
        visited[v] = true;
        var node = g.node(v);
        layers[node.rank].push(v);
        $cojSg.forEach(g.successors(v), dfs);
    }
    var orderedVs = $cojSg.sortBy(simpleNodes, function(v) {
        return g.node(v).rank;
    });
    $cojSg.forEach(orderedVs, dfs);
    return layers;
}

});

parcelRequire.register("25t4Z", function(module, exports) {

$parcel$export(module.exports, "sortSubgraph", () => $18529af6737db86f$export$734a84c77ae2f1e);

var $cojSg = parcelRequire("cojSg");

var $fxW10 = parcelRequire("fxW10");

var $7fvcj = parcelRequire("7fvcj");

var $fKb5w = parcelRequire("fKb5w");
function $18529af6737db86f$export$734a84c77ae2f1e(g, v, cg, biasRight) {
    var movable = g.children(v);
    var node = g.node(v);
    var bl = node ? node.borderLeft : undefined;
    var br = node ? node.borderRight : undefined;
    var subgraphs = {};
    if (bl) movable = $cojSg.filter(movable, function(w) {
        return w !== bl && w !== br;
    });
    var barycenters = (0, $fxW10.barycenter)(g, movable);
    $cojSg.forEach(barycenters, function(entry) {
        if (g.children(entry.v).length) {
            var subgraphResult = $18529af6737db86f$export$734a84c77ae2f1e(g, entry.v, cg, biasRight);
            subgraphs[entry.v] = subgraphResult;
            if ($cojSg.has(subgraphResult, "barycenter")) $18529af6737db86f$var$mergeBarycenters(entry, subgraphResult);
        }
    });
    var entries = (0, $7fvcj.resolveConflicts)(barycenters, cg);
    $18529af6737db86f$var$expandSubgraphs(entries, subgraphs);
    var result = (0, $fKb5w.sort)(entries, biasRight);
    if (bl) {
        result.vs = $cojSg.flatten([
            bl,
            result.vs,
            br
        ]);
        if (g.predecessors(bl).length) {
            var blPred = g.node(g.predecessors(bl)[0]), brPred = g.node(g.predecessors(br)[0]);
            if (!$cojSg.has(result, "barycenter")) {
                result.barycenter = 0;
                result.weight = 0;
            }
            result.barycenter = (result.barycenter * result.weight + blPred.order + brPred.order) / (result.weight + 2);
            result.weight += 2;
        }
    }
    return result;
}
function $18529af6737db86f$var$expandSubgraphs(entries, subgraphs) {
    $cojSg.forEach(entries, function(entry) {
        entry.vs = $cojSg.flatten(entry.vs.map(function(v) {
            if (subgraphs[v]) return subgraphs[v].vs;
            return v;
        }));
    });
}
function $18529af6737db86f$var$mergeBarycenters(target, other) {
    if (!$cojSg.isUndefined(target.barycenter)) {
        target.barycenter = (target.barycenter * target.weight + other.barycenter * other.weight) / (target.weight + other.weight);
        target.weight += other.weight;
    } else {
        target.barycenter = other.barycenter;
        target.weight = other.weight;
    }
}

});
parcelRequire.register("fxW10", function(module, exports) {

$parcel$export(module.exports, "barycenter", () => $b516f0b67bed900a$export$d54b347d68b9b5f6);

var $cojSg = parcelRequire("cojSg");
function $b516f0b67bed900a$export$d54b347d68b9b5f6(g, movable) {
    return $cojSg.map(movable, function(v) {
        var inV = g.inEdges(v);
        if (!inV.length) return {
            v: v
        };
        else {
            var result = $cojSg.reduce(inV, function(acc, e) {
                var edge = g.edge(e), nodeU = g.node(e.v);
                return {
                    sum: acc.sum + edge.weight * nodeU.order,
                    weight: acc.weight + edge.weight
                };
            }, {
                sum: 0,
                weight: 0
            });
            return {
                v: v,
                barycenter: result.sum / result.weight,
                weight: result.weight
            };
        }
    });
}

});

parcelRequire.register("7fvcj", function(module, exports) {

$parcel$export(module.exports, "resolveConflicts", () => $5472224f5b5508e0$export$51b8c24513c4c069);

var $cojSg = parcelRequire("cojSg");
/*
 * Given a list of entries of the form {v, barycenter, weight} and a
 * constraint graph this function will resolve any conflicts between the
 * constraint graph and the barycenters for the entries. If the barycenters for
 * an entry would violate a constraint in the constraint graph then we coalesce
 * the nodes in the conflict into a new node that respects the contraint and
 * aggregates barycenter and weight information.
 *
 * This implementation is based on the description in Forster, "A Fast and
 * Simple Hueristic for Constrained Two-Level Crossing Reduction," thought it
 * differs in some specific details.
 *
 * Pre-conditions:
 *
 *    1. Each entry has the form {v, barycenter, weight}, or if the node has
 *       no barycenter, then {v}.
 *
 * Returns:
 *
 *    A new list of entries of the form {vs, i, barycenter, weight}. The list
 *    `vs` may either be a singleton or it may be an aggregation of nodes
 *    ordered such that they do not violate constraints from the constraint
 *    graph. The property `i` is the lowest original index of any of the
 *    elements in `vs`.
 */ function $5472224f5b5508e0$export$51b8c24513c4c069(entries, cg) {
    var mappedEntries = {};
    $cojSg.forEach(entries, function(entry, i) {
        var tmp = mappedEntries[entry.v] = {
            indegree: 0,
            in: [],
            out: [],
            vs: [
                entry.v
            ],
            i: i
        };
        if (!$cojSg.isUndefined(entry.barycenter)) {
            // @ts-expect-error
            tmp.barycenter = entry.barycenter;
            // @ts-expect-error
            tmp.weight = entry.weight;
        }
    });
    $cojSg.forEach(cg.edges(), function(e) {
        var entryV = mappedEntries[e.v];
        var entryW = mappedEntries[e.w];
        if (!$cojSg.isUndefined(entryV) && !$cojSg.isUndefined(entryW)) {
            entryW.indegree++;
            entryV.out.push(mappedEntries[e.w]);
        }
    });
    var sourceSet = $cojSg.filter(mappedEntries, function(entry) {
        // @ts-expect-error
        return !entry.indegree;
    });
    return $5472224f5b5508e0$var$doResolveConflicts(sourceSet);
}
function $5472224f5b5508e0$var$doResolveConflicts(sourceSet) {
    var entries = [];
    function handleIn(vEntry) {
        return function(uEntry) {
            if (uEntry.merged) return;
            if ($cojSg.isUndefined(uEntry.barycenter) || $cojSg.isUndefined(vEntry.barycenter) || uEntry.barycenter >= vEntry.barycenter) $5472224f5b5508e0$var$mergeEntries(vEntry, uEntry);
        };
    }
    function handleOut(vEntry) {
        return function(wEntry) {
            wEntry["in"].push(vEntry);
            if (--wEntry.indegree === 0) sourceSet.push(wEntry);
        };
    }
    while(sourceSet.length){
        var entry = sourceSet.pop();
        entries.push(entry);
        $cojSg.forEach(entry["in"].reverse(), handleIn(entry));
        $cojSg.forEach(entry.out, handleOut(entry));
    }
    return $cojSg.map($cojSg.filter(entries, function(entry) {
        return !entry.merged;
    }), function(entry) {
        return $cojSg.pick(entry, [
            "vs",
            "i",
            "barycenter",
            "weight"
        ]);
    });
}
function $5472224f5b5508e0$var$mergeEntries(target, source) {
    var sum = 0;
    var weight = 0;
    if (target.weight) {
        sum += target.barycenter * target.weight;
        weight += target.weight;
    }
    if (source.weight) {
        sum += source.barycenter * source.weight;
        weight += source.weight;
    }
    target.vs = source.vs.concat(target.vs);
    target.barycenter = sum / weight;
    target.weight = weight;
    target.i = Math.min(source.i, target.i);
    source.merged = true;
}

});

parcelRequire.register("fKb5w", function(module, exports) {

$parcel$export(module.exports, "sort", () => $b763c0bb299aecd3$export$97db5808d8f88186);

var $cojSg = parcelRequire("cojSg");

var $dKITw = parcelRequire("dKITw");
function $b763c0bb299aecd3$export$97db5808d8f88186(entries, biasRight) {
    var parts = $dKITw.partition(entries, function(entry) {
        return $cojSg.has(entry, "barycenter");
    });
    var sortable = parts.lhs, unsortable = $cojSg.sortBy(parts.rhs, function(entry) {
        return -entry.i;
    }), vs = [], sum = 0, weight = 0, vsIndex = 0;
    sortable.sort($b763c0bb299aecd3$var$compareWithBias(!!biasRight));
    vsIndex = $b763c0bb299aecd3$var$consumeUnsortable(vs, unsortable, vsIndex);
    $cojSg.forEach(sortable, function(entry) {
        vsIndex += entry.vs.length;
        vs.push(entry.vs);
        sum += entry.barycenter * entry.weight;
        weight += entry.weight;
        vsIndex = $b763c0bb299aecd3$var$consumeUnsortable(vs, unsortable, vsIndex);
    });
    var result = {
        vs: $cojSg.flatten(vs)
    };
    if (weight) {
        result.barycenter = sum / weight;
        result.weight = weight;
    }
    return result;
}
function $b763c0bb299aecd3$var$consumeUnsortable(vs, unsortable, index) {
    var last;
    while(unsortable.length && (last = $cojSg.last(unsortable)).i <= index){
        unsortable.pop();
        vs.push(last.vs);
        index++;
    }
    return index;
}
function $b763c0bb299aecd3$var$compareWithBias(bias) {
    return function(entryV, entryW) {
        if (entryV.barycenter < entryW.barycenter) return -1;
        else if (entryV.barycenter > entryW.barycenter) return 1;
        return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
    };
}

});



parcelRequire.register("6DMuV", function(module, exports) {

$parcel$export(module.exports, "parentDummyChains", () => $4d5c013e01760f32$export$f30289267ab03372);

var $cojSg = parcelRequire("cojSg");
function $4d5c013e01760f32$export$f30289267ab03372(g) {
    var postorderNums = $4d5c013e01760f32$var$postorder(g);
    $cojSg.forEach(g.graph().dummyChains, function(v) {
        var node = g.node(v);
        var edgeObj = node.edgeObj;
        var pathData = $4d5c013e01760f32$var$findPath(g, postorderNums, edgeObj.v, edgeObj.w);
        var path = pathData.path;
        var lca = pathData.lca;
        var pathIdx = 0;
        var pathV = path[pathIdx];
        var ascending = true;
        while(v !== edgeObj.w){
            node = g.node(v);
            if (ascending) {
                while((pathV = path[pathIdx]) !== lca && g.node(pathV).maxRank < node.rank)pathIdx++;
                if (pathV === lca) ascending = false;
            }
            if (!ascending) {
                while(pathIdx < path.length - 1 && g.node(pathV = path[pathIdx + 1]).minRank <= node.rank)pathIdx++;
                pathV = path[pathIdx];
            }
            g.setParent(v, pathV);
            v = g.successors(v)[0];
        }
    });
}
// Find a path from v to w through the lowest common ancestor (LCA). Return the
// full path and the LCA.
function $4d5c013e01760f32$var$findPath(g, postorderNums, v, w) {
    var vPath = [];
    var wPath = [];
    var low = Math.min(postorderNums[v].low, postorderNums[w].low);
    var lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
    var parent;
    var lca;
    // Traverse up from v to find the LCA
    parent = v;
    do {
        parent = g.parent(parent);
        vPath.push(parent);
    }while (parent && (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
    lca = parent;
    // Traverse from w to LCA
    parent = w;
    while((parent = g.parent(parent)) !== lca)wPath.push(parent);
    return {
        path: vPath.concat(wPath.reverse()),
        lca: lca
    };
}
function $4d5c013e01760f32$var$postorder(g) {
    var result = {};
    var lim = 0;
    function dfs(v) {
        var low = lim;
        $cojSg.forEach(g.children(v), dfs);
        result[v] = {
            low: low,
            lim: lim++
        };
    }
    $cojSg.forEach(g.children(), dfs);
    return result;
}

});

parcelRequire.register("gxDHH", function(module, exports) {

$parcel$export(module.exports, "position", () => $c0ae86bcc77831d6$export$5880b8b5730aff45);

var $cojSg = parcelRequire("cojSg");

var $dKITw = parcelRequire("dKITw");

var $iGKFI = parcelRequire("iGKFI");
function $c0ae86bcc77831d6$export$5880b8b5730aff45(g) {
    g = $dKITw.asNonCompoundGraph(g);
    $c0ae86bcc77831d6$var$positionY(g);
    $cojSg.forOwn((0, $iGKFI.positionX)(g), function(x, v) {
        g.node(v).x = x;
    });
}
function $c0ae86bcc77831d6$var$positionY(g) {
    var layering = $dKITw.buildLayerMatrix(g);
    var rankSep = g.graph().ranksep;
    var prevY = 0;
    $cojSg.forEach(layering, function(layer) {
        var maxHeight = $cojSg.max($cojSg.map(layer, function(v) {
            return g.node(v).height;
        }));
        $cojSg.forEach(layer, function(v) {
            g.node(v).y = prevY + maxHeight / 2;
        });
        prevY += maxHeight + rankSep;
    });
}

});
parcelRequire.register("iGKFI", function(module, exports) {

$parcel$export(module.exports, "positionX", () => $d9b05a4f868e451b$export$ec3af212ec314f01);

var $cojSg = parcelRequire("cojSg");
parcelRequire("hp6PI");
var $8ZhJ2 = parcelRequire("8ZhJ2");

var $dKITw = parcelRequire("dKITw");
/*
 * Marks all edges in the graph with a type-1 conflict with the "type1Conflict"
 * property. A type-1 conflict is one where a non-inner segment crosses an
 * inner segment. An inner segment is an edge with both incident nodes marked
 * with the "dummy" property.
 *
 * This algorithm scans layer by layer, starting with the second, for type-1
 * conflicts between the current layer and the previous layer. For each layer
 * it scans the nodes from left to right until it reaches one that is incident
 * on an inner segment. It then scans predecessors to determine if they have
 * edges that cross that inner segment. At the end a final scan is done for all
 * nodes on the current rank to see if they cross the last visited inner
 * segment.
 *
 * This algorithm (safely) assumes that a dummy node will only be incident on a
 * single node in the layers being scanned.
 */ function $d9b05a4f868e451b$export$a2336058547dd16b(g, layering) {
    var conflicts = {};
    function visitLayer(prevLayer, layer) {
        var // segment.
        k0 = 0, // Tracks the last node in this layer scanned for crossings with a type-1
        // segment.
        scanPos = 0, prevLayerLength = prevLayer.length, lastNode = $cojSg.last(layer);
        $cojSg.forEach(layer, function(v, i) {
            var w = $d9b05a4f868e451b$var$findOtherInnerSegmentNode(g, v), k1 = w ? g.node(w).order : prevLayerLength;
            if (w || v === lastNode) {
                $cojSg.forEach(layer.slice(scanPos, i + 1), function(scanNode) {
                    $cojSg.forEach(g.predecessors(scanNode), function(u) {
                        var uLabel = g.node(u), uPos = uLabel.order;
                        if ((uPos < k0 || k1 < uPos) && !(uLabel.dummy && g.node(scanNode).dummy)) $d9b05a4f868e451b$export$d6a30e6c78fac74(conflicts, u, scanNode);
                    });
                });
                // @ts-expect-error
                scanPos = i + 1;
                k0 = k1;
            }
        });
        return layer;
    }
    $cojSg.reduce(layering, visitLayer);
    return conflicts;
}
function $d9b05a4f868e451b$export$f384d2f2a62cea4b(g, layering) {
    var conflicts = {};
    function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
        var v;
        $cojSg.forEach($cojSg.range(southPos, southEnd), function(i) {
            v = south[i];
            if (g.node(v).dummy) $cojSg.forEach(g.predecessors(v), function(u) {
                var uNode = g.node(u);
                if (uNode.dummy && (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) $d9b05a4f868e451b$export$d6a30e6c78fac74(conflicts, u, v);
            });
        });
    }
    function visitLayer(north, south) {
        var prevNorthPos = -1, nextNorthPos, southPos = 0;
        $cojSg.forEach(south, function(v, southLookahead) {
            if (g.node(v).dummy === "border") {
                var predecessors = g.predecessors(v);
                if (predecessors.length) {
                    nextNorthPos = g.node(predecessors[0]).order;
                    scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
                    // @ts-expect-error
                    southPos = southLookahead;
                    prevNorthPos = nextNorthPos;
                }
            }
            scan(south, southPos, south.length, nextNorthPos, north.length);
        });
        return south;
    }
    $cojSg.reduce(layering, visitLayer);
    return conflicts;
}
function $d9b05a4f868e451b$var$findOtherInnerSegmentNode(g, v) {
    if (g.node(v).dummy) return $cojSg.find(g.predecessors(v), function(u) {
        return g.node(u).dummy;
    });
}
function $d9b05a4f868e451b$export$d6a30e6c78fac74(conflicts, v, w) {
    if (v > w) {
        var tmp = v;
        v = w;
        w = tmp;
    }
    var conflictsV = conflicts[v];
    if (!conflictsV) conflicts[v] = conflictsV = {};
    conflictsV[w] = true;
}
function $d9b05a4f868e451b$export$76734886d09d2999(conflicts, v, w) {
    if (v > w) {
        var tmp = v;
        v = w;
        w = tmp;
    }
    return $cojSg.has(conflicts[v], w);
}
/*
 * Try to align nodes into vertical "blocks" where possible. This algorithm
 * attempts to align a node with one of its median neighbors. If the edge
 * connecting a neighbor is a type-1 conflict then we ignore that possibility.
 * If a previous node has already formed a block with a node after the node
 * we're trying to form a block with, we also ignore that possibility - our
 * blocks would be split in that scenario.
 */ function $d9b05a4f868e451b$export$983b95e2e3722091(g, layering, conflicts, neighborFn) {
    var root = {}, align = {}, pos = {};
    // We cache the position here based on the layering because the graph and
    // layering may be out of sync. The layering matrix is manipulated to
    // generate different extreme alignments.
    $cojSg.forEach(layering, function(layer) {
        $cojSg.forEach(layer, function(v, order) {
            root[v] = v;
            align[v] = v;
            pos[v] = order;
        });
    });
    $cojSg.forEach(layering, function(layer) {
        var prevIdx = -1;
        $cojSg.forEach(layer, function(v) {
            var ws = neighborFn(v);
            if (ws.length) {
                ws = $cojSg.sortBy(ws, function(w) {
                    return pos[w];
                });
                var mp = (ws.length - 1) / 2;
                for(var i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i){
                    var w = ws[i];
                    if (align[v] === v && prevIdx < pos[w] && !$d9b05a4f868e451b$export$76734886d09d2999(conflicts, v, w)) {
                        align[w] = v;
                        align[v] = root[v] = root[w];
                        prevIdx = pos[w];
                    }
                }
            }
        });
    });
    return {
        root: root,
        align: align
    };
}
function $d9b05a4f868e451b$export$40e1a979a22b42db(g, layering, root, align, reverseSep) {
    // This portion of the algorithm differs from BK due to a number of problems.
    // Instead of their algorithm we construct a new block graph and do two
    // sweeps. The first sweep places blocks with the smallest possible
    // coordinates. The second sweep removes unused space by moving blocks to the
    // greatest coordinates without violating separation.
    var xs = {}, blockG = $d9b05a4f868e451b$var$buildBlockGraph(g, layering, root, reverseSep), borderType = reverseSep ? "borderLeft" : "borderRight";
    function iterate(setXsFunc, nextNodesFunc) {
        var stack = blockG.nodes();
        var elem = stack.pop();
        var visited = {};
        while(elem){
            if (visited[elem]) setXsFunc(elem);
            else {
                visited[elem] = true;
                stack.push(elem);
                stack = stack.concat(nextNodesFunc(elem));
            }
            elem = stack.pop();
        }
    }
    // First pass, assign smallest coordinates
    function pass1(elem) {
        xs[elem] = blockG.inEdges(elem).reduce(function(acc, e) {
            return Math.max(acc, xs[e.v] + blockG.edge(e));
        }, 0);
    }
    // Second pass, assign greatest coordinates
    function pass2(elem) {
        var min = blockG.outEdges(elem).reduce(function(acc, e) {
            return Math.min(acc, xs[e.w] - blockG.edge(e));
        }, Number.POSITIVE_INFINITY);
        var node = g.node(elem);
        if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) xs[elem] = Math.max(xs[elem], min);
    }
    iterate(pass1, blockG.predecessors.bind(blockG));
    iterate(pass2, blockG.successors.bind(blockG));
    // Assign x coordinates to all nodes
    $cojSg.forEach(align, function(v) {
        xs[v] = xs[root[v]];
    });
    return xs;
}
function $d9b05a4f868e451b$var$buildBlockGraph(g, layering, root, reverseSep) {
    var blockGraph = new (0, $8ZhJ2.Graph)(), graphLabel = g.graph(), sepFn = $d9b05a4f868e451b$var$sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);
    $cojSg.forEach(layering, function(layer) {
        var u;
        $cojSg.forEach(layer, function(v) {
            var vRoot = root[v];
            blockGraph.setNode(vRoot);
            if (u) {
                var uRoot = root[u], prevMax = blockGraph.edge(uRoot, vRoot);
                blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
            }
            u = v;
        });
    });
    return blockGraph;
}
/*
 * Returns the alignment that has the smallest width of the given alignments.
 */ function $d9b05a4f868e451b$export$870d8cbd39818c9(g, xss) {
    return $cojSg.minBy($cojSg.values(xss), function(xs) {
        var max = Number.NEGATIVE_INFINITY;
        var min = Number.POSITIVE_INFINITY;
        $cojSg.forIn(xs, function(x, v) {
            var halfWidth = $d9b05a4f868e451b$var$width(g, v) / 2;
            max = Math.max(x + halfWidth, max);
            min = Math.min(x - halfWidth, min);
        });
        return max - min;
    });
}
/*
 * Align the coordinates of each of the layout alignments such that
 * left-biased alignments have their minimum coordinate at the same point as
 * the minimum coordinate of the smallest width alignment and right-biased
 * alignments have their maximum coordinate at the same point as the maximum
 * coordinate of the smallest width alignment.
 */ function $d9b05a4f868e451b$export$68444cc44dca9679(xss, alignTo) {
    var alignToVals = $cojSg.values(alignTo), alignToMin = $cojSg.min(alignToVals), alignToMax = $cojSg.max(alignToVals);
    $cojSg.forEach([
        "u",
        "d"
    ], function(vert) {
        $cojSg.forEach([
            "l",
            "r"
        ], function(horiz) {
            var alignment = vert + horiz, xs = xss[alignment], delta;
            if (xs === alignTo) return;
            var xsVals = $cojSg.values(xs);
            delta = horiz === "l" ? alignToMin - $cojSg.min(xsVals) : alignToMax - $cojSg.max(xsVals);
            if (delta) xss[alignment] = $cojSg.mapValues(xs, function(x) {
                return x + delta;
            });
        });
    });
}
function $d9b05a4f868e451b$export$13efda6d80c8a88(xss, align) {
    return $cojSg.mapValues(xss.ul, function(ignore, v) {
        if (align) return xss[align.toLowerCase()][v];
        else {
            var xs = $cojSg.sortBy($cojSg.map(xss, v));
            return (xs[1] + xs[2]) / 2;
        }
    });
}
function $d9b05a4f868e451b$export$ec3af212ec314f01(g) {
    var layering = $dKITw.buildLayerMatrix(g);
    var conflicts = $cojSg.merge($d9b05a4f868e451b$export$a2336058547dd16b(g, layering), $d9b05a4f868e451b$export$f384d2f2a62cea4b(g, layering));
    var xss = {};
    var adjustedLayering;
    $cojSg.forEach([
        "u",
        "d"
    ], function(vert) {
        adjustedLayering = vert === "u" ? layering : $cojSg.values(layering).reverse();
        $cojSg.forEach([
            "l",
            "r"
        ], function(horiz) {
            if (horiz === "r") adjustedLayering = $cojSg.map(adjustedLayering, function(inner) {
                return $cojSg.values(inner).reverse();
            });
            var neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
            var align = $d9b05a4f868e451b$export$983b95e2e3722091(g, adjustedLayering, conflicts, neighborFn);
            var xs = $d9b05a4f868e451b$export$40e1a979a22b42db(g, adjustedLayering, align.root, align.align, horiz === "r");
            if (horiz === "r") xs = $cojSg.mapValues(xs, function(x) {
                return -x;
            });
            xss[vert + horiz] = xs;
        });
    });
    var smallestWidth = $d9b05a4f868e451b$export$870d8cbd39818c9(g, xss);
    $d9b05a4f868e451b$export$68444cc44dca9679(xss, smallestWidth);
    return $d9b05a4f868e451b$export$13efda6d80c8a88(xss, g.graph().align);
}
function $d9b05a4f868e451b$var$sep(nodeSep, edgeSep, reverseSep) {
    return function(g, v, w) {
        var vLabel = g.node(v);
        var wLabel = g.node(w);
        var sum = 0;
        var delta;
        sum += vLabel.width / 2;
        if ($cojSg.has(vLabel, "labelpos")) switch(vLabel.labelpos.toLowerCase()){
            case "l":
                delta = -vLabel.width / 2;
                break;
            case "r":
                delta = vLabel.width / 2;
                break;
        }
        if (delta) sum += reverseSep ? delta : -delta;
        delta = 0;
        sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
        sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;
        sum += wLabel.width / 2;
        if ($cojSg.has(wLabel, "labelpos")) switch(wLabel.labelpos.toLowerCase()){
            case "l":
                delta = wLabel.width / 2;
                break;
            case "r":
                delta = -wLabel.width / 2;
                break;
        }
        if (delta) sum += reverseSep ? delta : -delta;
        delta = 0;
        return sum;
    };
}
function $d9b05a4f868e451b$var$width(g, v) {
    return g.node(v).width;
}

});





//# sourceMappingURL=flowDiagram-93327f21.06432b66.js.map
