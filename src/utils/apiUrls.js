let API_URL = `https://api-${process.env.REACT_APP_STAGE}.unipe.money`;
console.log({ penv: process.env });
// if (process.env.REACT_APP_LOCALHOST === "true") {
  API_URL = "http://localhost:8000";
// }
export const EMPLOYER_BASE_API_URL = `${API_URL}/employer`;
console.log(EMPLOYER_BASE_API_URL)
export const TIMEOUT = 5 * 60;
