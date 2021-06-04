// 代码源自：https://blog.csdn.net/wang1006008051/article/details/103699669

const { execSync } = require('child_process');
const fs = require('fs');
const fileName = 'version.svg';
const filePath = 'layouts/partials/svg';
const commit = execSync('git show -s --format=%H').toString().trim();
let versionStr = "";
const name = execSync('git show -s --format=%cn').toString().trim();
const email = execSync('git show -s --format=%ce').toString().trim();
const message = execSync('git show -s --format=%s').toString().trim();
const date = new Date(execSync('git show -s --format=%cd').toString());
const year = date.getUTCFullYear();
const monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const month = monthList[new Date().getUTCMonth()];
const day = date.getUTCDate() >= 10 ? date.getUTCDate() : `0${date.getUTCDate().toString()}`;
const hours = date.getUTCHours() >= 10 ? date.getUTCHours() : `0${date.getUTCHours().toString()}`;
const minutes = date.getUTCMinutes() >= 10 ? date.getUTCMinutes() : `0${date.getUTCMinutes().toString()}`;
versionStr = `<svg class="version" width="120" height="22" viewBox="0 0 120 22" xmlns="http://www.w3.org/2000/svg">
  <title>Last update time of this project</title>
  <desc>
    Time: ${year}-${month}-${day} ${hours}:${minutes} GMT
    Email: ${email}
    Author: ${name}
    Message: ${message}
    Version: ${commit}
  </desc>
  <text x="0" y="16" textLength="120" font-size="16">${month}-${day} ${hours}:${minutes} GMT</text>
</svg>`;
if (fs.existsSync(filePath)) {
  fs.writeFileSync(`${filePath}/${fileName}`, versionStr);
}
