import path from 'path';
import FS from 'fs';
const fs = FS.promises;
 
async function addRepo(filePath){
    const repoPath = path.resolve(process.cwd(),".myGit");
    const stagingPath = path.join(repoPath,"staging");

    try {
        await fs.mkdir(stagingPath,{ recursive:true });
        const fileName = path.basename(filePath) ;
        await fs.copyFile(fileName,path.join(stagingPath,fileName));
        console.log(`file: ${fileName} successfully added to .myGit`);
    } catch (err) {
        console.error('Adding File error: '+err);
    }
}

//module.exports = {initRepo}; // Common JS

export default addRepo;