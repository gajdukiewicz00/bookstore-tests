const fs = require('fs');
const dotenv = require('dotenv');
const { Octokit } = require('@octokit/rest');

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'gajdukiewicz00';
const REPO_NAME = 'bookstore-tests';

if (!GITHUB_TOKEN) {
    console.error('Необходимо указать GITHUB_TOKEN в .env');
    process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function addSecret(name, value) {
    try {
        const { data: publicKey } = await octokit.rest.actions.getRepoPublicKey({
            owner: REPO_OWNER,
            repo: REPO_NAME,
        });

        const sodium = require('tweetsodium');
        const keyBytes = Buffer.from(publicKey.key, 'base64');
        const valueBytes = Buffer.from(value);
        const encryptedBytes = sodium.seal(valueBytes, keyBytes);
        const encryptedValue = Buffer.from(encryptedBytes).toString('base64');

        await octokit.rest.actions.createOrUpdateRepoSecret({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            secret_name: name,
            encrypted_value: encryptedValue,
            key_id: publicKey.key_id,
        });

        console.log(`Секрет "${name}" успешно добавлен.`);
    } catch (error) {
        console.error(`Ошибка при добавлении секрета "${name}":`, error.message);
    }
}

async function uploadSecrets() {
    const envVariables = dotenv.parse(fs.readFileSync('.env'));

    for (const [key, value] of Object.entries(envVariables)) {
        console.log(`Добавление секрета: ${key}`);
        await addSecret(key, value);
    }
}

uploadSecrets().catch((err) => {
    console.error('Ошибка при загрузке секретов:', err.message);
});
