import React, {Fragment} from 'react';
import Form from '../components/common/Form';

const Example = () => {

    return (
        <div>
            <Form method="post" url="/api/projects">
                <input type="file"/>
            </Form>
        </div>
    );
};

export default Example;
