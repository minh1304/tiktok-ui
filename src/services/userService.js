import * as httpRequest from '~/untils/httpRequest';
export const getSuggested = async ({page , perPage }) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page:perPage
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getFollowed = async ({page, accessToken}) => {
    try {
        const res = await httpRequest.get('me/followings', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};


export const followAnUser = async ({ userId, accessToken }) => {
    try {
      return await httpRequest.post(`users/${userId}/follow`, [], {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  export const unfollowAnUser = async ({ userId, accessToken }) => {
    try {
      return await httpRequest.post(`users/${userId}/unfollow`, [], {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }