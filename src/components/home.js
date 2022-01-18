import React from 'react'
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
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };

  let inputVal 

//   const getInputValue = () => {
//     // Selecting the input element and get its value 
//      if (inputVal != null)
//     //   inputVal = document.getElementById("myInput").value;
//      document.getElementById("myInput").addEventListener("click",()=>{
//       let inputVal = document.getElementById("myInput").value;
//     });
//     // Displaying the value
//     console.log(inputVal);
// }



const Home = () => {

    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);
    return (
        <div>

            <input type="text" placeholder="Type something..." id="myInput"/>
            <button type="button" >Get Value</button>

            <img
        alt="lion"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdUddietosCBEXfZsTc5WJYBMzVd0Gr88PmyKtcRJlNV0JovU&s"
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