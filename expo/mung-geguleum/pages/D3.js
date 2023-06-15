import React, { useEffect, useRef ,useState} from 'react';
import * as d3 from 'd3';
import '../styles/d3.css';
import axios from 'axios';
import Modal from 'react-modal';
import PageModal from "../modal/PageModal";

const API_URL = process.env.REACT_APP_API_URL;

const D3 = ({handlePostClick}) => {
    const svgRef = React.useRef();
    const [graphData, setGraphData] = useState(null);
    const simulationRef = useRef(null);

    const fetchGraphData = async () => {
        try {
            const response = await axios.get(`${API_URL}/tag/json`);
            const data = response.data[0];
            console.log(data);
            setGraphData(data);
        } catch (error) {
            console.error('Error fetching graph data:', error);
        }
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = +svg.node().getBoundingClientRect().width;
        const height = +svg.node().getBoundingClientRect().height;

        let link, node, simulation;

        const initializeDisplay = () => {
            // set the data and properties of link lines
            link = svg
                .append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graphData.links)
                .enter()
                .append("line")
                .attr("marker-end", "url(#arrowhead)");

            // set the data and properties of node circles
            node = svg
                .append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(graphData.nodes)
                .enter()
                .append("circle")
                .call(
                    d3
                        .drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended)
                )
                .on('click', pnoClick);
            // node tooltip
            node
                .append("title")
                .text((d) => `${d.regTime}\n${d.title}\n${d.nickname}`);

            // generate the svg objects and force simulation

            simulation = d3.forceSimulation(graphData.nodes);
            // set up the simulation and event to update locations after each tick
            simulation.on("tick", ticked);
            initializeForces();
            updateDisplay();

        };

        const initializeForces = () => {
            // add forces and associate each with a name
            simulation
                .force(
                    "link",
                    d3.forceLink().id((d) => {
                        return d.id;
                    })
                )
                .force("charge", d3.forceManyBody())
                .force("collide", d3.forceCollide())
                .force("center", d3.forceCenter(width / 2, height / 2));
            updateForces();

            var helloNode = graphData.nodes.find(function (node) {
                return node.id === "잔잔한 피아노 사운드";
            });

            if (helloNode) {
                helloNode.fx = width / 2;
                helloNode.fy = height / 2;
                simulation.alphaTarget(0).restart();
            }
        };

        const updateForces = () => {
            // get each force by name and update the properties
            simulation.force("charge").strength(-120);

            simulation
                .force("link")
                .distance(30)
                .iterations(1)
                .links(graphData.links);
        };

        const updateDisplay = () => {
            node
                .attr("r", 5)
                .attr("stroke", "red")
                .attr("stroke-width", Math.abs(-120) / 15);

            link.attr("stroke-width", 1).attr("opacity", 1);
        };

        const ticked = () => {
            link
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        };

        // 화살표 만들기
        svg
            .append("defs")
            .append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 25)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("xoverflow", "visible")
            .append("svg:path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5")
            .attr("fill", "#999")
            .style("stroke", "none");

        const dragstarted = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        const dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        const dragended = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0.0001);
            d.fx = null;
            d.fy = null;
        };

        if (graphData && graphData.links && graphData.nodes) {
            initializeDisplay();
        } else {
            fetchGraphData();
        }
        const handleWindowResize = () => {
            const width = +svg.node().getBoundingClientRect().width;
            const height = +svg.node().getBoundingClientRect().height;
            if (simulationRef.current) {
                simulationRef.current.force("center", d3.forceCenter(width / 2, height / 2));
                updateForces();
                updateDisplay();
            }
        };


        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [graphData]);


    const [selectedNode, setSelectedNode] = useState(null);
    const [nodeData, setNodeData] = useState(null);
    const pnoClick = async (d) => {
        setSelectedPostId(d.id);
        setClickedPostId(d.id);
        setShowPopup(true);
    };

    const closeModal = () => {
        setSelectedNode(null);
        setNodeData(null);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [clickedPostId, setClickedPostId] = useState(null);

    return (
        <>

            <svg ref={svgRef} width={1200} height={880}></svg>
            <PageModal
                showPopup={showPopup && selectedPostId === clickedPostId}
                setShowPopup={setShowPopup}
                postId={showPopup && selectedPostId === clickedPostId ? clickedPostId : null}
                handlePostClick={handlePostClick}
            />
        </>
    );

};
export default D3