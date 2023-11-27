import React, { useEffect, useState } from 'react';
import MainTitle from '../../Components/MainTitle';
import { useLoaderData } from 'react-router-dom';
import { baseUrl } from '../../Components/Config/Server';

const videoData = [
  'https://www.youtube.com/embed/paiI1N96EpQ?si=47aEumjcv4Ev6LZq',
  'https://www.youtube.com/embed/v43p5RQIWTQ?si=A7_NwfrPKkIFqEKu',
  'https://www.youtube.com/embed/YiQQ1EWMFHg?si=T-gXUR6qKx6H-Q0V',
  'https://www.youtube.com/embed/Te3FvCfflL4?si=t3U03w6uUlJ6W0um',
  'https://www.youtube.com/embed/GOuwOI-WSkE?si=0EFseyAYxMJYJtKc',
  'https://www.youtube.com/embed/rWQeqH526KA?si=H6A2nE5ZsK2udmxu',
];

const Success = () => {
    const [videosData, setVideosData]=useState()

    useEffect(()=>{
        fetch(`${baseUrl}/successVideos`)
        .then((res) => res.json())
        .then((data) => setVideosData(data))
        .catch((error) => console.error(error));
    }),[]
    // console.log(videosData)

  return (
    <div className="bg-light my-5">
      <MainTitle
        heading="Marketing Success Stories"
        paragraph="A story is not successful if it doesn’t surprise you. Let’s hear my clients tell theirs."
      />
      <div className="container">
        <div className="row">
          {videosData?.map((videoUrl, index) => ( 
            // console.log(videoUrl.video_url)
            <div key={videoUrl._id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="rounded mb-2">
                <iframe
                  width="100%"
                  height="300"
                  src={videoUrl.video_url}
                  frameBorder="0"
                  allowFullScreen
                  title={`Video ${index + 1}`}
                  className="rounded-3"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Success;
