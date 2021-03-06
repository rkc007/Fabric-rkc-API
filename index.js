const CREDS = require('./creds');
const puppeteer = require('puppeteer');
var curl = require('curlrequest');
var schedule = require('node-schedule');


async function run() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    const USERNAME_SELECTOR =   '#email';
    const PASSWORD_SELECTOR =   '#password';
    const BUTTON_SELECTOR   =   '#l_sdk-chrome > div.relative.stage > div:nth-child(1) > div > form > button'
    const IOS_DAILY_ACTIVE  =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > div.js-favorite-projects > div:nth-child(2) > div > div.flex-box.align-items-stretch > div.flex-1.flex-box.flex-column.js-app-view > div.flex-1.flex-box.flex-column > div > div > a:nth-child(1) > div > div.flex-box.align-items-flex-end > div.ellipsis > span:nth-child(1)'
    const IOS_DAILY_NEW     =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > div.js-favorite-projects > div:nth-child(2) > div > div.flex-box.align-items-stretch > div.flex-1.flex-box.flex-column.js-app-view > div.flex-1.flex-box.flex-column > div > div > a:nth-child(2) > div > div.flex-box.align-items-flex-end > div.ellipsis > span:nth-child(1)'
    const IOS_MONTHLY_ACTIVE=   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > div.js-favorite-projects > div:nth-child(2) > div > div.flex-box.align-items-stretch > div.flex-1.flex-box.flex-column.js-app-view > div.flex-1.flex-box.flex-column > div > div > a:nth-child(3) > div > div.flex-box.align-items-flex-end > div.ellipsis > span:nth-child(1)'

    const ANDROID_DAILY_ACTIVE  =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > div.js-favorite-projects > div:nth-child(3) > div > div.flex-box.align-items-stretch > div.flex-1.flex-box.flex-column.js-app-view > div.flex-1.flex-box.flex-column > div > div > a:nth-child(1) > div > div.flex-box.align-items-flex-end > div.ellipsis > span:nth-child(1)'
    const ANDROID_DAILY_NEW     =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > div.js-favorite-projects > div:nth-child(3) > div > div.flex-box.align-items-stretch > div.flex-1.flex-box.flex-column.js-app-view > div.flex-1.flex-box.flex-column > div > div > a:nth-child(2) > div > div.flex-box.align-items-flex-end > div.ellipsis > span:nth-child(1)'
    const ANDROID_MONTHLY_ACTIVE=   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > div.js-favorite-projects > div:nth-child(3) > div > div.flex-box.align-items-stretch > div.flex-1.flex-box.flex-column.js-app-view > div.flex-1.flex-box.flex-column > div > div > a:nth-child(3) > div > div.flex-box.align-items-flex-end > div.ellipsis > span:nth-child(1)'

    const IOS_ENTRY             =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > div.js-favorite-projects > div:nth-child(2) > div > div.flex-box.align-items-stretch > div.flex-1.flex-box.flex-column.js-app-view'
    const ANDROID_ENTRY         =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > div.js-favorite-projects > div:nth-child(3) > div > div.flex-box.align-items-stretch > div.flex-1.flex-box.flex-column.js-app-view' 
    const IOS_EVENTS            =   '#l_dashboard > aside > div > div > div > div.products-wrapper > div > a.events > span'
    
    const IOS_GENUINE_CONTENT   =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > section > section > div:nth-child(1) > div.flex-1.margin-right-10px > div > div > div.widget-heading-react.widget-heading-react-sizing > div > div.align-left.flex-1.padding-right-20px > div > div > div > div:nth-child(1) > div > div > div'
    const IOS_GENUINE_USERS     =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > section > section > div:nth-child(1) > div:nth-child(2) > div > div > div.widget-heading-react.widget-heading-react-sizing > div > div.align-left.flex-1.padding-right-20px > div > div > div > div:nth-child(1) > div > div > div'
    const IOS_GENUINE_C_PERCENT =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > section > section > div:nth-child(1) > div.flex-1.margin-right-10px > div > div > div.widget-heading-react.widget-heading-react-sizing > div > div.align-left.flex-1.padding-right-20px > div > div > div > div:nth-child(2) > span:nth-child(1)'
    const IOS_GENUINE_U_PERCENT =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > section > section > div:nth-child(1) > div:nth-child(2) > div > div > div.widget-heading-react.widget-heading-react-sizing > div > div.align-left.flex-1.padding-right-20px > div > div > div > div:nth-child(2) > span:nth-child(1)'

    const ANDROID_GENUINE_CONTENT   =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > section > section > div:nth-child(1) > div.flex-1.margin-right-10px > div > div > div.widget-heading-react.widget-heading-react-sizing > div > div.align-left.flex-1.padding-right-20px > div > div > div > div:nth-child(1) > div > div > div'
    const ANDROID_GENUINE_USERS     =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > section > section > div:nth-child(1) > div:nth-child(2) > div > div > div.widget-heading-react.widget-heading-react-sizing > div > div.align-left.flex-1.padding-right-20px > div > div > div > div:nth-child(1) > div > div > div'
    const ANDROID_GENUINE_C_PERCENT =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > section > section > div:nth-child(1) > div.flex-1.margin-right-10px > div > div > div.widget-heading-react.widget-heading-react-sizing > div > div.align-left.flex-1.padding-right-20px > div > div > div > div:nth-child(2) > span:nth-child(1)'
    const ANDROID_GENUINE_U_PERCENT =   '#l_dashboard > article > div.flex-1.flex-box > section > div > div > div > section > section > div:nth-child(1) > div:nth-child(2) > div > div > div.widget-heading-react.widget-heading-react-sizing > div > div.align-left.flex-1.padding-right-20px > div > div > div > div:nth-child(2) > span:nth-child(1)'

    
    await page.goto('https://fabric.io/login');
    await page.waitFor(3*1000);
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    await page.click(BUTTON_SELECTOR);
    // await page.waitForNavigation();
    await page.waitFor(10*1000);

    //IOS Active Results
    let ios_daily_active = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, IOS_DAILY_ACTIVE);
    let ios_daily_new = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, IOS_DAILY_NEW);
    let ios_monthly_active = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, IOS_MONTHLY_ACTIVE);

      //Android Active Results
    let android_daily_active = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, ANDROID_DAILY_ACTIVE);
    let android_daily_new = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, ANDROID_DAILY_NEW);
    let android_monthly_active = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, ANDROID_MONTHLY_ACTIVE);
    
      console.log('daily_active_ios -> ', ios_daily_active);
      console.log('daily_new_ios -> ', ios_daily_new);
      console.log('monthly_active_ios -> ', ios_monthly_active);
      console.log('daily_active_android -> ', android_daily_active);
      console.log('daily_new_android -> ', android_daily_new);
      console.log('monthly_active_android -> ', android_monthly_active);

      await page.goto('https://fabric.io/marsplay-internet-private-limited/ios/apps/com.marsplay.marsplay/dashboard/events/custom?event_type=Genuine%20Content')
      await page.waitFor(3*1000);

      //IOS Genuine Conetnt Results
      let ios_genuine_content = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, IOS_GENUINE_CONTENT);
      let ios_genuine_c_percent = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.textContent: null;
      }, IOS_GENUINE_C_PERCENT);
      let ios_genuine_u_percent = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.textContent: null;
      }, IOS_GENUINE_U_PERCENT);
      let ios_genuine_users = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, IOS_GENUINE_USERS);

      await page.goto('https://fabric.io/marsplay-internet-private-limited/android/apps/com.marsplay/dashboard/events/custom?event_type=Genuine%20Content')
      await page.waitFor(3*1000);

      //ANDROID Genuine Conetnt Results
      let android_genuine_content = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, ANDROID_GENUINE_CONTENT);
      let android_genuine_c_percent = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.textContent: null;
      }, ANDROID_GENUINE_C_PERCENT);
      let android_genuine_u_percent = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.textContent: null;
      }, ANDROID_GENUINE_U_PERCENT);
      let android_genuine_users = await page.evaluate((sel) => {
        let element = document.querySelector(sel);
        return element? element.innerHTML: null;
      }, ANDROID_GENUINE_USERS);


      var data = {
            "attachments": [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "Daily Fabric Analytics -- IOS",
                    "author_name": "Fabric",
                    "author_link": "https://fabric.io/",
                    "author_icon": "http://img.talkandroid.com/uploads/2016/02/Fabric-gallery-6-icon.png",
                    "title": "IOS",
                    "title_link": "https://fabric.io/marsplay-internet-private-limited/ios/apps/com.marsplay.marsplay/dashboard",
                    "fields": [
                        {
                            "title": "Daily Active",
                            "value": ios_daily_active,
                            "short": false
                        },
                        {
                            "title": "Daily New",
                            "value": ios_daily_new,
                            "short": false
                        },
                        {
                            "title": "Monthly Active",
                            "value": ios_monthly_active,
                            "short": false
                        },
                        {
                            "title": "Genuine Content",
                            "value": ios_genuine_content,
                            "short": true
                        },
                        {
                            "title": "From Last Week",
                            "value": ios_genuine_c_percent,
                            "short": true
                        },
                        {
                            "title": "Genuine Content Users",
                            "value": ios_genuine_users,
                            "short": true
                        },
                        {
                            "title": "From Last Week",
                            "value": ios_genuine_u_percent,
                            "short": true
                        }
                    ],
                    "color": "#764FA5"
                },
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "color": "#36a64f",
                    "pretext": "Daily Fabric Analytics -- ANDROID",
                    "author_name": "Fabric",
                    "author_link": "https://fabric.io/",
                    "author_icon": "http://img.talkandroid.com/uploads/2016/02/Fabric-gallery-6-icon.png",
                    "title": "ANDROID",
                    "title_link": "https://fabric.io/marsplay-internet-private-limited/android/apps/com.marsplay/dashboard",
                    "fields": [
                        {
                            "title": "Daily Active",
                            "value": android_daily_active,
                            "short": false
                        },
                        {
                            "title": "Daily New",
                            "value": android_daily_new,
                            "short": false
                        },
                        {
                            "title": "Monthly Active",
                            "value": android_monthly_active+'k',
                            "short": false
                        },
                        {
                            "title": "Genuine Content",
                            "value": android_genuine_content,
                            "short": true
                        },
                        {
                            "title": "From Last Week",
                            "value": android_genuine_c_percent,
                            "short": true
                        },
                        {
                            "title": "Genuine Content Users",
                            "value": android_genuine_users,
                            "short": true
                        },
                        {
                            "title": "From Last Week",
                            "value": android_genuine_u_percent,
                            "short": true
                        }
                    ]
                }
            ]
        
      }
      dataa = JSON.stringify(data);

    //   Group https://hooks.slack.com/services/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
    //   Personal https://hooks.slack.com/services/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

    curl.request({ url: 'https://hooks.slack.com/services/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'
                , method: 'POST' 
                , data: dataa
                , headers:{accept: 'application/json'} }, function (err, stdout, meta) {
        console.log('%s %s', meta.cmd, meta.args.join(' '));
    });
    browser.close();
}
// var rule = new schedule.RecurrenceRule();
// rule.minute = 60;
 
// var j = schedule.scheduleJob(rule, function(){
//   console.log('The answer to life, the universe, and everything!');
//   run();
// });


var cron = require('cron');
 
var job = new cron.CronJob({
  cronTime: '00 00 22 * *',
  onTick: function() {
    console.log('Started Job');
    run();

  },
  start: false,
  timeZone: 'Asia/Kolkata'
});
 

job.start();