class Time {
    static setTimeout(fn, delay) {
        const maxDelay = Math.pow(2,31)-1;

        if (delay > maxDelay) {
            const args = arguments;
            args[1] -= maxDelay;

            return setTimeout(function () {
                self.setTimeout.apply(undefined, args);
            }, maxDelay);
        }

        return setTimeout.apply(undefined, arguments);
    }
}

export default Time;