import React, { useState, useRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import "./HomePage.css";
import { Stage, Layer,Image } from "react-konva";
import Rectangle from "./Rectangle";
import Circle from "./Circle";
import { addLine } from "./line";
import { addTextNode } from "./textNode";
import useImage from 'use-image';
import { v1 as uuidv1 } from 'uuid';
uuidv1(); 

//Image drag drop with URLImage
const URLImage = ({ image }) => {
    const [img] = useImage(image.src);
    return (
      <Image
        image={img}
        x={image.x}
        y={image.y}
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };

function HomePage() {
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [shapes, setShapes] = React.useState([]);
  const [, updateState] = React.useState();
  const stageEl = React.createRef();
  const layerEl = React.createRef();
  const [name, setName] = React.useState('');
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const addRectangle = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      fill: "black",
      id: `rect${rectangles.length + 1}`,
    };
    const rects = rectangles.concat([rect]);
    setRectangles(rects);
    const shs = shapes.concat([`rect${rectangles.length + 1}`]);
    setShapes(shs);
  };
  const addCircle = () => {
    const circ = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      fill: "black",
      id: `circ${circles.length + 1}`,
    };
    const circs = circles.concat([circ]);
    setCircles(circs);
    const shs = shapes.concat([`circ${circles.length + 1}`]);
    setShapes(shs);
  };
const drawLine = () => {
    addLine(stageEl.current.getStage(), layerEl.current);
  };
  const eraseLine = () => {
    addLine(stageEl.current.getStage(), layerEl.current, "erase");
  };
  const drawText = () => {
    const id = addTextNode(stageEl.current.getStage(), layerEl.current);
    const shs = shapes.concat([id]);
    setShapes(shs);
  };
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const fileChange = ev => {
    let file = ev.target.files[0];
    let reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const undo = () => {
    const lastId = shapes[shapes.length - 1];
    let index = circles.findIndex(c => c.id == lastId);
    if (index != -1) {
      circles.splice(index, 1);
      setCircles(circles);
    }
    index = rectangles.findIndex(r => r.id == lastId);
    if (index != -1) {
      rectangles.splice(index, 1);
      setRectangles(rectangles);
    }

    shapes.pop();
    setShapes(shapes);
    forceUpdate();
  };
  document.addEventListener("keydown", ev => {
    if (ev.code == "Delete") {
      let index = circles.findIndex(c => c.id == selectedId);
      if (index != -1) {
        circles.splice(index, 1);
        setCircles(circles);
      }
      index = rectangles.findIndex(r => r.id == selectedId);
      if (index != -1) {
        rectangles.splice(index, 1);
        setRectangles(rectangles);
      }
     
      forceUpdate();
    }
  });
  return (
    <div className="home-page">
      <h1>Whiteboard</h1>
         <textarea autoComplete="off"  rows="4" cols="150"
             placeholder="Drag and drop the image here and clear each time before dropping new image" id="myInput"
           name="name"
           onChange={event => setName(event.target.value)}/>
        <img
        src= {name}
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
  
      <ButtonGroup>
        <Button variant="secondary" onClick={addRectangle}>
          Rectangle
        </Button>

        <Button variant="secondary" onClick={addCircle}>
          Circle
        </Button>

        <Button variant="secondary" onClick={drawLine}>
          Line
        </Button>

        <Button variant="secondary" onClick={eraseLine}>
          Erase
        </Button>

        <Button variant="secondary" onClick={drawText}>
          Text
        </Button>

        <Button variant="secondary" onClick={undo}>
          Undo
        </Button>
      </ButtonGroup>
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageEl.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageEl.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
      
      <Stage
        style={{ border: '1px solid grey' }}
        width={window.innerWidth * 0.9}
        height={window.innerHeight - 150}
        ref={stageEl}//,stageRef}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
      >
        <Layer ref={layerEl}>
        {images.map((image) => {
              return <URLImage image={image} />;
            })}
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={newAttrs => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
              />
            );
          })}
         
          {circles.map((circle, i) => {
            return (
              <Circle
                key={i}
                shapeProps={circle}
                isSelected={circle.id === selectedId}
                onSelect={() => {
                  selectShape(circle.id);
                }}
                onChange={newAttrs => {
                  const circs = circles.slice();
                  circs[i] = newAttrs;
                  setCircles(circs);
                }}
              />
            );
          })}

        </Layer>
      </Stage>
    </div>
    </div>
  );
}
export default HomePage;