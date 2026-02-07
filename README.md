# Excel Video Player

<p align="center">
<img src="./assets/logo.jpg" alt="" width="300" height="300" />
</p>
<p align="center">
📺 Add-in to visualize videos in Excel sheets.
</p>

## Table of Contents

- [Why](#why)
- [How it Works](#how-it-works)
- [Benchmarks](#benchmarks)
- [Stack](#stack)
- [Code You Can Trust](#code-you-can-trust)
- [Build Excel Add-ins Using Office Add-ins Development Kit](#build-excel-add-ins-using-office-add-ins-development-kit)
- [How To Run This Project](#how-to-run-this-project)
- [License](#license)

## Why

// TODO

## How It Works

// TODO

## Benchmarks

_The more FPS, the better!_

|     | FPS | Resolution | Color depth (bpp) | Other conditions |                        Developer                        |
| :-: | :-: | :--------: | :---------------: | :--------------: | :-----------------------------------------------------: |
| 🥇  |  5  |    16x9    |        24         |        -         | [carlossalasamper](https://github.com/carlossalasamper) |
| 🥈  |  2  |   32x18    |        24         |        -         | [carlossalasamper](https://github.com/carlossalasamper) |
| 🥉  |  1  |   64x36    |        24         |        -         | [carlossalasamper](https://github.com/carlossalasamper) |

Can you do it better? Prove it.

1. 💻 Make the necessary changes in a new branch and [create a pull request](https://github.com/carlossalasamper/excel-video-player/compare).
2. ✅ I will validate the benchmark on my machine as soon as possible.

<small>A benchmark will be considered valid if it maintains the number of frames per second without freezing for the entire duration of [the project's test video](./assets/videos/big-buck-bunny-360p.mp4).</small>

## Stack

- 🧪 **Jest**: unit testing
- 🐻 **Zustand**: agnostic JavaScript state manager
- 🐶 **Husky**: run lint/test before a commit
- 🧰 **Office.js**: official add-ins framework
- 🛡️ **TypeScript**: catch runtime errors before they happen
- 🎨 **FluentUI**: cross platform UX framework

## Code You Can Trust

You can trust this code. It's covered in tests.

<img src="./assets/badges/coverage/badge-functions.svg" />
<img src="./assets/badges/coverage/badge-lines.svg" />
<img src="./assets/badges/coverage/badge-statements.svg" />
<img src="./assets/badges/coverage/badge-branches.svg" />

## Build Excel Add-ins Using Office Add-ins Development Kit

Excel add-ins are integrations built by third parties into Excel by using [Excel JavaScript API](https://learn.microsoft.com/en-us/office/dev/add-ins/reference/overview/excel-add-ins-reference-overview) and [Office Platform capabilities](https://learn.microsoft.com/en-us/office/dev/add-ins/overview/office-add-ins).

## How To Run This Project

### Prerequisites

- Node.js (the latest LTS version). Visit the [Node.js site](https://nodejs.org/) to download and install the right version for your operating system. To verify that you've already installed these tools, run the commands `node -v` and `npm -v` in your terminal.
- Office connected to a Microsoft 365 subscription. You might qualify for a Microsoft 365 E5 developer subscription through the [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program), see [FAQ](https://learn.microsoft.com/office/developer-program/microsoft-365-developer-program-faq#who-qualifies-for-a-microsoft-365-e5-developer-subscription-) for details. Alternatively, you can [sign up for a 1-month free trial](https://www.microsoft.com/microsoft-365/try?rtc=1) or [purchase a Microsoft 365 plan](https://www.microsoft.com/microsoft-365/buy/compare-all-microsoft-365-products).

### Run the Add-in Using Office Add-ins Development Kit Extension

1. **Open the Office Add-ins Development Kit**

   In the **Activity Bar**, select the **Office Add-ins Development Kit** icon to open the extension.

1. **Preview Your Office Add-in (F5)**

   Select **Preview Your Office Add-in(F5)** to launch the add-in and debug the code. In the Quick Pick menu, select the option **Excel Desktop (Edge Chromium)**.

   The extension then checks that the prerequisites are met before debugging starts. Check the terminal for detailed information if there are issues with your environment. After this process, the Excel desktop application launches and sideloads the add-in.

1. **Stop Previewing Your Office Add-in**

   Once you are finished testing and debugging the add-in, select **Stop Previewing Your Office Add-in**. This closes the web server and removes the add-in from the registry and cache.

## License

The Excel Video Player source code is made available under the MIT license.

Some of the dependencies are licensed differently, with the BSD license, for example.
