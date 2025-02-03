export const ERROR_MESSAGES = {
    auth: {
      EMAIL_IN_USE: "The email is already in use",
      EMAIL_NOT_FOUND: "The email does not exist",
      INCORRECT_PASSWORD: "The password is incorrect",
      USER_NOT_FOUND: "User not found",
      LOGGED_OUT_SUCCESS: "Logged out successfully",
      LOGOUT_ERROR: "Error logging out",
    },
    expenses: {
      EXPENSE_NOT_FOUND: "Expense not found",
      NO_VALID_FIELDS_UPDATE: "No valid fields provided for update",
      EXPENSE_NOT_FOUND_USER: "No expenses found for this user"
    },
    general: {
      TOKEN_EXPIRED: "Token expired",
      INVALID_TOKEN: "Invalid token",
      INTERNAL_SERVER_ERROR: "Internal server error",
      NO_TOKEN_PROVIDED: "No token provided",
      AUTHORIZATION_DENIED: 'No token, authorization denied'
    }
  };