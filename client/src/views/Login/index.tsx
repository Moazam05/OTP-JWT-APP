// React Imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Material UI Imports
import { Box, Button } from "@mui/material";
// React Icons
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
// Utils Imports
import { onKeyDown } from "../../utils";
// Component Imports
import { SubHeading } from "../../components/Heading";
// import DotLoader from "../../components/Spinner/dotLoader";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import { loginSchema } from "./components/validationSchema";
// Styles
import "./Login.css";
// Redux Imports
import { setUser } from "../../redux/auth/authSlice";
import { useLoginMutation } from "../../redux/api/authApiSlice";

interface ISLoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<ISLoginForm>({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const hideShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  // Sign Up Api Bind
  // const [loginUser, { isLoading }] = useLoginMutation();

  const LoginHandler = async (data: ISLoginForm) => {
    // const payload = {
    //   email: data.email,
    //   password: data.password,
    // };
    // try {
    //   const user: any = await loginUser(payload);
    //   if (user?.data?.status) {
    //     dispatch(setUser(user?.data));
    //     localStorage.setItem("user", JSON.stringify(user?.data));
    //     navigate("/m-profile");
    //   }
    //   if (user?.error) {
    //     setToast({
    //       ...toast,
    //       message: user?.error?.data?.message,
    //       appearence: true,
    //       type: "error",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Login Error:", error);
    //   setToast({
    //     ...toast,
    //     message: "Something went wrong",
    //     appearence: true,
    //     type: "error",
    //   });
    // }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <Formik
            initialValues={formValues}
            onSubmit={(values: ISLoginForm) => {
              LoginHandler(values);
            }}
            validationSchema={loginSchema}
          >
            {(props: FormikProps<ISLoginForm>) => {
              const { values, touched, errors, handleBlur, handleChange } =
                props;

              return (
                <Form onKeyDown={onKeyDown} style={{ width: "100%" }}>
                  <Box sx={{ height: "95px" }}>
                    <SubHeading sx={{ marginBottom: "5px" }}>Email</SubHeading>
                    <PrimaryInput
                      type="text"
                      label=""
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      helperText={
                        errors.email && touched.email ? errors.email : ""
                      }
                      error={errors.email && touched.email ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                  <Box sx={{ height: "95px" }}>
                    <SubHeading sx={{ marginBottom: "5px" }}>
                      Password
                    </SubHeading>
                    <PrimaryInput
                      type={showPassword ? "text" : "password"}
                      label=""
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : ""
                      }
                      error={errors.password && touched.password ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onClick={hideShowPassword}
                      endAdornment={
                        showPassword ? (
                          <AiOutlineEye color="disabled" />
                        ) : (
                          <AiOutlineEyeInvisible color="disabled" />
                        )
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "15px",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      // disabled={isLoading}
                      sx={{
                        padding: "5px 30px",
                        textTransform: "capitalize",
                        margin: "0 0 5px 0",
                        background: "#334155",
                        height: "40px",
                        color: "#fff",
                        lineHeight: "0",
                        "&:hover": {
                          background: "#334155",
                        },
                      }}
                    >
                      {/* {isLoading ? (
                        <DotLoader color="#fff" size={12} />
                      ) : (
                        "Login"
                      )} */}
                      Login
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                      justifyContent: "end",
                    }}
                  >
                    <Box
                      sx={{
                        marginLeft: "5px",
                        fontSize: "14px",
                        color: "#70b3f3",
                        fontWeight: 500,
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onClick={() => {
                        navigate("/forgot-password");
                      }}
                    >
                      Forgot Password?
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      margin: "15px 0 0 0",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    Not a Member?
                    <Box
                      sx={{
                        marginLeft: "5px",
                        fontSize: "14px",
                        color: "#70b3f3",
                        fontWeight: 500,
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Register Now
                    </Box>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </div>
  );
};

export default Login;
