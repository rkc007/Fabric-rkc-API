const CREDS = require('./creds');
const puppeteer = require('puppeteer');
var curl = require('curlrequest');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 60;
 
var j = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
  run();
});


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

    await page.goto('https://fabric.io/login');
    await page.waitFor(3*1000);
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    await page.click(BUTTON_SELECTOR);
    // await page.waitForNavigation();
    await page.waitFor(10*1000);

    //IOS Results
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

      //Android Results
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
                        }
                    ]
                }
            ]
        
      }
      dataa = JSON.stringify(data);

    //   curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/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

    curl.request({ url: 'https://hooks.slack.com/services/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'
                , method: 'POST' 
                , data: dataa
                , headers:{accept: 'application/json'} }, function (err, stdout, meta) {
        console.log('%s %s', meta.cmd, meta.args.join(' '));
    });
    browser.close();
}

