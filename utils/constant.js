export const StatusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
  };

  export const responseMessages = {
    SUCCESSFUL_LOGIN: 'Login successful.',
    INVALID_CREDENTIALS: 'Invalid username or password.',
    ACCOUNT_INACTIVE: 'Your account is inactive. Please contact support.',
    PASSWORD_RESET_REQUESTED: 'Password reset requested. Please check your email.',
    PASSWORD_RESET_SUCCESS: 'Password reset successful.',
    PASSWORD_RESET_FAILED: 'Password reset failed. Please try again.',
    TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
    TOKEN_INVALID: 'Invalid token. Please log in again.',
    TOKEN_REQUIRED: 'Token is required.',

    USER_CREATED: 'User created successfully.',
    USER_CREATION_FAILED: 'Failed to create user. Please try again.',
    USER_UPDATED: 'User updated successfully.',
    USER_UPDATE_FAILED: 'Failed to update user. Please try again.',
    USER_DELETED: 'User deleted successfully.',
    USER_DELETION_FAILED: 'Failed to delete user. Please try again.',
    USER_NOT_FOUND: 'User not found.',
    USER_NOT_EXIST: 'User not exists.',
    USER_FETCH_FAILED: 'Failed to fetch User.',
    USER_ACTIVATED: 'User has been activated.',
    USER_DEACTIVATED: 'User has been deactivated.',
    UNAUTHORIZED_USER: 'User is unauthorized',
    
    OPERATION_SUCCESSFUL: 'Operation completed successfully.',
    OPERATION_FAILED: 'Operation failed. Please try again.',
    ACCESS_DENIED: 'Access denied. You do not have the required permissions.',
    INVALID_INPUT: 'Invalid input provided. Please check your data and try again.',
    
    EMAIL_SENT: 'Email sent successfully.',
    EMAIL_FAILED: 'Failed to send email. Please try again.',
    EMAIL_ALREADY_EXISTS: 'Email already exists.',
    
    DATABASE_ERROR: 'An error occurred with the database. Please try again later.',
    
    SERVER_ERROR: 'An internal server error occurred. Please try again later.',

    COMPANY_CREATED: 'Company created successfully.',
    COMPANY_ALREADY_EXISTS: 'Company already exists',
    COMPANY_DELETED: 'Deleted company successfully'

};

  
  
