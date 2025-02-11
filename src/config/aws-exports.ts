
const awsConfig = {
    "aws_project_region": import.meta.env.VITE_REACT_APP_AWS_REGION,
    "aws_cognito_identity_pool_id": import.meta.env.VITE_REACT_APP_IDENTITY_POOL_ID,
    "aws_cognito_region": import.meta.env.VITE_REACT_APP_AWS_REGION,
    "aws_user_pools_id": import.meta.env.VITE_REACT_APP_USER_POOL_ID,
    "aws_user_pools_web_client_id": import.meta.env.VITE_REACT_APP_USER_POOL_CLIENT_ID,
    "oauth": {},
    "aws_cognito_username_attributes": ["EMAIL"],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": ["EMAIL"],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": ["SMS"],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": ["EMAIL"]
};

export default awsConfig;
