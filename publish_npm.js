const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// TODO if someone is brave enough to make all of this readable please do

function renameFiles(dir, action) {
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      renameFiles(fullPath, action);
    } else {
      if (fullPath.includes("example")) {
        fs.unlinkSync(fullPath);
      }
    }
  });
}

fs.rmSync("dist", { recursive: true, force: true });

const npmi = exec("npm i");
npmi.on("close", (code) => {
  if (code !== 0) {
    throw new Error("Error happened " + code);
  }

  const tsc = exec("npx tsc");
  tsc.stdout.on("data", function (data) {
    console.log("stdout: " + data.toString());
  });

  tsc.stderr.on("data", function (data) {
    console.error("stderr: " + data.toString());
  });
  tsc.on("close", (code) => {
    if (code === 0) {
      fs.copyFileSync("package.json", "dist/package.json");
      fs.copyFileSync("README.md", "dist/README.md");
      fs.copyFileSync("LICENSE.txt", "dist/LICENSE.txt");
      fs.copyFileSync("teleproto/tl/api.d.ts", "dist/tl/api.d.ts");
      fs.copyFileSync("teleproto/define.d.ts", "dist/define.d.ts");
      renameFiles("dist", "delete");
      const npm_publish = exec("npm publish --tag latest", {
        cwd: "dist",
      });
      npm_publish.stdout.on("data", function (data) {
        console.log(data.toString());
      });

      npm_publish.stderr.on("data", function (data) {
        console.error(data.toString());
      });
      npm_publish.on("close", (code) => {
        if (code === 0) {
          console.log("=====================================");
          console.log("FINISHED UPLOADING NODE VERSION");
          console.log("=====================================");
        } else {
          throw new Error("something went wrong");
        }
      });
    } else {
      console.log(code);
      throw new Error("Error happened");
    }
  });
});