const baseUrl = process.env.BASE_URL;

if (!baseUrl) {
  console.error("BASE_URL fehlt. Beispiel: BASE_URL=https://example.com node scripts/security/auth-regression.mjs");
  process.exit(1);
}

async function run() {
  const results = [];

  // 1) Cross-origin POST must be rejected.
  const crossOriginRes = await fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    headers: {
      origin: "https://evil.example",
      "content-type": "application/x-www-form-urlencoded",
    },
    body: "email=test@example.com&password=wrong",
    redirect: "manual",
  });
  results.push({
    name: "cross-origin signin blocked",
    ok: crossOriginRes.status === 403,
    got: crossOriginRes.status,
  });

  // 2) Auth status stays available and returns request id.
  const authStatusRes = await fetch(`${baseUrl}/api/auth/status`, {
    headers: { "x-request-id": "auth-regression-check" },
  });
  const requestIdHeader = authStatusRes.headers.get("x-request-id");
  results.push({
    name: "auth status reachable",
    ok: authStatusRes.status === 200,
    got: authStatusRes.status,
  });
  results.push({
    name: "request id header present",
    ok: Boolean(requestIdHeader),
    got: requestIdHeader ?? "(missing)",
  });

  const failed = results.filter((item) => !item.ok);
  for (const item of results) {
    const state = item.ok ? "PASS" : "FAIL";
    console.log(`${state}: ${item.name} (got=${item.got})`);
  }

  if (failed.length > 0) {
    process.exit(1);
  }
}

run().catch((error) => {
  console.error("auth-regression failed", error);
  process.exit(1);
});
