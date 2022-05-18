###
 # @Author: InfSky-233 itrident@163.com
 # @Date: 2022-05-15 21:13:46
 # @LastEditors: InfSky-233 itrident@163.com
 # @LastEditTime: 2022-05-15 21:55:18
 # @FilePath: \la\deploy.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -u origin master

cd -

