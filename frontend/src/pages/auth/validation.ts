import * as yup from 'yup';

/*
 * literal schema fields
 */
const usernameSchema = yup.string().min(4).max(16).required();
const emailSchema = yup.string().email().required();
const passwordSchema = yup.string().min(8).max(20).required();

/*
 * validate utils
 */

const validateEmail = (email: string | undefined) => {
  return emailSchema.isValidSync(email);
};

const validateUsername = (username: string | undefined) => {
  return usernameSchema.isValidSync(username);
};

/*
 * schema for registration
 */
export const registrationSchema = yup.object().shape({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

/*
 * schema for login
 */
export const loginShema = yup.object().shape({
  emailOrUsername: yup
    .string()
    .test('emailOrUsername', 'email or username is invalid', (value) => {
      return validateEmail(value) || validateUsername(value);
    })
    .required(),
  password: passwordSchema,
});
