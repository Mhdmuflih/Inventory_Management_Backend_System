import { BatchStrategy } from "./Batch.strategy";
import { FefoStrategy } from "./FEFO.strategy";
import { FifoStrategy } from "./FIFO.strategy";


export class StrategyFactory {
    static getStrategy(mode: string) {
        if (mode === "FIFO") return new FifoStrategy();
        if (mode === "FEFO") return new FefoStrategy();
        if (mode === "BATCH") return new BatchStrategy();
        throw new Error("Invalid inventory strategy");
    }
}
