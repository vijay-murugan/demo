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

const Home = () => {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate('/')
    }
    return (
        <div>
            <input type = 'text' size = "50"/>
        </div>
        
    )
}

export default Home;