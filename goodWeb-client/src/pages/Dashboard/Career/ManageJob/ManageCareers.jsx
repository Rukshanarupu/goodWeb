import CareersTable from './CareerTable';
import AddACareer from './AddACareer';

const ManageCareers = () => {

    return (
        <div className='p-md-3 p-lg-5'>
            <AddACareer/>
            <CareersTable></CareersTable>
        </div>
    );
};

export default ManageCareers;