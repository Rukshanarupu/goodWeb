import React, { useEffect, useState } from 'react';
import { baseUrl } from './Config/Server';

const ColorComponent = () => {
    const [color, setColor]=useState()

    useEffect(()=>{
        fetch(`${baseUrl}/styles`)
        .then((res) => res.json())
        .then((data) => setColor(data[0]))
        .catch((error) => console.error(error));
    },[])
    // console.log(color[0])
    
    if (!color) {
        return { colorStyle: null, color: null };
    }
    const colorStyle = {
        backgroundColor: color.color_code,
        border: `2px solid ${color.color_code}`,
    };
    
    return { colorStyle, color };
};

export default ColorComponent