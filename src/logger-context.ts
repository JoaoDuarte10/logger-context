import * as crypto from 'crypto';

type InputLoggerContextProps = {
    traceId?: string | number;
    context?: string;
}

export class LoggerContext {
    private context = new Map();
    private keys = {
        traceId: 'traceId',
        context: 'context'
    }

    constructor(
        private readonly props?: InputLoggerContextProps
    ) {
        this.context.set(this.keys.traceId, this.props?.traceId ?? crypto.randomUUID());
        if (this.props?.context) {
            this.context.set(this.keys.context, this.props.context);
        }
    }

    setTraceId(traceId: string | number): void {
        this.context.set(this.keys.traceId, traceId);
    }

    getTraceId(): string | number {
        return this.context.get(this.keys.traceId);
    }

    setContext(name: string): void {
        this.context.set(this.keys.context, name);
    }

    getContext(): string {
        return this.context.get(this.keys.context);
    }

    resetContext(): void {
        this.context.delete(this.keys.context);
    }

    addMetadata(key: string, value: string | number): void {
        if (key !== this.keys.context && key !== this.keys.traceId) {
            this.context.set(key, value);
        }
    }

    getMetadata(): object {
        const result = {};

        this.context.forEach((value, key: any) => {
            result[key] = value;
        });

        return result;
    }

    resetMetadata(): void {
        this.context.forEach((_, key) => {
            if (key !== this.keys.context && key !== this.keys.traceId) {
                this.context.delete(key);
            }
        });
    }
}
