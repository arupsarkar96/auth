import colors from 'yoctocolors-cjs';

class PrettyLogger {
    Info(message: string): void {
        console.log(colors.blue(`[ACCOUNTS] ${message}`));
    }

    Success(message: string): void {
        console.log(colors.green(`[ACCOUNTS] ${message}`));
    }

    Warning(message: string): void {
        console.log(colors.yellow(`[ACCOUNTS] ${message}`));
    }

    Error(message: string): void {
        console.error(colors.red(`[ACCOUNTS] ${message}`));
    }

    Debug(message: string): void {
        console.log(colors.magenta(`[ACCOUNTS] ${message}`));
    }
}

export default PrettyLogger;