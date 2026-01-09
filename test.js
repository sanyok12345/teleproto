const { UserUpdateEvent, UserUpdate, MessageRead } = require('./dist/events');
const { TelegramClient } = require('./dist/index');
const { StringSession } = require('./dist/sessions/index');
// import readline from "readline";
const readline = require("readline");

const apiId = 11344955; // Replace with your API ID
const apiHash = "8a0d1d4bf8257bc851bb8f62a4ee033e"; // Replace with your API Hash
const stringSession = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEAUCZwyoqfpWSYI3HuIbZuqTnyou0H/PJUI/ug7QxyBZpQB4UcilMUIUZssw6iMsgZ/pviOufYu4j/7mqR1r6FNzrbbAVaaHYeOY5r3xtdm0LgRJw5YlQ2xzopH30spEIz4abMaoInb42Dm00CX8hg2MC1KfXmrd1hD9eqP3fhzR1Db+lTF6f+FUscTjPQL5gfAYESOiqEyoURO+VFn5Sks/42h+Zv7fajtM7WbSccypJkT3dSMurvHnHss/xCUoiKyzJZ5vnJw827kuGVPbwmK80ZJ4VEWho8O5fJTxoQ9hBZKc0TLqhBBCHAtlWupkdNhcFpSHQIcspG4DixphivAS4="); // Save the string session for later use

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    console.log("Starting teleproto client...");

    const client = new TelegramClient(
        stringSession, apiId, apiHash, {
        connectionRetries: 5,
        reCaptchaCallback: async (siteKey) => {
            // you *could* extract the userVerify response here - not necessarily recommended :)
            console.log(`Please solve the reCAPTCHA at: https://www.google.com/recaptcha/api2/demo?sitekey=${siteKey}`);
            return await new Promise(resolve => rl.question("Enter reCAPTCHA token: ", resolve));
        },
    });

    await client.start({
        phoneNumber: async () =>
            await new Promise(resolve => rl.question("Phone number: ", resolve)),
        password: async () =>
            await new Promise(resolve => rl.question("Password: ", resolve)),
        phoneCode: async () =>
            await new Promise(resolve => rl.question("Verification code: ", resolve)),
        onError: (err) => console.error(err),
    });

    console.log("Connected successfully!");
    console.log("Session string:", client.session.save()); // Save this to avoid login next time

    client.addEventHandler((update) => {
        console.log('Я прочитал сообщение!', update.maxId);
        console.log('Full update:', update);
    }, new MessageRead({ inbox: true }));
    rl.close();
}

main();