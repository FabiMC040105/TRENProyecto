import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';

function GraphComponent() {
  const [trainRoutes, setTrainRoutes] = useState([]);

  function generarRutasDeTrenes() {
    const routes = [
      { origin: 'Santo Domingo', destination: 'Tibás'},
      { origin: 'Santo Domingo', destination: 'Heredia'},
      { origin: 'Heredia', destination: 'Santo Domingo'}, 
      { origin: 'Tibás', destination: 'Santo Domingo'},
      { origin: 'Tibás', destination: 'San José' },
      { origin: 'Moravia', destination: 'Tibás'},
      { origin: 'San José', destination: 'Tibás'},
      { origin: 'San José', destination: 'Zapote' },
      { origin: 'San José', destination: 'San Pedro' },
      { origin: 'San Pedro', destination: 'San José'},
      { origin: 'Zapote', destination:'San José'},
      { origin: 'Zapote', destination: 'Tres Ríos' },
      { origin: 'Tres Ríos', destination: 'Cartago' },
      { origin: 'Cartago', destination: 'Paraíso' },
      { origin: 'Paraíso', destination: 'Cartago'},
      { origin: 'Cartago', destination: 'Tres Ríos'},
      { origin: 'Tres Ríos', destination: 'Zapote'},
      { origin: 'Tres Ríos', destination: 'Curridabat'},
      {origin: 'Curridabat', destination: 'Tres Ríos'},
      {origin: 'Curridabat', destination: 'San Pedro'},
      {origin: 'San Pedro', destination: 'Curridabat'},
      {origin: 'San Pedro', destination: 'Guadalupe'},
      {origin: 'Guadalupe', destination: 'San Pedro'},
      {origin: 'Guadalupe', destination: 'Moravia'},
      {origin: 'Moravia', destination: 'Guadalupe'},
      {origin: 'Sabanilla', destination: 'San José'},
      {origin: 'Sabanilla', destination: 'Guadalupe'},
      {origin: 'Sabanilla', destination: 'San Pedro'},
      {origin: 'Tres Ríos', destination: 'Sabanilla'},

      
    ];
    setTrainRoutes(routes);
  }

  useEffect(() => {
    generarRutasDeTrenes();
  }, []);

  
  const data = {
    nodes: [
      { id: 'Santo Domingo', name: 'Santo Domingo'},
      { id: 'Tibás', name: 'Tibás'},
      { id: 'San José', name: 'San José'},
      { id: 'Zapote', name: 'Zapote'},
      { id: 'Tres Ríos', name: 'Tres Ríos'},
      { id: 'Cartago', name: 'Cartago' },
      { id: 'Paraíso', name: 'Paraíso'},
      { id: 'Heredia', name: 'Heredia'},
      { id: 'San Pedro', name: 'San Pedro'},
      { id: 'Sabanilla', name: 'Sabanilla'},
      { id: 'Curridabat', name: 'Curridabat'},
      { id: 'Guadalupe', name: 'Guadalupe'},
      { id: 'Moravia', name: 'Moravia'}, 


    ],
    links: trainRoutes.map((route, index) => ({
      source: route.origin,
      target: route.destination,
      label: route.duration,
    })),
  };

  const myConfig = {
    nodeHighlightBehavior: true,
    linkHighlightBehavior: true,
    automaticRearrangeAfterDropNode: true,
    collapsible: false,
    directed: true,
    focusAnimationDuration: 0.75,
    focusZoom: 3,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    linkHighlightColor: 'blue',
    linkLabelColor: 'black',
    linkLabelHighlightBold: true,
    nodeHighlightBorderColor: 'blue',
    node: {
      color: 'lightblue',
      size: 200,
      fontColor: 'white',
      fontSize: 12,
      labelPosition: 'inside',
      renderLabel: true,
      labelProperty: 'name',
    },
    link: {
      renderLabel: true,
      fontSize: 50,
    },
    d3: {
      linkLength: 500,
      gravity: -100,
      linkStrength: 0.5,
      alphaTarget: 0.1,
      forceManyBody: {
        strength: -100,
      },
    },
    graph: {
      labelFontSize: 12,
    },
  };

  return (
    <div style={{overflow: 'hidden', margin: '0 auto', position: 'relative'}}>
      <h2>Rutas de Trenes</h2>
      <Graph
        id="graficoRutas"
        data={data}
        config={myConfig}
      />
    </div>
  );
}


export default GraphComponent;
export const estaciones = [
  { id: 'Santo Domingo', name: 'Santo Domingo' },
  { id: 'Tibás', name: 'Tibás' },
  { id: 'San José', name: 'San José' },
  { id: 'Zapote', name: 'Zapote' },
  { id: 'Tres Ríos', name: 'Tres Ríos' },
  { id: 'Cartago', name: 'Cartago' },
  { id: 'Paraíso', name: 'Paraíso' },
  { id: 'Heredia', name: 'Heredia' },
  { id: 'San Pedro', name: 'San Pedro' },
  { id: 'Sabanilla', name: 'Sabanilla' },
  { id: 'Curridabat', name: 'Curridabat' },
  { id: 'Guadalupe', name: 'Guadalupe' },
  { id: 'Moravia', name: 'Moravia' },
];