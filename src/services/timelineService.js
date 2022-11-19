import * as httpRequest from '~/untils/httpRequest';
export const getVideos = async ({page , type, accessToken = ''}) => {
    try {
        const res = await httpRequest.get('videos', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
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