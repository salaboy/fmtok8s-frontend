# fmtok8s-frontend

## Running helm tests

This project uses [helm unittest plugin](https://github.com/helm-unittest/helm-unittest/) to run tests.

After installing unittest plugin, run the following command (on root folder):

```sh
    helm unittest /helm/fmtok8s-frontend --helm3
```