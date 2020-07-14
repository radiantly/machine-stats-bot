import si from "systeminformation";

const twoPlaces = num => Math.round(num * 100) / 100;
const toGB = bytes => twoPlaces(bytes / 1024 / 1024 / 1024);
export const computeStatistics = async () => {
  const memoryUsage = await si.mem();
  const load = await si.currentLoad();
  return {
    cpu: twoPlaces(load.currentload),
    usedMem: toGB(memoryUsage.used),
    totalMem: Math.round(toGB(memoryUsage.total)),
  };
};
