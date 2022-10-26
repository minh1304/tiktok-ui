import { forwardRef } from 'react';
const Image = forwardRef(({ ...prop }, ref) => {
    return <img ref={ref} {...prop} />;
});

export default Image;
