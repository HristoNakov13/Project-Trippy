import http from "../util/requester";

import MyProfileDetails from "../components/user/profile/MyProfile/my-profile-user-interface";

const API_ROOT = "/user/profile";

const END_POINTS = {
    getMyProfileDetails: API_ROOT,
    editProfile: API_ROOT,
};

const userService = {
    getMyProfileDetails: (): Promise<MyProfileDetails> => {
        return http.get(END_POINTS.getMyProfileDetails);
    },

    editProfile: (formData: FormData): Promise<any> => {
        return http.formUploadFile(END_POINTS.editProfile, formData);
    },
};

export default userService;