import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

function FormValidate(props) {
    const { handleFormSubmit, type } = props;
    const uppercaseRegex = /(?=.*[A-Z])/;
    const lowercaseRegex = /(?=.*[a-z])/;
    const numericRegex = /(?=.*[0-9])/;
    const specialRegex = /(?=.*[*.!@$%^&(){}:;<>,.?~_+-=|])/;

    const FormSchema = Yup.object().shape({
        userName:
            type === "register"
                ? Yup.string()
                      .min(6, "Tối thiểu 6 kí tự")
                      .max(50, "Tối đa 50 kí tự")
                      .required("Vui lòng nhập tên người dùng")
                : null,
        password: Yup.string()
            .min(8, "Tối thiểu 8 kí tự")
            .max(32, "Tối đa 32 kí tự")
            .required("Vui lòng nhập mật khẩu")
            .matches(uppercaseRegex, "Ít nhất một kí tự hoa")
            .matches(lowercaseRegex, "Ít nhất một kí tự thường")
            .matches(numericRegex, "Ít nhất một chữ số")
            .matches(specialRegex, "Ít nhất một kí tự đặc biệt"),
        email:
            type === "register"
                ? Yup.string()
                      .email("Email không hợp lệ")
                      .required("Vui lòng nhập email")
                      .test("validate-email", "Email đã tồn tại", async (value) => {
                          try {
                              const res = await axios.post(
                                  `${process.env.REACT_APP_API_URL}/user/validate-email`,
                                  {
                                      email: value,
                                  }
                              );
                              return !(res.data === value);
                          } catch (err) {
                              console.log(err);
                          }
                      })
                : Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    });

    return (
        <Formik
            initialValues={{
                userName: "",
                email: "",
                password: "",
            }}
            validationSchema={FormSchema}
            validateOnChange={false}
            onSubmit={(values, { setFieldError }) => {
                handleFormSubmit(values.userName, values.email, values.password).catch((err) =>
                    setFieldError("password", "Email hoặc mật khẩu không đúng")
                );
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="title-form">{type === "login" ? "Đăng nhập" : "Đăng ký"}</div>
                    {type === "register" && <Field id="userName" name="userName"></Field>}
                    <ErrorMessage name="userName" component="div" className="err-mes" />

                    <Field id="email" name="email"></Field>
                    <ErrorMessage name="email" component="div" className="err-mes" />

                    <Field id="password" type="password" name="password"></Field>
                    <ErrorMessage name="password" component="div" className="err-mes" />

                    <button className="form-btn" type="submit">
                        {type === "login" ? "Đăng nhập" : "Đăng ký"}
                    </button>
                    {type === "login" ? (
                        <>
                            <div className="login-with">
                                <a href="">Quên mật khẩu</a>
                                <a href="">Đăng nhập với SMS</a>
                            </div>
                            <div className="line-wrap">
                                <div className="line"></div>
                                <span style={{ fontSize: "1.4rem" }}>Hoặc</span>
                                <div className="line"></div>
                            </div>
                            <div className="login-wrap">
                                <button className="fb-login">
                                    <i
                                        className="fab fa-facebook icon-login"
                                        style={{ fontSize: "2.6rem" }}
                                    ></i>
                                    Facebook
                                </button>
                                <button className="gg-login">
                                    <i
                                        className="fab fa-google icon-login"
                                        style={{ fontSize: "2.6rem" }}
                                    ></i>
                                    Google
                                </button>
                                <button className="apple-login">
                                    <i
                                        className="fab fa-apple icon-login"
                                        style={{ fontSize: "2.6rem" }}
                                    ></i>
                                    Apple
                                </button>
                            </div>
                            <div className="question-login">
                                <span>Bạn mới biết đến Shopee ?</span>
                                <Link to="/user/register" className="login-link">
                                    Đăng ký
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="line-wrap">
                                <div className="line"></div>
                                <span style={{ fontSize: "1.4rem" }}>Hoặc</span>
                                <div className="line"></div>
                            </div>
                            <div className="login-wrap">
                                <button className="fb-login">
                                    <i
                                        className="fab fa-facebook icon-login"
                                        style={{ fontSize: "2.6rem" }}
                                    ></i>
                                    Facebook
                                </button>
                                <button className="gg-login">
                                    <i
                                        className="fab fa-google icon-login"
                                        style={{ fontSize: "2.6rem" }}
                                    ></i>
                                    Google
                                </button>
                                <button className="apple-login">
                                    <i
                                        className="fab fa-apple icon-login"
                                        style={{ fontSize: "2.6rem" }}
                                    ></i>
                                    Apple
                                </button>
                            </div>
                            <div className="form-desc">
                                Bằng việc đăng kí, bạn đã đồng ý với Shopee về <br />
                                <a
                                    href="https://shopee.vn/legaldoc/termsOfService/?__classic__=1"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Điều khoản dịch vụ
                                </a>{" "}
                                &{" "}
                                <a
                                    href="https://shopee.vn/legaldoc/privacy/?__classic__=1"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Chính sách bảo mật
                                </a>
                            </div>
                            <div className="question-login">
                                <span>Bạn đã có tài khoản ?</span>
                                <Link to="/user/login" className="login-link">
                                    Đăng nhập
                                </Link>
                            </div>
                        </>
                    )}
                </Form>
            )}
        </Formik>
    );
}

export default FormValidate;
