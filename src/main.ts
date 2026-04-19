import cluster from 'node:cluster';
import { bootstrap } from './bootstrap';

const isPrd = process.env.ENVIRONMENT?.trim() === 'prod';

async function main() {
  if (isPrd && cluster.isPrimary && process.env.REPLICAS !== '1') {
    const replicas = Number(process.env.REPLICAS?.trim() ?? 2);
    for (let i = 0; i < replicas; i++) {
      cluster.fork();
    }
    return;
  }
  await bootstrap();
}

main();
