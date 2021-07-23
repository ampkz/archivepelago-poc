import React from 'react';
import './LettersGraph.css';
import * as d3 from "d3";
import letter from '../img/svg/letter.svg';
import { INIT_ZOOM, MIN_ZOOM, MAX_ZOOM, LETTERS_URL, PEOPLE_URL, LINKS_URL } from './appletConfig';

function LettersGraph({ handleZoomChange, onSelectArtist }, ref) {    
    React.useEffect(() => {
        drawGraph();
    }, [])
    
    React.useImperativeHandle(ref, () => ({
        setZoomVal(value){
            d3.select("svg").call(zoom.transform, d3.zoomIdentity.translate(currentX, currentY).scale(value));
        }
    }), []);

    const [currentX, setCurrentX] = React.useState(0);
    const [currentY, setCurrentY] = React.useState(0);

    const personNodeR = 90,
        selectedPersonNodeR = personNodeR + 15,
        letterNodeR = 40,
        selectedLetterNodeR = letterNodeR + 10,
        linkDistance = 150,
        linkStren = 0.25,
        initialTransform = d3.zoomIdentity.translate(0, 0).scale(INIT_ZOOM),
        forceStrengthScale = -150,
        scaleNameBreakpoint = 0.4;

    let nameToggled = true,
        selectedPerson = null,
        selectedLetters = null,
        svgGraph = null;

    const deselectAll = () => {
            
        if(selectedPerson){
            selectedPerson.attr("r", personNodeR)
                .transition().duration("500");
            selectedPerson.classed("selected-person", false)
                .classed("unselected-person", true);
        }

        if(selectedLetters){
            selectedLetters.attr("r", letterNodeR)
                .transition().duration("500");
            selectedLetters.classed("selected-letters", false)
                .classed("unselected-letters", true);
        }
    }

    const selectLetters = (event, d) => {
        deselectAll();

        selectedLetters = d3.select(event.target);

        selectedLetters.attr("r", selectedLetterNodeR);
        selectedLetters.classed("selected-letters", true).classed("unselected-letters", false);

        // this.props.onSelectNode(SHOW_LETTERS, lettersList.filter((letter) => {
        //     return (letter.From === source && letter.To === target) || (letter.From === target && letter.To === source)
        // }));
    }

    const selectPerson = (event, d) => {
            
        deselectAll();

        selectedPerson = d3.select(event.target);

        selectedPerson.attr("r", selectedPersonNodeR);
        selectedPerson.classed("selected-person", true).classed("unselected-person", false);

        onSelectArtist(d);
    }

    const zoom = d3.zoom().scaleExtent([MIN_ZOOM, MAX_ZOOM]).on("zoom", event => {

        let zoomTo = event.transform.k;

        svgGraph.attr("transform", event.transform);
        
        setCurrentX(event.transform.x);
        setCurrentY(event.transform.y);

        handleZoomChange(event.transform.k);

        if(zoomTo <= scaleNameBreakpoint && nameToggled)
        {
            nameToggled = false;
            d3.select(".full-names").style("visibility", "hidden");
            d3.select(".initials").style("visibility", "visible")
        }else if(zoomTo >= scaleNameBreakpoint && !nameToggled){
            nameToggled = true;
            d3.select(".full-names").style("visibility", "visible");
            d3.select(".initials").style("visibility", "hidden")
        }
    })

    const drawGraph = async () => {
        
        svgGraph = d3.select('svg')
            .call(zoom)
            .append('g')
                .attr('class', 'svgGraph');
        
        svgGraph.append('text')
            .attr("x", "0")
            .attr("y", "0")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .attr("class", "loading-text")
            .text("LOADING");

        const people = await d3.csv(PEOPLE_URL);
        const lettersList = await d3.csv(LETTERS_URL);
        const letterLinks = await d3.json(LINKS_URL);

        svgGraph.select(".loading-text").remove();

        const simulation = d3.forceSimulation(people)
            .force("link", d3.forceLink(letterLinks).id(d => {return StringifyName(d);}).distance(linkDistance).strength(linkStren))
            .force("charge", d3.forceManyBody().strength(linkDistance * forceStrengthScale))
            .force("center", d3.forceCenter(0, 0))
            .force("collide", d3.forceCollide().radius(personNodeR))
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        const link = svgGraph.append("g")
                .attr("class", "links")
            .selectAll("line")
            .data(letterLinks).enter()
            .append("line")
                .attr("stroke-dasharray", "2,7");

        const letter = svgGraph.append("g")
                .attr("class", "letter-nodes")
            .selectAll("circle")
            .data(letterLinks).enter()
            .append("circle")
                .attr("class", "unselected-letters")
                .attr("r", letterNodeR)
                .on("click", selectLetters);

        const letterSVG = svgGraph.append("g")
                .attr("class", "letter-nodes-svg")
                .style("pointer-events", "none")
            .selectAll("use")
            .data(letterLinks).enter()
            .append("use")
                .attr("href", "#letter-svg");

        const person = svgGraph.append("g")
                .attr("class", "people")
            .selectAll("circle")
            .data(people).enter()
            .append("circle")
                .attr("class", "unselected-person")
                .attr('r', personNodeR)
                .on('click', selectPerson);

        const initials_label = d3.select(".people").append("g")
                .attr("class", "initials")
                .style("visibility", "hidden")
            .selectAll("text")
            .data(people).enter()
            .append("text")
                .style("pointer-events", "none")
                .attr("text-anchor", "middle")
                //.attr("alignment-baseline", "middle")
                .attr('dominant-baseline', 'central')
                .text(d => {return d.FirstName[0] + " " + d.LastName[0]});

        const person_label = d3.select(".people").append("g")
                .attr("class", "full-names")
            .selectAll("text")
            .data(people).enter()
            .append("text")
                .style("pointer-events", "none")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle");
        
        //REM: Fix to use SecondName column for people with second names
        const first_name = person_label.append("tspan")
            .attr("text-anchor", "middle")
            .text(d => { return d.FirstName.split(" ")[0]; });

        const last_name = person_label.append("tspan")
                .attr("dy", "1em")
            .text(d => { return d.LastName; });

        d3.select("svg").call(zoom.transform, initialTransform);

        function ticked() {
            person
                .attr("cx", d=> { return d.x; })
                .attr("cy", d=> { return d.y; });
    
            link
                .attr("x1", d => { return d.source.x })
                .attr("y1", d => { return d.source.y })
                .attr("x2", d => { return d.target.x })
                .attr("y2", d => { return d.target.y });
    
            letter
                .attr("cx", d => { return (d.source.x + d.target.x)/2})
                .attr("cy", d => { return (d.source.y + d.target.y)/2});
    
            letterSVG
                .attr("x", d => { return (d.source.x + d.target.x)/2})
                .attr("y", d => { return (d.source.y + d.target.y)/2});
    
            initials_label
                .attr("x", d => { return d.x; })
                .attr("y", d => { return d.y; })
    
            first_name 
                .attr("x", d => { return d.x; })
                .attr("y", d => { return d.y; })
    
            last_name
                .attr("x", d => { return d.x; })
                .attr("dy", d => { return "1em"; })
        }
    
        simulation.on("tick", ticked);
    
        function drag_start(event, d){
            if(!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function drag_drag(event, d){
            d.fx = event.x;
            d.fy = event.y;
        }
        
        function drag_end(event, d){
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
        
        let drag_handler = d3.drag()
            .on("start", drag_start)
            .on("drag", drag_drag)
            .on("end", drag_end);
        
        drag_handler(person);

    }
    
    return <section id="letters-graph">
        <svg viewBox="-1200 -450 1800 800">
                <defs>
                    <image width="50px" height="40px" x="-25" y="-20" href={letter} id="letter-svg"></image>
                </defs>
            </svg>
    </section>
}

export const StringifyName = (nameObj) => {
    if(String(nameObj.SecondName).length > 0){
        return nameObj.FirstName + ' ' + nameObj.SecondName + ' ' + nameObj.LastName;
    }else{
        return nameObj.FirstName + ' ' + nameObj.LastName;
    }
}


export default React.forwardRef(LettersGraph);