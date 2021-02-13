require('dotenv').config()

const config = {
  s3: {
    REGION: "us-west-2",
    BUCKET: "products-bucket-api",
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://zb4ok13n37.execute-api.us-west-2.amazonaws.com/prod/",
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_FN1XI3ood",
    APP_CLIENT_ID: "768jsncj8b13k109l5qo8ube8t",
    IDENTITY_POOL_ID: "us-west-2:855cb143-b80e-4af0-8e51-4c0a9bbc050e",
  },
};

export default config;