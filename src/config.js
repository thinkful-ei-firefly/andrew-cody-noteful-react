export default {
  // API_ENDPOINT: 'https://shielded-fjord-20896.herokuapp.com',//'http://localhost:8000'
  REACT_APP_API_ENDPOINT:
    process.env.REACT_APP_API_ENDPOINT ||
    "https://shielded-fjord-20896.herokuapp.com", //'http://localhost:8000/api',
  REACT_APP_TOKEN_KEY:
    process.env.REACT_APP_TOKEN_KEY || "dev-client-auth-token",
}
