declare function handleRequest(url: string, method: 'GET' | 'POST'): void;

const req = { url: 'https://...', method: 'GET' };

//类型“string”的参数不能赋给类型“"GET" | "POST"”的参数。ts(2345)
// handleRequest(req.url, req.method);

//Solution1
handleRequest(req.url, req.method as 'GET');

//Solution2
const req2 = { url: 'https://...', method: 'GET' as 'GET' };
handleRequest(req2.url, req2.method);

//Solution3
const req3 = { url: 'https://...', method: 'GET' } as const;
handleRequest(req3.url, req3.method);