# How to Claude

面向中文读者的 Claude 图解指南，涵盖账号注册、Pro 订阅和桌面端使用。你可以直接阅读下列 PDF，也可以在网站里逐页翻阅、跳转章节或分享某一页。

| 教程 | 页数 | 适合谁 |
| --- | ---: | --- |
| [Claude 订阅从入门到精通 · Gmail 版](books/gmail.pdf) | 40 | 使用 Google 账号登录 Claude 的读者 |
| [Claude 订阅从入门到精通 · Proton Mail 版](books/proton.pdf) | 40 | 希望用 Proton 邮箱注册和接收登录邮件的读者 |
| [Claude Desktop 使用指南](books/desktop.pdf) | 14 | 已有 Claude 账号，准备在电脑上使用桌面客户端的读者 |

网页的「资源与下载」按购买代理 IP、软件、环境检测、邮箱与账号注册、礼品卡与付款分类整理。

## 本地预览

克隆仓库后，在项目目录运行 Python 3 的静态文件服务。

```sh
git clone https://github.com/bluenoah1991/howto-claude.git
cd howto-claude
python3 -m http.server 8000 --bind 127.0.0.1
```

浏览器打开 [本地首页](http://127.0.0.1:8000/)。例如，[Proton Mail 版第 27 页](http://127.0.0.1:8000/#read/proton/27)直接打开恢复邮箱设置步骤。页码 0 对应封面目录。

## 部署

这是一个纯静态网站。将包含 `index.html` 的项目根目录发布到静态托管服务即可。在 Vercel 导入此仓库时，框架选 **Other**，构建命令留空，发布目录使用仓库根目录。

## 更新教程与资源

- `index.html` 和 `style.css` 管理页面结构、移动端排版和阅读器样式。
- `app.js` 包含书架信息、资源链接、章节起始页和阅读器交互。
- `pages.js` 按阅读顺序列出每本书在 `pages/` 中的 WebP 图片。相同页面可由多个版本共用。
- `books/` 存放供读者下载的 PDF。更新教程时，请同步检查 PDF、逐页图片和章节页码。

欢迎提交失效链接、教程勘误和阅读器改进。详见[贡献指南](CONTRIBUTING.md)。

## 授权与署名

网站代码采用 [MIT 许可证](LICENSE)。本项目的原创教程 PDF 和插画采用 [CC BY 4.0](CONTENT-LICENSE.md)。转载或改编时，请注明作者、来源、许可证和所做修改。

署名示例：《How to Claude》图解教程，作者 bluenoah1991，[项目来源](https://github.com/bluenoah1991/howto-claude)，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。如有改编，可补充「已节选并重新排版」等说明。
