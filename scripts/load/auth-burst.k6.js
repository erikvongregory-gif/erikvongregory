import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = __ENV.BASE_URL;

if (!baseUrl) {
  throw new Error("BASE_URL fehlt. Beispiel: BASE_URL=https://example.com k6 run scripts/load/auth-burst.k6.js");
}

export const options = {
  scenarios: {
    authBurst: {
      executor: "ramping-arrival-rate",
      startRate: 50,
      timeUnit: "1s",
      preAllocatedVUs: 200,
      maxVUs: 15000,
      stages: [
        { target: 300, duration: "2m" },
        { target: 1000, duration: "5m" },
        { target: 3000, duration: "5m" },
        { target: 0, duration: "2m" },
      ],
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<400", "p(99)<1200"],
  },
};

export default function () {
  const res = http.get(`${baseUrl}/api/auth/status`, {
    headers: {
      "x-request-id": `k6-${__VU}-${__ITER}`,
      Accept: "application/json",
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "has request id": (r) => Boolean(r.headers["X-Request-Id"] || r.headers["x-request-id"]),
  });

  sleep(0.2);
}
