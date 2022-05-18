export class Utils {
    static secondsToDate(seconds: number) {
        const date = new Date(seconds * 1000).toISOString();
        return date.substring(11, 19);
    }
}
