import * as httpRequest from '~/untils/httpRequest';
export const getVideos = async ({page , type }) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                page: page,
                type: type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};