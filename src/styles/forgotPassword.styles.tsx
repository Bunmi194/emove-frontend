import styled from 'styled-components'

export const StyledForgotPassword = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #F2F4F7;;
  box-sizing:border-box;
  border-radius: 5px;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 30px;
    gap: 40px;
    // position: absolute;
    // width: 479px;
    height: 370px;
    left: 481px;
    top: 160px;

    /* White */

    background: #ffffff;
    border-radius: 24px;
    margin-top: -76px;
  }

  .h3_text_fp {
    color: #012a4a;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
    font-weight: 700;
  }

  .form-items{
    width: 80%;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: -37px;
  }

  .form-items p{
    width: 100%;
    color: #101828;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }

  .p form {
    width: 400px;
    max-width: 100%;
  }
  label {
    color: #012a4a;
    font-weight: 600;
    margin-bottom: 8px;
  }
  form input {
    width: 96%;
    max-width: 100%;
    padding: 0.6rem 6px;
    outline: none;
    margin-top: 3px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #98a2b3;
  }

  .field {
    margin: 10px 0;
    width: 27vw;
  }

 .password-field{
    border-top-width: 20px;
  }

  label {
    display: block;
  }

  .signup-btn {
    padding: 0.55em 1.2em;
    border-radius: 5px;
    margin: 20px 0;
    color: #fff;
    outline: auto;
    box-sizing: border-box;
    background: #f79009;
    font-weight: 800;
    text-align: center;
    font-size: 1.1em;
    transition: all 0.2s;
    align-items: center;
    width: 100%;
    cursor: pointer;
  }
  .login_link {
    text-align: center;
    margin-top: -27px;
  
  }
  .login_link a {
    color: #f79009;
    text-decoration: none;
    font-weight: 600;
  }
`
