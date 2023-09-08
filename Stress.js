import http from 'k6/http';
import {sleep, check} from 'k6';
import { Rate } from "k6/metrics";
let checkFailureRate = new Rate("check_failure_rate");
export const options = {
  // Key configurations for Stress in this section
  thresholds: {
    "http_req_duration": ["p(95)<500"],
    "http_req_duration{staticAsset:yes}": ["p(95)<100"],
    "check_failure_rate": ["rate<0.3"]
},
  stages: [
    { duration: '5s', target: 5 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: '10', target: 10 }, // stay at higher 200 users for 30 minutes
    { duration: '2s', target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {
  const urlRes = http.get('https://k6.io/');
  let checkRes = check(urlRes, {
    'is status 200': (r) => r.status === 200
});
checkFailureRate.add(!checkRes);
  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};

