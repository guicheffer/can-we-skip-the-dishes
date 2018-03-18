const BINPATH = 'tests/e2e/libs';
const SCREENSHOT_PATH = 'tests/e2e/screenshots';
const CHROMEDRIVER = './bin/chromedriver' || `${BINPATH}/chromedriver/chromedriver`;
const CHROME = process.env.SESSION !== 'ubuntu' ? '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary' : '/usr/bin/google-chrome';

const { config } = require('../../package.json')

module.exports = {
    src_folders: ['tests/e2e/specs'],
    output_folder: 'tests/e2e/reports',
    selenium: {
        start_process: false,
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': CHROMEDRIVER,
        },
    },
    test_settings: {
        default: {
            launch_url: 'localhost:3000',
            selenium_port: '9515',
            selenium_host: 'localhost',
            silent: true,
            screenshots: {
                enabled: true,
                path: SCREENSHOT_PATH,
            },
            globals: {
                timeOut: 2000,
                asyncTimeOut: 5000,
                devServerURL: `http://can-we-skip-the-dishes:${config.port}/``,
            },
            desiredCapabilities: {
                browserName: 'chrome',
                acceptSslCerts: true,
                chromeOptions: {
                    args: [
                        '--headless',
                        '--no-sandbox',
                        '--window-size=360, 640',
                    ],
                    binary: CHROME,
                },
            },
        },
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
            },
        },
    },
};
