/**
 * Ensures fixed dev ports are free before `npm run dev:write`.
 * Uses an actual bind probe (not TCP connect): Angular often listens on `[::1]` only,
 * so connecting to `127.0.0.1` can falsely report the port as "free".
 */
import net from 'node:net';

const blogPort = Number(process.env.BLOG_DEV_PORT || 4321);

function canBindPort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', (err) => {
      server.close();
      if (err.code === 'EADDRINUSE') resolve(false);
      else reject(err);
    });
    server.listen({ port, ipv6Only: false, exclusive: true }, () => {
      server.close(() => resolve(true));
    });
  });
}

async function main() {
  const checks = [
    ['Angular dev (site)', 4200],
    ['Astro blog (Vite + proxy target)', blogPort],
  ];
  const busy = [];
  for (const [label, port] of checks) {
    if (!(await canBindPort(port))) busy.push(`${label}: ${port}`);
  }
  if (busy.length) {
    console.error(
      '\n[dev:write] These ports are already in use (stop the old dev server first):\n  - ' +
        busy.join('\n  - ') +
        `\n\nExample: lsof -nP -iTCP:${4200} -sTCP:LISTEN\n         lsof -nP -iTCP:${blogPort} -sTCP:LISTEN\n`,
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
