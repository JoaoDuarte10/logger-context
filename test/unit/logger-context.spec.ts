import { LoggerContext } from "../../src";

describe('LoggerContext', () => {
    let sut: LoggerContext;

    beforeEach(() => {
        sut = new LoggerContext();
    });

    it('Should set traceId if not provided in constructor', () => {
        sut = new LoggerContext();

        expect(sut.getTraceId()).toBeDefined();
    });

    it('Should set traceId provided in constructor', () => {
        const traceId = 'any_traceId';

        sut = new LoggerContext({
            traceId
        });

        expect(sut.getTraceId()).toBe(traceId);
    });

    it('Should set traceId', () => {
        const traceId = 'any_traceId';

        sut.setTraceId(traceId)

        expect(sut.getTraceId()).toBe(traceId);
    });

    it('Should set context provided in constructor', () => {
        const context = 'any_context';

        sut = new LoggerContext({
            context
        });

        expect(sut.getContext()).toBe(context);
    });

    it('Should set context', () => {
        const context = 'any_context';

        sut.setContext(context);

        expect(sut.getContext()).toBe(context);
    });

    it('Should reset context', () => {
        sut.setContext('any_context');
        sut.resetContext();

        expect(sut.getContext()).toBeUndefined();
    });

    it('Should add metadata', () => {
        const metadata = {
            key: 'any_key',
            value: 'any_value'
        };

        sut.addMetadata(metadata.key, metadata.value);

        expect(sut.getMetadata()).toMatchObject({
            [metadata.key]: metadata.value
        });
    });

    it('Should reset metadata', () => {
        const metadata = {
            key: 'any_key',
            value: 'any_value'
        };

        sut.addMetadata(metadata.key, metadata.value);
        sut.resetMetadata();

        expect(sut.getMetadata()).not.toMatchObject({ [metadata.key]: metadata.value });
    });
});
