import nodeCron from "node-cron";

export const cronService = (cron: string, func: () => void) => {
  const job = nodeCron.schedule(cron, func, { timezone: "Asia/Colombo" });
  job.start();
  return job;
};
