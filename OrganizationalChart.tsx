import { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

type NodeData = {
  id: string;
  label: string;
  category: 'leadership' | 'directorate' | 'technical' | 'systems' | 'operations' | 'hr';
  x: number;
  y: number;
  width?: number;
  height?: number;
};

type ConnectionData = {
  from: string;
  to: string;
};

const nodes: NodeData[] = [
  // Leadership Level
  { id: '1', label: 'IDP Steering Committee', category: 'leadership', x: 50, y: 50, width: 200 },
  { id: '2', label: 'Executive Director Africa Region', category: 'leadership', x: 50, y: 150, width: 220 },
  
  // Ministerial Conference Branch
  { id: '3', label: 'Ministerial Conference', category: 'technical', x: 350, y: 50, width: 200 },
  { id: '4', label: 'RIMES Council', category: 'technical', x: 350, y: 140, width: 180 },
  { id: '5', label: 'Secretariat', category: 'technical', x: 350, y: 230, width: 160 },
  { id: '6', label: 'Director General', category: 'technical', x: 350, y: 320, width: 180 },
  { id: '7', label: 'IDP Implementation', category: 'technical', x: 350, y: 410, width: 180 },

  // Science and Technology Service Directorate
  { id: '8', label: 'Science and Technology Service Directorate', category: 'directorate', x: 650, y: 50, width: 280 },
  { id: '9', label: 'Earthquake, Tsunami and Ocean Services Department', category: 'technical', x: 1000, y: 20, width: 320 },
  { id: '10', label: 'Department Head', category: 'technical', x: 1380, y: 20, width: 150 },
  { id: '11', label: 'Ocean and Marine Scientist', category: 'technical', x: 1580, y: 20, width: 180 },
  { id: '12', label: 'Tsunami Modeler', category: 'technical', x: 1810, y: 20, width: 150 },

  { id: '13', label: 'Weather, Climate and Hydrological Services Department', category: 'technical', x: 1000, y: 100, width: 350 },
  { id: '14', label: 'Department Head', category: 'technical', x: 1400, y: 100, width: 150 },
  { id: '15', label: 'Weather and Climate Scientist', category: 'technical', x: 1600, y: 100, width: 200 },
  { id: '16', label: 'Numerical Weather Prediction Expert', category: 'technical', x: 1850, y: 100, width: 240 },

  // Program Management Directorate
  { id: '17', label: 'Program Management Directorate', category: 'directorate', x: 650, y: 200, width: 260 },
  { id: '18', label: 'Systems Research and Development Department', category: 'systems', x: 980, y: 180, width: 310 },
  { id: '19', label: 'Department Head', category: 'systems', x: 1340, y: 180, width: 150 },
  { id: '20', label: 'Full Stack Developer', category: 'systems', x: 1540, y: 180, width: 170 },
  { id: '21', label: 'Application Developer', category: 'systems', x: 1760, y: 180, width: 180 },

  { id: '22', label: 'Societal Applications Department', category: 'systems', x: 980, y: 260, width: 250 },
  { id: '23', label: 'Department Head', category: 'systems', x: 1280, y: 260, width: 150 },
  { id: '24', label: 'Climate Risk Assessment Specialist', category: 'systems', x: 1480, y: 260, width: 230 },
  { id: '25', label: 'Forecast Application Project Coordinator', category: 'systems', x: 1760, y: 260, width: 260 },

  { id: '26', label: 'Program Management Department', category: 'systems', x: 980, y: 340, width: 250 },
  { id: '27', label: 'Department Head', category: 'systems', x: 1280, y: 340, width: 150 },
  { id: '28', label: 'Program Manager', category: 'systems', x: 1480, y: 340, width: 160 },
  { id: '29', label: 'Project Coordinator', category: 'systems', x: 1690, y: 340, width: 170 },

  { id: '30', label: 'Country Program', category: 'operations', x: 980, y: 420, width: 170 },
  { id: '31', label: 'Country Director Country Program Lead', category: 'operations', x: 1200, y: 420, width: 270 },
  { id: '32', label: 'Science and Technology Division', category: 'operations', x: 1520, y: 420, width: 230 },

  { id: '33', label: 'Finance and Account Management Department', category: 'operations', x: 980, y: 500, width: 300 },
  { id: '34', label: 'Chief Financial Officer', category: 'operations', x: 1330, y: 500, width: 180 },
  { id: '35', label: 'Finance Management Specialist', category: 'operations', x: 1560, y: 500, width: 220 },

  // Operational Support Directorate
  { id: '36', label: 'Operational Support Directorate', category: 'directorate', x: 650, y: 580, width: 260 },
  { id: '37', label: 'Human Resource and Administration Department', category: 'hr', x: 980, y: 560, width: 320 },
  { id: '38', label: 'Department Head', category: 'hr', x: 1350, y: 560, width: 150 },
  { id: '39', label: 'Human Resource and Administration Manager', category: 'hr', x: 1550, y: 560, width: 290 },
  { id: '40', label: 'Human Resource and Administration Officer', category: 'hr', x: 1890, y: 560, width: 280 },

  { id: '41', label: 'Procurement Department', category: 'hr', x: 980, y: 640, width: 200 },
  { id: '42', label: 'Chief Procurement', category: 'hr', x: 1230, y: 640, width: 170 },
  { id: '43', label: 'Procurement Manager', category: 'hr', x: 1450, y: 640, width: 180 },
  { id: '44', label: 'Procurement Officer', category: 'hr', x: 1680, y: 640, width: 170 },

  { id: '45', label: 'Policy Management Department', category: 'hr', x: 980, y: 720, width: 240 },
  { id: '46', label: 'Department Head', category: 'hr', x: 1270, y: 720, width: 150 },
  { id: '47', label: 'Legal Compliance Specialist', category: 'hr', x: 1470, y: 720, width: 210 },
  { id: '48', label: 'Operations Specialist', category: 'hr', x: 1730, y: 720, width: 180 },
];

const connections: ConnectionData[] = [
  { from: '1', to: '2' },
  { from: '2', to: '3' },
  { from: '3', to: '4' },
  { from: '4', to: '5' },
  { from: '5', to: '6' },
  { from: '6', to: '7' },
  
  { from: '6', to: '8' },
  { from: '6', to: '17' },
  { from: '6', to: '36' },

  { from: '8', to: '9' },
  { from: '9', to: '10' },
  { from: '10', to: '11' },
  { from: '11', to: '12' },
  
  { from: '8', to: '13' },
  { from: '13', to: '14' },
  { from: '14', to: '15' },
  { from: '15', to: '16' },

  { from: '17', to: '18' },
  { from: '18', to: '19' },
  { from: '19', to: '20' },
  { from: '20', to: '21' },
  
  { from: '17', to: '22' },
  { from: '22', to: '23' },
  { from: '23', to: '24' },
  { from: '24', to: '25' },
  
  { from: '17', to: '26' },
  { from: '26', to: '27' },
  { from: '27', to: '28' },
  { from: '28', to: '29' },
  
  { from: '17', to: '30' },
  { from: '30', to: '31' },
  { from: '31', to: '32' },
  
  { from: '17', to: '33' },
  { from: '33', to: '34' },
  { from: '34', to: '35' },

  { from: '36', to: '37' },
  { from: '37', to: '38' },
  { from: '38', to: '39' },
  { from: '39', to: '40' },
  
  { from: '36', to: '41' },
  { from: '41', to: '42' },
  { from: '42', to: '43' },
  { from: '43', to: '44' },
  
  { from: '36', to: '45' },
  { from: '45', to: '46' },
  { from: '46', to: '47' },
  { from: '47', to: '48' },
];

const categoryColors = {
  leadership: { bg: 'hsl(var(--org-leadership))', text: 'hsl(var(--org-leadership-foreground))' },
  directorate: { bg: 'hsl(var(--org-directorate))', text: 'hsl(var(--org-directorate-foreground))' },
  technical: { bg: 'hsl(var(--org-technical))', text: 'hsl(var(--org-technical-foreground))' },
  systems: { bg: 'hsl(var(--org-systems))', text: 'hsl(var(--org-systems-foreground))' },
  operations: { bg: 'hsl(var(--org-operations))', text: 'hsl(var(--org-operations-foreground))' },
  hr: { bg: 'hsl(var(--org-hr))', text: 'hsl(var(--org-hr-foreground))' },
};

export const OrganizationalChart = () => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getNodeCenter = (node: NodeData) => ({
    x: node.x + (node.width || 200) / 2,
    y: node.y + 20,
  });

  const createPath = (from: NodeData, to: NodeData) => {
    const fromCenter = getNodeCenter(from);
    const toCenter = getNodeCenter(to);
    
    const fromX = fromCenter.x + (from.width || 200) / 2;
    const fromY = fromCenter.y;
    const toX = toCenter.x - (to.width || 200) / 2;
    const toY = toCenter.y;

    const midX = (fromX + toX) / 2;

    return `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button onClick={handleZoomIn} size="icon" variant="secondary" className="shadow-lg">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button onClick={handleZoomOut} size="icon" variant="secondary" className="shadow-lg">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button onClick={handleReset} size="icon" variant="secondary" className="shadow-lg">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* SVG Canvas */}
      <svg
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Draw connections first (so they appear behind nodes) */}
          <g className="connections">
            {connections.map((conn, idx) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <path
                  key={idx}
                  d={createPath(fromNode, toNode)}
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill="none"
                  className="transition-all duration-200"
                />
              );
            })}
          </g>

          {/* Draw nodes */}
          <g className="nodes">
            {nodes.map((node) => {
              const width = node.width || 200;
              const height = node.height || 40;
              const colors = categoryColors[node.category];

              return (
                <g key={node.id} className="node-group transition-all duration-200 hover:opacity-90">
                  {/* Node background */}
                  <rect
                    x={node.x}
                    y={node.y}
                    width={width}
                    height={height}
                    rx="20"
                    ry="20"
                    fill={colors.bg}
                    stroke="hsl(var(--background))"
                    strokeWidth="2"
                    className="transition-all duration-200 hover:brightness-110"
                    style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
                  />
                  
                  {/* Node text */}
                  <text
                    x={node.x + width / 2}
                    y={node.y + height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={colors.text}
                    fontSize="13"
                    fontWeight="500"
                    className="pointer-events-none select-none"
                  >
                    {node.label.length > 30 ? (
                      <>
                        <tspan x={node.x + width / 2} dy="-0.3em">
                          {node.label.substring(0, 30)}
                        </tspan>
                        <tspan x={node.x + width / 2} dy="1.2em">
                          {node.label.substring(30)}
                        </tspan>
                      </>
                    ) : (
                      node.label
                    )}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
};
