import dotenv from 'dotenv';
import EasyCron from "./EasyCron.js";
dotenv.config();
const { SECRETKEY, USERNAME, PASSWORD, SECRETAPP } = process.env;
const cronObjet = new EasyCron(SECRETKEY, 'https://www.webpagetest.org/');
const jobQuery = {
    username: USERNAME,
    password: PASSWORD,
    secret: SECRETAPP,
    action: "click",
}
export default new class Lib {
    async create(time, name) {
        return await cronObjet.makeCronJob(jobQuery, time, name)
    }
    async update(time, index) {
        const jobs = await cronObjet.getCronJobs();
        const job = jobs[index];
        return await cronObjet.updateCronJob(job.cron_job_id, jobQuery, time);
    }
    async delete(index) {
        const jobs = await cronObjet.getCronJobs();
        const job = jobs[index];
        return await cronObjet.deleteCronJob(job.cron_job_id);
    }
    async delete_id(id) {
        return await cronObjet.deleteCronJob(id);
    }
    async list() {
        return await cronObjet.getCronJobs()
    }
}
// const jobTime = "0 9 * * *";
