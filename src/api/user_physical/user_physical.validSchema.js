const yup = require('yup');

const getUserPhysicalValidSchema = yup.object().shape({
  id: yup.number().required().label('E3018'),
});

const updatePhysicalValidSchema = yup.object().shape({
  weight_kg: yup.number().min(10).max(250).label('E3210'),
  height_cm: yup.number().min(10).max(250).label('E3211'),
  handed: yup
    .string()
    .trim()
    .matches(/(left|right)/)
    .label('E3212'),
  t_play_style_id: yup //최소 8 자, 최대 18자 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
    .number()
    .label('E3213'),
  t_forehand_style_id: yup //최소 8 자, 최대 18자 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
    .number()
    .label('E3214'),
  t_backhand_style_id: yup //최소 8 자, 최대 18자 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
    .number()
    .label('E3215'),
  age: yup.number().min(1).max(120).label('E3016'),
  sex: yup
    .string()
    .trim()
    .matches(/(male|female)/)
    .label('E3217'),
});

module.exports = {
  getUserPhysicalValidSchema,
  updatePhysicalValidSchema,
};
