import http from "../util/requester";

import MyProfileDetails from "../components/user/profile/MyProfile/my-profile-user-interface";
import ChangePasswordModel from "../components/user/profile/ChangePassword/change-password-interface";

const API_ROOT = "/user/profile";

const END_POINTS = {
    getMyProfileDetails: API_ROOT,
    editProfile: API_ROOT,
    changePassword: API_ROOT + "/change-password",
};

const userService = {
    getMyProfileDetails: (): Promise<MyProfileDetails> => {
        return http.get(END_POINTS.getMyProfileDetails);
    },

    editProfile: (formData: FormData): Promise<any> => {
        return http.formUploadFile(END_POINTS.editProfile, formData);
    },

    changePassword: (passwords: ChangePasswordModel): Promise<any> => {
        return http.post(END_POINTS.changePassword, passwords);
    },
};

export default userService;