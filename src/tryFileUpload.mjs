import fs from "fs";
import { ArweaveSigner, createData } from "arbundles";

//read wallet
const jwk = JSON.parse(fs.readFileSync("../_secrets/wallet.json").toString());

const signer = new ArweaveSigner(jwk);
const directory = "./testDir";

const files = fs.readdirSync(directory);

for (const file of files) {
    const data = fs.readFileSync( `${directory}/${file}` );
    const item = createData(data, signer);
    await item.sign(signer);

    const response = await item.sendToBundler();

    console.log(`Sent ${file} bundler with response: ${response.status} / ${response.statusText}`);
}