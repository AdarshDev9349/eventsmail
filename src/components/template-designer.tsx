'use client';

import { useState, useRef, useCallback } from 'react';

interface TemplateElement {
  id: string;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  isVariable?: boolean;
  variableName?: string;
}

interface Template {
  backgroundImage: string;
  elements: TemplateElement[];
}

interface TemplateDesignerProps {
  headers: string[];
  onTemplateComplete: (template: Template) => void;
  initialTemplate: Template;
}

export default function TemplateDesigner({ headers, onTemplateComplete, initialTemplate }: TemplateDesignerProps) {
  const [template, setTemplate] = useState<Template>(initialTemplate);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [draggedHeader, setDraggedHeader] = useState<string | null>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setTemplate(prev => ({ ...prev, backgroundImage: result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!draggedHeader) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newElement: TemplateElement = {
      id: `element-${Date.now()}`,
      type: 'text',
      content: `{${draggedHeader}}`,
      x,
      y,
      width: 200,
      height: 40,
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000',
      isVariable: true,
      variableName: draggedHeader
    };
    
    setTemplate(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    
    setDraggedHeader(null);
  }, [draggedHeader]);

  const handleCanvasDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    if (!draggedHeader) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newElement: TemplateElement = {
      id: `element-${Date.now()}`,
      type: 'text',
      content: `{${draggedHeader}}`,
      x,
      y,
      width: 200,
      height: 40,
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000',
      isVariable: true,
      variableName: draggedHeader
    };
    
    setTemplate(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    
    setDraggedHeader(null);
  }, [draggedHeader]);

  const handleCanvasDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<TemplateElement>) => {
    setTemplate(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  }, []);

  const deleteElement = useCallback((id: string) => {
    setTemplate(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id)
    }));
    setSelectedElement(null);
  }, []);

  const handleElementMouseDown = useCallback((event: React.MouseEvent, elementId: string) => {
    event.preventDefault();
    event.stopPropagation();
    
    const element = template.elements.find(el => el.id === elementId);
    if (!element) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - element.x;
    const offsetY = event.clientY - rect.top - element.y;
    
    setDraggedElement(elementId);
    setDragOffset({ x: offsetX, y: offsetY });
    setSelectedElement(elementId);
  }, [template.elements]);

  const handleCanvasMouseMove = useCallback((event: React.MouseEvent) => {
    if (!draggedElement) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const newX = event.clientX - rect.left - dragOffset.x;
    const newY = event.clientY - rect.top - dragOffset.y;
    
    // Constrain to canvas bounds
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const element = template.elements.find(el => el.id === draggedElement);
    
    if (element) {
      const constrainedX = Math.max(0, Math.min(newX, canvasWidth - element.width));
      const constrainedY = Math.max(0, Math.min(newY, canvasHeight - element.height));
      
      updateElement(draggedElement, { x: constrainedX, y: constrainedY });
    }
  }, [draggedElement, dragOffset, updateElement, template.elements]);

  const handleCanvasMouseUp = useCallback(() => {
    setDraggedElement(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const selectedElementData = selectedElement 
    ? template.elements.find(el => el.id === selectedElement)
    : null;

  return (
    <div className="grid grid-cols-12 gap-6 h-screen">
      {/* Sidebar */}
      <div className="col-span-3 bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Spreadsheet Headers</h3>
          <p className="text-sm text-gray-600 mb-4">
            Drag these headers to the canvas to create variable fields
          </p>
          
          <div className="space-y-2">
            {headers.map((header, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => {
                  setDraggedHeader(header);
                  e.dataTransfer.setData('text/plain', header);
                }}
                onDragEnd={() => setDraggedHeader(null)}
                className={`p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-move hover:bg-blue-100 transition-colors select-none ${
                  draggedHeader === header ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <span className="font-medium text-blue-800">{header}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Element Properties */}
        {selectedElementData && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Element Properties</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <input
                  type="number"
                  value={selectedElementData.fontSize || 16}
                  onChange={(e) => updateElement(selectedElement!, { fontSize: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  value={selectedElementData.color || '#000000'}
                  onChange={(e) => updateElement(selectedElement!, { color: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Family
                </label>
                <select
                  value={selectedElementData.fontFamily || 'Arial'}
                  onChange={(e) => updateElement(selectedElement!, { fontFamily: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>
              
              <button
                onClick={() => deleteElement(selectedElement!)}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete Element
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Canvas Area */}
      <div className="col-span-9 bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Certificate Template Designer</h3>
          
          {!template.backgroundImage ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Template Background</h4>
              <p className="text-gray-600 mb-4">Choose an image file to use as your certificate background</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Choose Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <div
                ref={canvasRef}
                className="relative bg-gray-100 border border-gray-300 rounded-lg overflow-hidden cursor-crosshair"
                style={{ aspectRatio: '4/3', height: '600px' }}
                onClick={handleCanvasClick}
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
              >
                {/* Background Image */}
                <img
                  src={template.backgroundImage}
                  alt="Template background"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                
                {/* Template Elements */}
                {template.elements.map((element) => (
                  <div
                    key={element.id}
                    className={`absolute border-2 select-none ${
                      selectedElement === element.id 
                        ? 'border-blue-500 bg-blue-50 bg-opacity-20 cursor-move' 
                        : 'border-transparent hover:border-gray-400 cursor-move'
                    } ${draggedElement === element.id ? 'opacity-70' : ''}`}
                    style={{
                      left: element.x,
                      top: element.y,
                      width: element.width,
                      height: element.height,
                      fontSize: element.fontSize,
                      fontFamily: element.fontFamily,
                      color: element.color,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElement(element.id);
                    }}
                    onMouseDown={(e) => handleElementMouseDown(e, element.id)}
                  >
                    {element.content}
                  </div>
                ))}
                
                {/* Drop indicator */}
                {draggedHeader && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-10 border-2 border-dashed border-blue-500 flex items-center justify-center">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                      <p className="text-blue-600 font-medium">
                        Click to place "{draggedHeader}" field
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Change Background
                </button>
                
                <button
                  onClick={() => onTemplateComplete(template)}
                  disabled={template.elements.length === 0}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    template.elements.length > 0
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue to Email Setup
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
