import React, { useState } from "react";
import styles from "./NodeEditor.module.css";

export default function NodeEditor({ edges, setEdges, nodes, setNodes }) {
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectedNode, setSelectedNode] = useState("");


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


        const imageUrl = imageFile ? URL.createObjectURL(imageFile) : "/icon/cube.png";
        setNodes((prev) => [...prev, { id: trimmed, x: 300, y: 300, image: imageUrl }]);
        setName("");
        setImageFile(null);
        setPreview(null);
    };

    const handleDeleteNode = (id) => {
        setNodes((prev) => prev.filter((node) => node.id !== id));
        setEdges((prev) => prev.filter(([from, to]) => from !== id && to !== id));
    };


    return (
       <div className={styles.container}>
      <h2>Node Editor</h2>

      <div className={styles.edgeContainer}>
        {edges.map((pair, edgeIndex) => (
          <div key={edgeIndex} className={styles.edgeRow}>
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

            <span className={styles.separator}> → </span>

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
      </div>

      <button type="button" onClick={handleAddEdge}>
        Add Edge
      </button>

      <div className={styles.nodeAdder}>
        <input
          type="text"
          value={name}
          placeholder="Node name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <input
          style={{ backgroundImage: `url(${preview})` }}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />
        <br />
        <button type="button" onClick={handleAddNode}>
          Add Node
        </button>
      </div>

      <br />

      <select
        value={selectedNode}
        onChange={(e) => setSelectedNode(e.target.value)}
      >
        <option value="" disabled>
          Pilih node untuk hapus
        </option>
        {nodes.map((node) => (
          <option key={node.id} value={node.id}>
            {node.id}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => {
          if (!selectedNode) return alert("Pilih node dulu");
          handleDeleteNode(selectedNode);
          setSelectedNode("");
        }}
      >
        Delete Node
      </button>
    </div>
    );
}
