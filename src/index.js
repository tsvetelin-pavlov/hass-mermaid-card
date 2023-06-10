import { MermaidCard } from "./card";
import { MermaidCardEditor } from "./editor";

customElements.define(
    "mermaid-card",
    MermaidCard
);
customElements.define(
    "mermaid-card-editor",
    MermaidCardEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "mermaid-card",
    name: "Mermaid card",
    description: "Charts and diagrams",
});
