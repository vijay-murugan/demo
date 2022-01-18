import React from 'react'
import {useState} from 'react'
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
// import html from './home.html'
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
// var perf =require('./home.html');

// class Home extends React.Component {
//     render(){
//         return (
//             <iframe src={perf }></iframe> 
//         )
//     }
// }

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


  


const Home = () => {
    const [name, setName] = useState('');
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);
    return (
        <div>
            <textarea autoComplete="off"  rows="4" cols="150"
             placeholder="Drag and drop the image here and clear each time before dropping new image" id="myInput"
           name="name"
           onChange={event => setName(event.target.value)}/>
           <img
        src={name}
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: '1px solid grey' }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
        </div>
        
    )
}

export default Home;