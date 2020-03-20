#!/usr/bin/env node

const program = require('commander')
// 交互式命令行
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const tplObj = require(`${__dirname}/../template`)
const getKey = require('./utils/getKey')
// console.log('getKey---',getKey);

// console.log('tplObj--', tplObj);

program
    .usage('<template-name> [project-name]')
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()


const promptList = [{
    type: 'list',
    message: '请选择您所需的ui库:',
    name: 'type',
    choices: [
        "element-ui",
        "antd",
    ],
    filter: function (val) {
        // console.log('val--',val);
        return val

    }
}];


// 好比 vue init webpack project-name 的命令一样，第一个参数是 webpack，第二个参数是 project-name
let templateName = program.args[0]
// console.log('program--', program);

// console.log('templateName--',templateName);

let projectName = program.args[1]
// console.log('projectName--',templateName);
// 小小校验一下参数
if (!tplObj[templateName]) {
    console.log(chalk.red('\n Template does not exit! \n '))
    return
}
if (!projectName) {
    console.log(chalk.red('\n Project should not be empty! \n '))
    return
}
inquirer.prompt(promptList).then(res => {

    if (templateName == 'vue') {
       
       url = getKey(res.type,tplObj[templateName][0])
    } else {
        url = getKey(res.type,tplObj[templateName][0])
    }

    // console.log('url--',url);

    console.log(chalk.white('\n Start generating... \n'))
    // 出现加载图标
    const spinner = ora("Downloading...");
    spinner.start();
    // 执行下载方法并传入参数
    download(
        url,
        projectName,
        err => {
            if (err) {
                spinner.fail();
                console.log(chalk.red(`Generation failed. ${err}`))
                return
            }
            // 结束加载图标
            spinner.succeed();
            console.log(chalk.green('\n Generation completed!'))
            console.log('\n To get started')
            console.log(`\n cd ${projectName} \n`)
        }
    )


})


