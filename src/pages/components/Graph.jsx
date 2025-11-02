import React, { useEffect, useRef, useState } from "react";
import NodeEditor from "./NodeEditor";
import "./Graph.css"

function Graph({
  canvasId,
  infoId,
  nodes = [],
  edges = [],
  nodeImageSrc,
  nodeRadius = 20,
  downloadButton = false,
}) {
  const canvasRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    class Graph {
      constructor(canvas, infoDiv, nodes, edges, nodeImageSrc, nodeRadius) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.infoDiv = infoDiv;
        this.nodes = nodes;
        this.edges = edges;
        this.NODE_RADIUS = nodeRadius;
        this.dragNode = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.highlightNode = null;
        this.nodeImg = new Image();
        this.nodeImg.src = nodeImageSrc;
        this.nodeImg.onload = () => this.drawGraph();
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvas.addEventListener("click", this.onClick.bind(this));
      }

      getMousePos(evt) {
        const rect = this.canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top,
        };
      }

      getNodeById(id) {
        return this.nodes.find((node) => node.id === id);
      }

      getNodeAtPosition(x, y) {
        return this.nodes.find((node) => {
          const dx = x - node.x;
          const dy = y - node.y;
          return Math.sqrt(dx * dx + dy * dy) <= this.NODE_RADIUS;
        });
      }

      drawEdges() {
        this.ctx.strokeStyle = "#333";
        this.ctx.lineWidth = 2;
        this.edges.forEach(([from, to]) => {
          const start = this.getNodeById(from);
          const end = this.getNodeById(to);
          this.ctx.beginPath();
          this.ctx.moveTo(start.x, start.y);
          this.ctx.lineTo(end.x, end.y);
          this.ctx.stroke();
        });
      }

      drawNodes() {
        this.nodes.forEach((node) => {
          if (this.nodeImg.complete && this.nodeImg.naturalWidth !== 0) {
            const size = this.NODE_RADIUS * 2;

            if (node === this.highlightNode) {
              this.ctx.strokeStyle = "black";
              this.ctx.lineWidth = 1;
              this.ctx.beginPath();
              this.ctx.arc(
                node.x,
                node.y,
                this.NODE_RADIUS + 10,
                0,
                2 * Math.PI
              );
              this.ctx.stroke();
            }

            this.ctx.drawImage(
              this.nodeImg,
              node.x - this.NODE_RADIUS,
              node.y - this.NODE_RADIUS,
              size,
              size
            );

            this.ctx.fillStyle = "#000";
            this.ctx.font = "14px Arial";
            this.ctx.textAlign = "center";
            this.ctx.fillText(
              node.id,
              node.x,
              node.y + this.NODE_RADIUS + 15
            );
          } else {
            this.ctx.beginPath();
            this.ctx.fillStyle = "#4a90e2";
            this.ctx.arc(node.x, node.y, this.NODE_RADIUS, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
          }
        });
      }

      drawGraph() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawEdges();
        this.drawNodes();
      }

      onMouseDown(evt) {
        const pos = this.getMousePos(evt);
        const node = this.getNodeAtPosition(pos.x, pos.y);
        if (node) {
          this.dragNode = node;
          this.offsetX = pos.x - node.x;
          this.offsetY = pos.y - node.y;
          this.canvas.style.cursor = "grabbing";
        }
      }

      onMouseUp() {
        if (this.dragNode) {
          this.dragNode = null;
          this.canvas.style.cursor = "grab";
          this.drawGraph();
        }
      }

      onMouseMove(evt) {
        const pos = this.getMousePos(evt);
        if (this.dragNode) {
          this.dragNode.x = pos.x - this.offsetX;
          this.dragNode.y = pos.y - this.offsetY;
          this.highlightNode = this.dragNode;
          this.drawGraph();
        } else {
          const hoverNode = this.getNodeAtPosition(pos.x, pos.y);
          if (hoverNode !== this.highlightNode) {
            this.highlightNode = hoverNode;
            this.drawGraph();
          }
          this.canvas.style.cursor = hoverNode ? "pointer" : "grab";
        }
      }

      onClick(evt) {
        const pos = this.getMousePos(evt);
        const node = this.getNodeAtPosition(pos.x, pos.y);
        if (node) {
          this.infoDiv.textContent = `Node yang diklik: ${node.id
            } (x: ${Math.round(node.x)}, y: ${Math.round(node.y)})`;
        } else {
          this.infoDiv.textContent = "Klik node untuk info.";
        }
      }
    }

    if (canvasRef.current && infoRef.current) {
      const graph = new Graph(
        canvasRef.current,
        infoRef.current,
        nodes,
        edges,
        nodeImageSrc,
        nodeRadius
      );

      if (downloadButton) {
        const button = document.getElementById(`btnDownload-${canvasId}`);
        if (button) {
          button.onclick = () => {
            const dataURL = canvasRef.current.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = `${canvasId}.png`;
            link.click();
          };
        }
      }

      return () => {
        graph.canvas.removeEventListener("mousedown", graph.onMouseDown);
        graph.canvas.removeEventListener("mouseup", graph.onMouseUp);
        graph.canvas.removeEventListener("mousemove", graph.onMouseMove);
        graph.canvas.removeEventListener("click", graph.onClick);
      };
    }
  }, [nodes, edges, nodeImageSrc, nodeRadius, canvasId, downloadButton]);

  return (
    <div style={{ marginBottom: "40px" }}>
      {downloadButton && (
        <button id={`btnDownload-${canvasId}`} style={{ marginBottom: 10 }}>
          Download Gambar
        </button>
      )}
      <canvas
        ref={canvasRef}
        id={canvasId}
        width={600}
        height={400}
        style={{ border: "1px solid #000", cursor: "grab", display: "block" }}
      />
      <div ref={infoRef} id={infoId}>
        Klik node untuk info.
      </div>
    </div>
  );
}

export default function GraphApp() {
  const [edges, setEdges] = useState([
    ["A", "B"],
    ["A", "C"],
    ["B", "C"],
  ])
  const [node, setNode] = useState([
    { id: "A", x: 100, y: 100, image: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
    { id: "B", x: 300, y: 100, image: "https://cdn-icons-png.flaticon.com/512/147/147144.png" },
    { id: "C", x: 200, y: 250, image: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png" },
  ]);


  useEffect(() => {


  }, [])

  return (<div className="container">
    <NodeEditor edges={edges} setEdges={setEdges} nodes={node} setNodes={setNode} />
    <div>
      <h2>Demo Network Graph</h2>

      <Graph
        canvasId="graph1"
        infoId="info1"
        nodes={node}
        edges={edges}
        nodeImageSrc="https://cdn-icons-png.flaticon.com/512/616/616408.png"
        downloadButton
      />
    </div>
  </div>)
}
