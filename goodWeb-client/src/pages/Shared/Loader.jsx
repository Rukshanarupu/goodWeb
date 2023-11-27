import React from 'react';

const Loader = () => {
    return (
        <div className='text-center py-5'>
            <button class="btn btn-warning px-3 py-2" type="button" disabled>
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        </div>
    );
};

export default Loader;