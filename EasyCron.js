export default class EasyCron {
    secretKey = null;
    urlPageRequest = 'https://www.webpagetest.org/';
    constructor(secretKey, urlPageRequest) {
        this.secretKey = secretKey;
        this.urlPageRequest = urlPageRequest;
    }

    async makeCronJob(body, cronExpression, cron_job_name = "Cron Job") {
        const content = JSON.stringify({
            url: this.urlPageRequest,
            cron_expression: cronExpression,
            cron_job_name,
            request_method: "POST",
            request_body: JSON.stringify(body),
            request_headers: { "Content-Type": "application/json" },
        })
        const response = await this.queryApiCron(content, "POST", "https://api.easycron.com/v1/cron-jobs");
        return await response.json();
    }

    async getCronJobs() {
        const response = await this.queryApiCron(null, "GET", "https://api.easycron.com/v1/cron-jobs?pretty");
        return (await response.json()).cron_jobs ?? [];
    }

    async updateCronJob(cronJobId, body, cronExpression = null) {
        const content = JSON.stringify({
            url: this.urlPageRequest,
            cron_expression: cronExpression,
            request_method: "POST",
            request_body: JSON.stringify(body),
            request_headers: { "Content-Type": "application/json" },
        })
        const response = await this.queryApiCron(content, "PATCH", `https://api.easycron.com/v1/cron-jobs/${cronJobId}`);
        return await response.json();
    }

    async deleteCronJob(cronJobId) {
        const response = await this.queryApiCron(null, "DELETE", `https://api.easycron.com/v1/cron-jobs/${cronJobId}`);
        return await response.status === 204 ? "Deleted" : "Error";
    }

    async queryApiCron(body, method, urlApi = "") {
        const headerTemplate = {
            method,
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": 'e4b13b02552da9e845f910c317fa3cad',
            },
        }
        if (body) headerTemplate.body = body;
        return await fetch(urlApi, headerTemplate);
    }

}