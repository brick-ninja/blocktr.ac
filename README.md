# Zitui - Block Trac Frontend Web UI

## Overview
Zitui is the implementation of the Block Trac frontend, a service used to register and run JSONPath filters against blockchain transactions.

Zitui requires a Ziti backend be deployed and is accessible for web API requests. Zitui handles user interface interaction and dispatches calls to the Ziti web API.

Zitui is implemented as a [vuejs](https://vuejs.org/) static site and imposes minimal requirements beyond a standard vuejs stack.

Zitui was developed and deployed in a *CentOS8* environment. Theoretically an environment which supports vuejs should suffice to run the application though the following instructions may need to be modified appropriately.

## Installing From Source

1. Install CentOS with updates
2. curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
3. sudo rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg
4. sudo dnf install git nodejs yarn
5. git clone git@bitbucket.org:movitto/zitui.git
6. cd zitui
7. yarn install

## Prereqs:

Before running the service you need to run a quick workaround required by the jsonpath / jsonpath complexity dependency:

1. cd node_modules/jsonpath
2. yarn prepublishOnly

Copy the ziti.js config file from the backend project into the src/config directory

## Running Zitui

You will need to copy the ziti.js configuration file to the src/ directory before the application can be run. If the Ziti backend is located on another machine be sure to edit the BACKEND_URL option in src/config.js appropriately.

After this simply run

```
yarn serve
```

You may need to open the port if accessing remotely:

1. sudo firewall-cmd --permanent --add-port=8080/tcp
2. sudo firewall-cmd --reload

## Building Zitui

To build Zitui for static deployment run:

```
yarn build
```

The static content can be copied from the dist directory to your webserver.

## Legal
Copyright (c) 2020 Dev Null Productions LLC, All Rights Reserved
[devnullproductions@gmail.com](mailto:devnullproductions@gmail.com)
