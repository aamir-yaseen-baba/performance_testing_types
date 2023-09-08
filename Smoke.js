import http from 'k6/http';
import { check, sleep} from 'k6';

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '10s', // This can be shorter or just a few iterations
};

export default () => {
  const urlRes = http.get('https://developers.redhat.com/');
  sleep(1);
  // MORE STEPS
  console.log(urlRes)
  check(urlRes, {
    'is status 200': (r) => r.status === 200,
    'Response contains Build here. Go anywhere.': (r) => r.body.includes("Build here. Go anywhere.")
  });
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};
