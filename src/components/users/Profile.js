import UserContext from "store/Context";
import { useContext } from "react";

import "styles/users/Profile.css";

export default function Profile() {
    const { user, dispatch } = useContext(UserContext);

    return (
        <div className="user-profile">
            <div className="profile__header">
                <h1 className="profile-title">Hồ sơ của tôi</h1>
                <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
            </div>
            <div className="profile__body">
                <div className="profile__body-left">
                    <form>
                        <div className="profile-userName">
                            <div>Tên đăng nhập</div>
                            <div>{user.username}</div>
                        </div>
                    </form>
                </div>
                <div className="profile__body-right">
                    <div className="user-image">
                        <input type="file" style={{ display: "" }} accept=".jpg,.jpeg,.png" />
                        <button>Chọn ảnh</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
