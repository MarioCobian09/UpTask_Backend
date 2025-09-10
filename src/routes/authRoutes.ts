import { Router } from "express"
import { body, param } from "express-validator"
import { AuthController } from "../controllers/AuthController"
import { handleInputErrors } from "../middleware/validation"
import { authenticate } from "../middleware/auth"

const router = Router()

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({min: 8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation')
        .custom((value, { req }) => { // Value es el valor que obtenemos y despues tenemos META el cual contiene req
            if(value !== req.body.password) {
                throw new Error('Los password no son iguales')
            }
            return true
        }),
    body('email')
        .isEmail().withMessage('E-mail no es valido'),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('E-mail no es valido'),
    body('password')
        .notEmpty().withMessage('El password no puede ir vació'),
    handleInputErrors,
    AuthController.login
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('E-mail no es valido'),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/update-password/:token',
    param('token').isNumeric().withMessage('Token no válido'),
    body('password')
        .isLength({min: 8}).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('password_confirmation')
        .custom((value, { req }) => { // Value es el valor que obtenemos y despues tenemos META el cual contiene req
            if(value !== req.body.password) {
                throw new Error('Los password no son iguales')
            }
            return true
        }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

router.get('/user',
    authenticate,
    AuthController.user
)

/** Profile */
router.put('/profile',
    authenticate,
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('E-mail no es valido'),
    handleInputErrors,
    AuthController.updateProfile
)

router.post('/update-password',
    authenticate,
    body('current_password')
        .isLength({min: 8}).withMessage('El password actual no puede ir vació'),
    body('password')
        .isLength({min: 8}).withMessage('El password es muy corto, mínimo 8 caracteres'),
    body('password_confirmation')
        .custom((value, { req }) => { // Value es el valor que obtenemos y después tenemos META el cual contiene req
            if(value !== req.body.password) {
                throw new Error('Los password no son iguales')
            }
            return true
        }),
    handleInputErrors,
    AuthController.updateCurrentUserPassword
)
router.post('/check-password',
    authenticate,
    body('password')
        .notEmpty().withMessage('El password no puede ir vació'),
    handleInputErrors,
    AuthController.checkPassword
)


export default router