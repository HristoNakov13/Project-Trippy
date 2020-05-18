class HttpError extends Error {
    res: Response;

    constructor(message: string, res: Response) {
        super(message);
        
        this.res = res;
    }
}

export default HttpError;