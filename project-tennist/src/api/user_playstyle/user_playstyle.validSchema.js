const yup = require('yup');

const getPlayStyleValidSchema = yup.object().shape({
  id: yup.number().required().label('E3018'),
});

const updatePlayStyleValidSchema = yup.object().shape({
  t_play_style_id: yup.number().label('E3213'),
  t_forehand_style_id: yup.number().label('E3214'),
  t_backhand_style_id: yup.number().label('E3215'),
  ntrp: yup.number().label('E3218'),
});

module.exports = {
  getPlayStyleValidSchema,
  updatePlayStyleValidSchema,
};
