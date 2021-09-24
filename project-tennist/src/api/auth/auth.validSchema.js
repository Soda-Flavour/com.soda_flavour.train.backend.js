const yup = require('yup');
const signUpValidSchema = yup.object().shape({
  nick: yup
    .string()
    .trim()
    .min(2)
    .matches(/[A-Za-z0-9가-힣]/)
    .label('E3010'),
  email: yup.string().trim().email().required().label('E3011'),
  password: yup //최소 8 자, 최대 18자 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
    .string()
    .trim()
    .min(8)
    .max(18)
    .matches(/[$&+,:;=?@#|'<>.^*()%!-]/)
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/)
    .required()
    .label('E3012'),

  repassword: yup //최소 8 자, 최대 18자 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
    .string()
    .trim()
    .min(8)
    .max(18)
    .matches(/[^A-Za-z]/)
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/)
    .required()
    .label('E3012'),
});

const loginValidSchema = yup.object().shape({
  email: yup.string().trim().email().required().label('E3011'),
  password: yup //최소 8 자, 최대 18자 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
    .string()
    .max(18)
    .required()
    .label('E3013'),
});

module.exports = {
  signUpValidSchema,
  loginValidSchema,
};
