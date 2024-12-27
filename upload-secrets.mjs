import fs from 'fs';
import dotenv from 'dotenv';
import { Octokit } from '@octokit/rest';
import sodium from 'tweetsodium';
import { Buffer } from 'buffer';


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

        // Добавление секрета
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

uploadSecrets().catch((err) => {
    console.error('Ошибка при загрузке секретов:', err.message);
});
