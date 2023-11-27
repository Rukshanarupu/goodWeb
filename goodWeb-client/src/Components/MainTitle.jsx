

const MainTitle = ({heading, paragraph, secondPara}) => {
    return (
        <div className="text-center mb-4">
            <h1>{heading}</h1>
            <p className="text-black-50">{paragraph} <br/> {secondPara}</p>
        </div>
    );
};

export default MainTitle;



{/* <MainTitle heading="" paragraph=""/> */}