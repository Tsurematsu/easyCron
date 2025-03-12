import dotenv from 'dotenv';
import EasyCron from "./EasyCron.js";
dotenv.config();
const secretKey = process.env.SECRET;
const cronObjet = new EasyCron(secretKey, 'https://www.webpagetest.org/');

const jobQuery = {
    username: "admin",
    password: "admin",
    secret: "secret",
    action: "click",
}
const jobTime = "0 9 * * *";

// cronObjet.makeCronJob(jobQuery, jobTime).then((response) => {
//     console.log(response);
// })


cronObjet.getCronJobs().then((cron_jobs) => {
    console.log(cron_jobs);
    // @ts-ignore
    const cronJobId = cron_jobs[0].cron_job_id;


    // @ts-ignore
    // cronObjet.updateCronJob(cronJobId, jobQuery, "0 8 * * *").then((response) => {
    //     console.log(response);
    // })

    // cronObjet.deleteCronJob(cronJobId).then((response) => {
    //     console.log(response);
    // })
})