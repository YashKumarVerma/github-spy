# Github Spy [a WIP project]

![Ensure Build](https://github.com/YashKumarVerma/github-spy/workflows/Ensure%20Build/badge.svg)

## About

Do you lead an organization ? or are you a maintainer of some open source project ? Even if you are neither of the above, there can be instances when you might be required to generate quick reports of any github organization. This can cover anything as simple as getting name of all repositories or things a bit tricky like ensuring projects contain particular structure.

I was facing a similar issue, and therefore I've written this bot down. In order to operate, it requires a personal access token as an environment variable. Just rename the `.env.example` file to `.env` and place it there. Then you're good to go.

## Running

The project is written in typescript, so you need a few packages installed to get it working.

```bash
# install all dependencies
npm install

# then build the project
npm run build

# after building, run it
npm run start
```

Once you do this, you'd be prompted your name and email, just to be double sure that you're accessing the details of the right account.

![https://i.imgur.com/koK7dWV.png](https://i.imgur.com/koK7dWV.png)

## Features

As mentioned, the project is a W.I.P. which means that new features are being readily added to it. If you feel that there needs to be a particular filter / criterion to generate reports, feel free to [open an issue](https://github.com/YashKumarVerma/github-spy/issues/new) regarding it. I'm more than willing to write features for it.

## Contribution

Just in case you're a hobbyist or have developed an interest in this project, we're open to contributions. The contributions can be in the following domains

- **Testing** : the application has absolutely no testing mechanism right now, which would be required as we move forward.

- **Documentation**: As this project has surfaced as an outcome of a personal need, it lacks the documentation that it deserves. I've tried to make code as elaborative as possible, but nothing beats an actual documentation. Feel free to send PRs for adding docs. PR's fixing typos would be closed straight away.

- **Code**: The only reason you see the last few commits done to create a new directory named `features` is to make it easy to write new filters / features. Feel free in both, suggesting features as well as writing features.
