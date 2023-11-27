import { BsBriefcase } from 'react-icons/bs';
import { BiHappy } from 'react-icons/bi';
import { RiCustomerService2Line } from 'react-icons/ri';
import { GiTeamIdea } from 'react-icons/gi';
import { Parallax } from 'react-parallax';
import historyImg from "../../assets/photos/parallax_03.jpg"
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../Components/Config/Server';

const History = () => {
    const [counterOn, setCounterOn] = useState(false);
    const [achievements, setAchievements] = useState();
    
    useEffect(()=>{
        fetch(`${baseUrl}/achievements`)
        .then((res) => res.json())
        .then((data) => {
            setAchievements(data);
        })
        .catch((error) => console.error(error));
    },[])
    console.log(achievements)

    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={historyImg}
            bgImageAlt="the history"
            strength={-200}
        >
            <div className="history py-5">
                <div className="container">
                    <div className="row text-center text-white">
                        {achievements?.map((column, index) => (
                            <div key={index} className="col-md-3 col-sm-6 col-xs-12">
                                <ScrollTrigger
                                    onEnter={() => setCounterOn(true)}
                                    onExit={() => setCounterOn(false)}
                                >
                                    <div className='d-flex justify-content-center p-2 border-3 border-warning'>
                                        <div className='history-icon-outline d-flex justify-content-center' >
                                            <div className='history-icon d-flex align-items-center justify-content-center'>
                                                <img className=' p-3' src={column.icon} alt="" style={{width:"100px"}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className="fw-bold">
                                        {counterOn && <CountUp start={0} end={column.count} duration={2} delay={0} />}
                                    </h2>
                                    <h4>{column.title}</h4>
                                </ScrollTrigger>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default History;
