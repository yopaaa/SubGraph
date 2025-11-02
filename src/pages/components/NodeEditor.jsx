import React, { useState } from "react";
import "./NodeEditor.css";

export default function NodeEditor({ edges, setEdges, nodes, setNodes }) {
    const [name, setName] = useState("");

    const handleEdgeChange = (edgeIndex, side, newValue) => {
        setEdges((prev) => {
            const updated = [...prev];
            updated[edgeIndex] = [
                side === "from" ? newValue : updated[edgeIndex][0],
                side === "to" ? newValue : updated[edgeIndex][1],
            ];
            return updated;
        });
    };

    // tambah edge baru
    const handleAddEdge = () => {
        if (nodes.length < 2) return alert("Tambahkan minimal 2 node dulu.");
        const first = nodes[0].id;
        const second = nodes[1].id;
        setEdges((prev) => [...prev, [first, second]]);
    };

    const handleAddNode = () => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const isExist = nodes.find((val) => val.id === trimmed);
        if (isExist) return;
        setNodes((prev) => [...prev, { id: trimmed, x: 300, y: 300 }]);
        setName("");
    };

    return (
        <div className="editor-container">
            <h2>Node Editor</h2>

            {edges.map((pair, edgeIndex) => (
                <div key={edgeIndex} className="edge-row">
                    <select
                        value={pair[0]}
                        onChange={(e) => handleEdgeChange(edgeIndex, "from", e.target.value)}
                    >
                        {nodes.map((node) => (
                            <option key={node.id} value={node.id}>
                                {node.id}
                            </option>
                        ))}
                    </select>

                    <span className="separator">→→→→→→→</span>

                    <select
                        value={pair[1]}
                        onChange={(e) => handleEdgeChange(edgeIndex, "to", e.target.value)}
                    >
                        {nodes.map((node) => (
                            <option key={node.id} value={node.id}>
                                {node.id}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            <button type="button" onClick={handleAddEdge}>
                Add Edge
            </button>

            <div className="node-adder">
                <input
                    type="text"
                    value={name}
                    placeholder="Node name"
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="button" onClick={handleAddNode}>
                    Add Node
                </button>
            </div>
        </div>
    );
}
